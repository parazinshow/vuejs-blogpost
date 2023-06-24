<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from 'vue';
import { Post, TimelinePost } from '../posts';
import { marked } from 'marked'
import highlightjs from 'highlight.js'
import debounce from 'lodash/debounce'
import { usePosts } from '../stores/posts'
import { useRouter } from 'vue-router'
import { useUsers } from '../stores/users';

const props = defineProps<{
  post: TimelinePost | Post;
}>()

const emit = defineEmits<{
  (event: "submit", post:Post):void
}>()

const title = ref(props.post.title)
const content = ref(props.post.markdown)
const html = ref('')
const contentEditable = ref<HTMLDivElement>()

const router = useRouter()
const postStore = usePosts() 
const usersStore = useUsers()

onMounted(()=>{
  if(!contentEditable.value){
    throw Error('ContentEditable DOM node was not found')
  }
  contentEditable.value.innerText = content.value
})

function parseHtml (markdown: string) {
  marked.parse(markdown, {
    gfm:true,
    breaks:true,
    highlight: (code) =>{
      return highlightjs.highlightAuto(code).value
    }
  }, (err,parseResults) =>{
    html.value = parseResults
  })
}

// mesmo que o de baixo .-. com menor numero de linhas
// watchEffect(()=>{
//   marked.parse(content.value, (err,parseResults) =>{
//     html.value = parseResults
//   })
// })

watch(content, debounce((newContent) =>{
  parseHtml(newContent)
}, 250), {
  immediate:true
})

function handleInput(){
  if(!contentEditable.value){
    throw Error('ContentEditable DOM node was not found')
  }
  content.value = contentEditable.value?.innerText
}

async function handleClick(){
  if(!usersStore.currentUserId){
    throw Error('User was not found!')
  }

  const newPost: Post = {
    ...props.post,
    title: title.value,
    authorId: usersStore.currentUserId,
    markdown: content.value,
    created: typeof props.post.created === 'string' ? props.post.created : props.post.created.toISO(),
    html: html.value
  }
  emit('submit',newPost)
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input
          v-model="title"
          type="text"
          class="input"
        />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditable" @input="handleInput"/>
    </div>
    <div class="column">
      <div v-html="html"/>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>

</template>
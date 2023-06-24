<script setup lang="ts">
import {DateTime} from 'luxon'
import PostWriter from '../components/PostWriter.vue'
import {Post, TimelinePost} from '../posts.ts'
import { useUsers } from '../stores/users';
import { usePosts } from '../stores/posts';
import { useRouter } from 'vue-router';

const router = useRouter()
const postsStore = usePosts()
const usersStore = useUsers()

if(!usersStore.currentUserId){
    throw Error('User was not found!')
  }

const post: TimelinePost = {
  id: '-1',
  title: 'Title',
  authorId: usersStore.currentUserId,
  created: DateTime.now(),
  markdown: '## Title',
  html: '<h2>Title</h2>'
}

async function handleSubmit(post: Post) {
  await postsStore.createPost(post)
  router.push('/')
}

</script>

<template>
  NewPost
  <PostWriter :post="post" @submit="handleSubmit"/>
</template>
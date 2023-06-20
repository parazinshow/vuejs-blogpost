<script setup lang="ts">
  import { TimelinePost } from '../posts'
  defineProps<{
    post: TimelinePost
  }>()
</script>

<template>
  <div>
    <RouterLink
    :to="`/posts/${post.id}`"
    class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
    >
      {{ post.title }}
      {{ post.created.toFormat('d MMM') }}
    </RouterLink>
  </div>
</template>
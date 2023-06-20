import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import {router} from './router'
import { useUsers } from './stores/users'
import { usePosts } from './stores/posts'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

const usersStore = useUsers()
const postsStore = usePosts()

Promise.all([
  usersStore.authenticate(),
  postsStore.fetchPosts()
]).then(()=>{
  app.use(router)
  .mount('#app')
})


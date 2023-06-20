<script setup lang="ts">
import { computed, ref } from 'vue';
import { validate, length, required } from '../validation';
import FormInput from './FormInput.vue'
import { NewUser } from '../users'
import { useUsers } from '../stores/users'
import { useModal } from '../composables/modal';

defineProps<{
  error?: string
}>()

const emit = defineEmits<{
  (event: 'submit', payload: NewUser): void
}>()

const username = ref('')
const usernameStatus = computed(()=>{
  return validate(username.value,[required, length({min: 5, max: 10})])
})

const password = ref('')
const passwordStatus = computed(()=>{
  return validate(password.value,[required, length({min: 8, max: 40})])
})

const isInvalid = computed(()=>{
  return (!usernameStatus.value.valid || !passwordStatus.value.valid)
})

const usersStore = useUsers()
const modal = useModal()

async function handleSubmit(){
  if(isInvalid.value) return
  const newUser: NewUser = {
    username: username.value,
    password: password.value
  }

  try{
    emit('submit', newUser)
  }catch(e){}

}
</script>

<template>
  <form class="form" @submit.prevent="handleSubmit">
    <FormInput type="text" name="Username" v-model="username" :status="usernameStatus"/>
    <FormInput type="password" name="Password" v-model="password" :status="passwordStatus"/>
    <div v-if="error" class="is-danger help">
      {{ error }}
    </div>
    <button :disabled="isInvalid" class="button is-primary">Submit</button>
  </form>

</template>

<style scoped>
.form{
  background:white;
  padding: 30px;
  margin-top: 50px;
}
</style>
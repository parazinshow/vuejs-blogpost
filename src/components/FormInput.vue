<script lang="ts" setup>
import { Status } from '../validation';
import { useModal } from '../composables/modal'
import { ref, watchEffect } from 'vue';

defineProps<{
  name: string
  modelValue: string
  status: Status
  type: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

function handleInput (e: Event) {
  const value = (e.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

const modal = useModal()

const setSignIn = ref(false)

watchEffect(()=>{
  setSignIn.value = modal.isSignIn.value
})

</script>

<template>
  <div class="field">
    <label :for="name" class="label">{{ name }}</label>
    <div class="control">
    <input
      :status="status"
      :id="name"
      :value="modelValue"
      @input="handleInput"
      class="input"
      :type="type"
    />
    </div>
    <div v-if="setSignIn">
      <p class="is-danger help" v-if="!status.valid && modelValue">
        {{ status.message }}
      </p>
    </div>
    <div v-else>
      <p class="is-danger help" v-if="!status.valid">
        {{ status.message }}
      </p>
    </div>
  </div>
</template>
import { ref, shallowRef} from 'vue'
import SignupForm from '../components/SignupForm.vue'
import SigninForm from '../components/SigninForm.vue'

const show = ref(false)
const component = shallowRef()
const isSignIn = ref(false)

export function useModal (){
  return {
    isSignIn,
    show,
    component,
    showModal:(type: 'signUp' | 'signIn') => {
      show.value = true
      switch (type) {
        case 'signUp': return component.value = SignupForm
        case 'signIn': {
          isSignIn.value = true
          return component.value = SigninForm
        } 
      }
    },
    hideModal:() => {
      show.value = false
      isSignIn.value = false
    }
  };
}
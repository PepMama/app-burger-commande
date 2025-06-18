import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('')

  function setUsername(name: string) {
    username.value = name
    console.log(`Username set to: ${username.value}`)
  }

  return { username, setUsername }
})
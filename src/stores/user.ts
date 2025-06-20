import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('')

  function setUsername(name: string) {
    username.value = name
  }

  // Fonction pour réinitialiser le nom d'utilisateur
  function resetUsername() {
    username.value = ''
  }

  return { username, setUsername, resetUsername }
}, {
  persist: true // 👈 active la persistance
})

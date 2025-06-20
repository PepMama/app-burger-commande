<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const loginError = ref(false)

async function login() {
  if (!username.value.trim() || !password.value.trim()) return

  try {
    const res = await fetch(`http://localhost:3000/login/${username.value}/${password.value}`)
    if (!res.ok) throw new Error('Erreur de connexion')

    const data = await res.json()

    if (data.success) {
      userStore.setUsername(username.value)
      loginError.value = false
      router.push('/')
    } else {
      loginError.value = true
    }
  } catch (error) {
    console.error('Erreur lors de la tentative de connexion :', error)
    loginError.value = true
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#996040]">
    <div class="grid gap-4 w-72">
      <img src="@/assets/logo.png" alt="Logo" class="w-24 mx-auto" />
      <h2 class="text-4xl text-center text-white font-bold">Bienvenue !</h2>

      <input
        v-model="username"
        placeholder="Ton nom"
        :class="[
          'p-2 rounded-full w-full',
          loginError ? 'border-red-500 border-2' : 'border border-gray-300'
        ]"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Ton mot de passe"
        :class="[
          'p-2 rounded-full w-full',
          loginError ? 'border-red-500 border-2' : 'border border-gray-300'
        ]"
      />

      <div v-if="loginError" class="text-red-200 text-sm text-center -mt-2">
        Identifiant ou mot de passe incorrect
      </div>

      <p class="text-center text-white text-sm">
        Pas encore inscrit ? <router-link to="/register" class="text-[#E99969]">Inscris-toi ici</router-link>
      </p>

      <button
        @click="login"
        class="bg-[#E99969] text-white p-2 rounded-full hover:bg-[#D88A5B] w-full"
      >
        Valider
      </button>
    </div>
  </div>
</template>

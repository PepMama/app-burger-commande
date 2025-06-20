<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const registerError = ref('')
const router = useRouter()

async function register() {
  if (!username.value.trim() || !password.value.trim()) {
    registerError.value = "Tous les champs sont requis"
    return
  }

  try {
    const res = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: username.value, password: password.value })
    })

    const data = await res.json()

    if (res.status === 201) {
      registerError.value = ''
      router.push('/login') // Redirige vers la page de login
    } else {
      registerError.value = data.message || 'Erreur lors de l’inscription'
    }
  } catch (error) {
    console.error('Erreur d’inscription :', error)
    registerError.value = 'Erreur serveur'
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#996040]">
    <div class="grid gap-4 w-72">
      <img src="@/assets/logo.png" alt="Logo" class="w-24 mx-auto" />
      <h2 class="text-4xl text-center text-white font-bold">Inscription</h2>

      <input
        v-model="username"
        placeholder="Ton nom"
        :class="[
          'p-2 rounded-full w-full',
          registerError ? 'border-red-500 border-2' : 'border border-gray-300'
        ]"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Ton mot de passe"
        :class="[
          'p-2 rounded-full w-full',
          registerError ? 'border-red-500 border-2' : 'border border-gray-300'
        ]"
      />

      <div v-if="registerError" class="text-red-200 text-sm text-center -mt-2">
        {{ registerError }}
      </div>

      <button
        @click="register"
        class="bg-[#E99969] text-white p-2 rounded-full hover:bg-[#D88A5B] w-full"
      >
        Créer un compte
      </button>
    </div>
  </div>
</template>

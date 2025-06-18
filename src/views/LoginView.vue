<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useUserStore()
const nameInput = ref('')
const router = useRouter()

function saveUsername() {
  store.setUsername(nameInput.value)
  console.log('Username saved:', store.username)
  router.push('/') 
}
</script>

<template>
<div class="flex items-center justify-center h-screen bg-[#996040]">
  <div class="grid gap-4 w-72">
    <img src="@/assets/logo.png" alt="Logo" class="w-24 mx-auto" />
    <h2 class="text-4xl text-center text-white font-bold">Bienvenue !</h2>
    <input class="border border-gray-300 p-2 rounded-full w-full" v-model="nameInput" placeholder="Ton nom" />
    <button class="bg-[#E99969] text-white p-2 rounded-full hover:bg-[#D88A5B] cursor-pointer w-full" @click="saveUsername">Valider</button>
  </div>
</div>
  
</template>

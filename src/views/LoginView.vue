<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'

const store = useUserStore()
const nameInput = ref('')

function saveUsername() {
  store.setUsername(nameInput.value)
}
</script>

<template>
  <div>
    <h2>Connexion</h2>
    <input v-model="nameInput" placeholder="Ton nom" />
    <button @click="saveUsername">Valider</button>
  </div>
</template>
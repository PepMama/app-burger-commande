<script setup>
import { useUserStore } from '@/stores/user'

const store = useUserStore()
</script>

<template>
  <div>
    <h1>Bienvenue, {{ store.username || 'invité' }} !</h1>
  </div>
</template>

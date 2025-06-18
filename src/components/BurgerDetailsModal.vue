<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white p-6 rounded-lg w-[90%] max-w-md">
      <h2 class="text-xl font-bold mb-2">{{ burger.name }}</h2>
      <p class="mb-2">{{ burger.description }}</p>
      <p class="mb-2 font-semibold">Prix : {{ burger.price }} €</p>
      <p class="mb-4 text-sm text-gray-600">Composition : {{ burger.composition }}</p>
      <button class="bg-red-500 text-white px-4 py-2 rounded" @click="$emit('close')">Fermer</button>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps({
  burger: Burger
})
</script>

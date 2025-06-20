<template>
  <div class="bg-[#faf5ed] rounded-lg shadow-md transform transition hover:-rotate-1 hover:shadow-lg hover:cursor-pointer" @click="$emit('click')">
    <img class="rounded-t-lg w-44 mx-auto" :src="`/images/${burger.image}`" alt="" />
    <div class="p-4 flex flex-col items-center">
      <h5 class="mb-2 text-2xl font-bold text-gray-900">{{ burger.name }}</h5>
      <p class="mb-3 font-semibold text-gray-900">{{ burger.price }} €</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import type { Burger } from '@/types/Burger'

const props = defineProps<{ burger: Burger }>()

const cart = useCartStore()

const burgerCount = computed(() =>
  cart.items.filter(i => i.id === props.burger.id).reduce((sum, it) => sum + it.quantity, 0)
)
</script>

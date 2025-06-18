<template>
  <div @click="showDetails" class=" bg-[#f0af6c] rounded-lg shadow-sm ">
    <a href="#">
        <img class="rounded-t-lg" :src="`/images/${burger.image}`" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ burger.name }}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700">{{ burger.description }}</p>
        <p class="mb-3 font-semibold text-gray-900">{{ burger.price }} €</p>
        <button @click.stop="addToCart" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#7b3f00] rounded-lg hover:bg-[#5a2e00] focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Ajouter au panier
        </button>
    </div>
</div>

</template>

<script setup lang="ts">

import { defineProps } from 'vue'
import { useCartStore } from '@/stores/cart.ts'
import type { Burger } from '@/types/Burger' // adapte le chemin à ton projet


const props = defineProps<{ burger: Burger }>() // <- générique correct


const emit = defineEmits(['show-details'])

const cartStore = useCartStore()

function addToCart() {
  cartStore.addToCart(props.burger)
}

function showDetails() {
  emit('show-details', props.burger)
}
</script>

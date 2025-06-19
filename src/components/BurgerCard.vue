<template>
  <div  class="bg-[#faf5ed] rounded-lg shadow-md transform transition duration-300 hover:-rotate-1 hover:shadow-lg hover:cursor-pointer"> <!--@click="showDetails"-->
    <img class="rounded-t-lg w-44 mx-auto" :src="`/images/${burger.image}`" alt="" />
    <div class="center p-4 flex flex-col items-center">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{{ burger.name }}</h5>
        <p class="mb-3 font-semibold text-gray-900">{{ burger.price }} €</p>
        <!-- <div class="flex items-center space-x-2">
          <button
            type="button"
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            @click="updateQuantity('decrement')"
          >−</button>

          <input
            type="number"
            :value="cartStore.getBurgerQuantity(props.burger.id)"
            min="0"
            class="w-16 text-center border rounded py-1"
            @change="onQuantityChange"
          />

          <button
            type="button"
            @click="updateQuantity('increment') "
            class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >+</button>
        </div>
        <button @click.stop="addToCart" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#7b3f00] rounded-lg hover:bg-[#5a2e00] focus:ring-4 focus:outline-none focus:ring-blue-300 ">
            Ajouter au panier
        </button> -->
    </div>
</div>

</template>

<script setup lang="ts">

import { defineProps } from 'vue'
import { useCartStore } from '@/stores/cart.ts'

import { ref } from 'vue'
import type { Burger } from '@/types/Burger'

const props = defineProps<{ burger: Burger }>() // <- générique correct

// const emit = defineEmits(['show-details'])


const cartStore = useCartStore()

function addToCart() {
  cartStore.addToCart(props.burger)
}

// function showDetails() {
//   emit('show-details', props.burger)
// }

const quantity = ref(cartStore.getBurgerQuantity(props.burger.id))

function updateQuantity(type: 'increment' | 'decrement') {
  if (type === 'increment') {
    quantity.value++
  } else if (type === 'decrement' && quantity.value > 0) {
    quantity.value--
  }

  cartStore.defineQuantity(props.burger, quantity.value)
}

function onQuantityChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const newQuantity = Number(target.value);
  cartStore.defineQuantity(props.burger, newQuantity);
}

</script>

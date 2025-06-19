<template>
  <!-- Overlay -->
  <div class="fixed inset-0 bg-black/60 flex items-end md:items-center justify-end z-50" @click="$emit('close')">
    <!-- Sidebar -->
    <div class="p-6 flex flex-col justify-between h-full bg-[#faf5ed] text-[#996040] rounded-lg" @click.stop>
      <div>
        <img class="rounded-t-lg w-44 mx-auto" :src="`/images/${burger.image}`" alt="" />

        <h2 class="text-xl font-bold mb-2">{{ burger.name }}</h2>
        <p class="mb-2">{{ burger.description }}</p>
        <p class="mb-2 font-semibold">Prix : {{ burger.price }} €</p>
        <p class="mb-4 text-sm text-[#996040]">Composition :</p>
        <p
          v-for="ingredient in burger.composition!.split(',')"
          :key="ingredient"
          class="mb-1"
        >
          <span>{{ ingredient.trim() }}</span>
        </p>
      </div>

      <div class="flex flex-col space-y-4 w-full">

      <div class="flex w-full border border-[#996040] rounded-lg overflow-hidden">
        <button
          class="basis-1/3 px-3 py-1 bg-[#faf5ed] text-[#996040] hover:bg-[#996040] hover:text-[#faf5ed] hover:cursor-pointer border-r border-[#996040]"
          @click="updateQuantity('decrement')"
        >−</button>

        <input
          type="number"
          :value="cartStore.getBurgerQuantity(burger.id)"
          min="0"
          class="basis-1/3 text-center border-none focus:outline-none"
          @change="onQuantityChange"
        />

        <button
          class="basis-1/3 px-3 py-1 bg-[#faf5ed] text-[#996040] hover:bg-[#996040] hover:text-[#faf5ed] hover:cursor-pointer border-l border-[#996040]"
          @click="updateQuantity('increment')"
        >+</button>
      </div>

      <button
        class="text-[#faf5ed] bg-[#996040] px-4 py-2 rounded hover:bg-[#e99969] hover:cursor-pointer transition-colors duration-300"
        @click="$emit('close')"
      >
        Fermer
      </button>

    </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { Burger } from '@/types/Burger'
import { useCartStore } from '@/stores/cart';

const { burger } = defineProps<{ burger: Burger }>()

const cartStore = useCartStore()

function addToCart() {
  cartStore.addToCart(burger)
}

const quantity = ref(cartStore.getBurgerQuantity(burger.id))

function updateQuantity(type: 'increment' | 'decrement') {
  if (type === 'increment') {
    quantity.value++
  } else if (type === 'decrement' && quantity.value > 0) {
    quantity.value--
  }

  cartStore.defineQuantity(burger, quantity.value)
}

function onQuantityChange(e: Event) {
  const target = e.target as HTMLInputElement;
  const newQuantity = Number(target.value);
  cartStore.defineQuantity(burger, newQuantity);
}

</script>

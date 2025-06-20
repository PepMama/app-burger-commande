<script setup lang="ts">
import { Trash2 } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'

const cart = useCartStore()
</script>

<template>
  <div v-if="cart.items.length > 0">
    <div
      v-for="(item, index) in cart.items"
      :key="item.compositionKey + '-' + index"
      class="flex justify-between items-center bg-[#faf5ed] text-[#996040] px-6 py-4 rounded-[10px] my-6"
    >
      <div>
        <p class="text-lg uppercase font-bold">{{ item.burger.name }}</p>
        <p class="text-sm italic text-gray-500 mb-1">Composition : {{ item.compositionKey }}</p>
        <p class="text-base font-bold">{{ item.burger.price.toFixed(2) }} €</p>
      </div>

      <div class="flex items-center gap-4">
        <button
          @click="item.quantity--"
          :disabled="item.quantity <= 1"
          class="w-8 h-8 flex items-center justify-center rounded-md border border-[#996040] text-[#996040] font-bold hover:bg-[#996040] hover:text-white transition"
        >−</button>

        <span class="text-lg font-medium">{{ item.quantity }}</span>

        <button
          @click="item.quantity++"
          class="w-8 h-8 flex items-center justify-center rounded-md border border-[#996040] text-[#996040] font-bold hover:bg-[#996040] hover:text-white transition"
        >+</button>

        <div
          @click="cart.removeFromCart(index)"
          class="w-8 h-8 flex items-center justify-center rounded-md border border-[#996040] text-[#996040] font-bold hover:bg-[#996040] hover:text-white transition"
        >
          <Trash2 />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center text-lg italic py-10">
    Votre panier est vide.
  </div>
</template>

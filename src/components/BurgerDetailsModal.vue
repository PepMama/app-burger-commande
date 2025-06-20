<template>
  <div class="fixed inset-0 bg-black/60 flex items-end md:items-center justify-end z-50" @click="$emit('close')">
    <div class="p-6 flex flex-col justify-between h-full bg-[#faf5ed] text-[#996040] rounded-l-lg w-full max-w-md" @click.stop>
      <div>
        <img class="rounded-t-lg w-44 mx-auto" :src="`/images/${burger.image}`" alt="" />

        <h2 class="text-xl font-bold mb-2">{{ burger.name }}</h2>
        <p class="mb-2">{{ burger.description }}</p>
        <p class="mb-6 font-semibold">Prix : {{ burger.price }} €</p>

        <div
          v-for="(ingredient, i) in localIngredients"
          :key="ingredient.name"
          class="flex items-center justify-between mb-2"
        >
          <span>{{ ingredient.name }}</span>
          <div class="flex items-center gap-4">
            <button
              @click="decrementIngredient(i)"
              :disabled="ingredient.quantity <= 1"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-[#996040] text-[#996040] font-bold hover:bg-[#996040] hover:text-white transition"
            >−</button>
            <span class="text-lg font-medium">{{ ingredient.quantity }}</span>
            <button
              @click="incrementIngredient(i)"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-[#996040] text-[#996040] font-bold hover:bg-[#996040] hover:text-white transition"
            >+</button>
            <div
              @click="removeIngredient(i)"
              class="w-8 h-8 flex items-center justify-center rounded-md border border-[#996040] text-[#996040] font-bold hover:bg-[#996040] hover:text-white transition"
            >
              <Trash2 />
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-4 w-full">
        <div class="flex w-full border border-[#996040] rounded-lg overflow-hidden">
          <button
            class="basis-1/3 px-3 py-1 text-[#996040] hover:bg-[#996040] hover:text-[#faf5ed] border-r border-[#996040]"
            @click="quantity--"
            :disabled="quantity <= 1"
          >−</button>

          <input
            type="number"
            v-model="quantity"
            min="1"
            class="basis-1/3 text-center border-none focus:outline-none"
          />

          <button
            class="basis-1/3 px-3 py-1 text-[#996040] hover:bg-[#996040] hover:text-[#faf5ed] border-l border-[#996040]"
            @click="quantity++"
          >+</button>
        </div>

        <button
          class="text-[#faf5ed] bg-[#996040] px-4 py-2 rounded hover:bg-[#e99969] transition-colors"
          @click="confirmAddToCart"
        >
          Ajouter au panier
        </button>

        <button
          class="text-[#faf5ed] bg-[#996040] px-4 py-2 rounded hover:bg-[#e99969] transition-colors"
          @click="$emit('close')"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Burger, Ingredient } from '@/types/Burger'
import { useCartStore } from '@/stores/cart'
import { Trash2 } from 'lucide-vue-next'

const props = defineProps<{ burger: Burger }>()
const burger = props.burger

const cartStore = useCartStore()

const localIngredients = reactive<Ingredient[]>(
  burger.composition.ingredients.map(i => ({ ...i }))
)

const quantity = ref(1)

function incrementIngredient(index: number) {
  localIngredients[index].quantity++
}

function decrementIngredient(index: number) {
  if (localIngredients[index].quantity > 1) localIngredients[index].quantity--
}

function removeIngredient(index: number) {
  localIngredients.splice(index, 1)
}

function confirmAddToCart() {
  const customBurger: Burger = {
    ...burger,
    composition: {
      ...burger.composition,
      ingredients: localIngredients.map(i => ({ ...i }))
    }
  }

  cartStore.addToCart(customBurger, quantity.value)
  quantity.value = 1
  localIngredients.splice(0, localIngredients.length, ...burger.composition.ingredients.map(i => ({ ...i })))
  // emit('close')
}
</script>

<script setup lang="ts">


import { onMounted, ref } from 'vue'
import BurgerCard from '@/components/BurgerCard.vue'
import BurgerDetailsModal from '@/components/BurgerDetailsModal.vue'

import NavBar from '../components/navbar.vue'
import Description from '../components/header-description.vue'
import Footer from '../components/footer.vue'

import { useCartStore, getBurgerQuantity } from '@/stores/cart'
import type { Burger } from '@/types/Burger'
const cartStore = useCartStore()
console.log('Cart Store:', cartStore)

const burgers = ref<Burger[]>([])
const selectedBurger = ref<Burger | null>(null)

async function fetchBurgers() {
  try {
    const res = await fetch('http://localhost:3000/burgers')
    burgers.value = await res.json()
  } catch (error) {
    console.error('Erreur lors de la récupération des burgers :', error)
  }
}

function showBurgerDetails(burger: Burger) {
  selectedBurger.value = burger
}

onMounted(() => {
  fetchBurgers()
})

</script>

<template>
  <div class="md:px-[10vw] items-center justify-center mx-auto">
    <header>
      <NavBar />
    </header>
    <main>
      <Description class="h-screen" />

      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 items-center justify-center mx-auto">
        <BurgerCard v-for="burger in burgers" :key="burger.id" :burger="burger" @click="showBurgerDetails(burger)" />

        <BurgerDetailsModal
          v-if="selectedBurger"
          :burger="selectedBurger"
          @close="selectedBurger = null"
        />
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

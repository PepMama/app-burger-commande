<script setup lang="ts">
import { MoveLeft, MoveRight } from 'lucide-vue-next';
import NavBar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import BurgerItemBasket from '../components/BurgerItemBasket.vue'

import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import router from '@/router'

const userStore = useUserStore()
const cart = useCartStore()

function goToConfirmation() {
  if (cart.items.length > 0) {
    router.push('/confirmation')
  }
}
</script>

<template>
  <div class="md:px-[10vw] items-center justify-center mx-auto">
    <header>
      <NavBar />
    </header>
    <main class="w-full mx-auto h-5xl">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-[5vh] font-extrabold leading-none mb-6">Panier de {{ userStore.username }}</h1>
        <div class="border flex gap-5 items-center rounded-full hover:cursor-pointer hover:bg-white hover:text-[#996040] px-6 py-2 mb-6 w-fit">
          <MoveLeft />
          <router-link
            to="/" >
            Voir la liste
          </router-link>
        </div>
      </div>
      <p class="place-items-start text-4xl">Mes bugers</p>
      <div class="w-full h-0.5 bg-white my-6 rounded-full"></div>

      <BurgerItemBasket />

      <div class="flex justify-between items-center">
        <p class="place-items-start text-2xl">Sous total HT</p>
        <p class="place-items-start text-xl">{{ cart.total ? cart.total.toFixed(2) + ' €' : '0.00 €' }}</p>
      </div>
      <div class="w-full h-0.5 bg-white my-6 rounded-full"></div>
      <div class="flex justify-between items-center">
        <p class="place-items-start text-3xl">Total TTC</p>
        <p class="place-items-start text-2xl font-bold">
          {{ cart.total ? (cart.total * 1.25).toFixed(2) + ' €' : '0.00 €' }}
        </p>
      </div>
      <button
        @click="goToConfirmation"
        :disabled="cart.items.length === 0"
        class="border justify-center mx-auto flex gap-5 items-center rounded-full px-6 py-2 w-fit transition
           text-white bg-[#996040] hover:bg-white hover:text-[#996040]
           hover:cursor-pointer
           disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
      >
        Commander
        <MoveRight />
      </button>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

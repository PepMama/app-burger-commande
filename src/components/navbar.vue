<script setup lang="ts">
import { Hamburger, ShoppingCart, DoorOpen } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

const router = useRouter()


</script>

<template>
  <nav
    class="z-[999] top-0 w-full flex flex-col md:flex-row items-center md:justify-between justify-center px-6 py-4 mb-6 text-xl"
  >
    <!-- Logo + nom -->
    <div class="flex items-center gap-2 mb-4 md:mb-0">
      <Hamburger class="stroke-white size-10" />
      <router-link class="font-medium" to="/">Burger Shop</router-link>
    </div>

    <!-- Menu -->
    <div class="w-full md:w-auto mb-4 md:mb-0">
      <ul class="flex flex-col md:flex-row items-center md:gap-4 gap-2">
        <li><router-link to="/">Accueil</router-link></li>
        <li class="cursor-pointer" @click="router.push('/'), $emit('change-category', 'burgers')">
          Nos Burgers
        </li>
        <li class="cursor-pointer" @click="router.push('/'), $emit('change-category', 'commands')">
          Mes Commandes
        </li>
      </ul>
    </div>

    <!-- Panier + Déconnexion -->
    <div class="flex items-center gap-2">
      <!-- Panier -->
      <ul class="border p-2 flex gap-2 items-center rounded hover:cursor-pointer hover:bg-white hover:text-[#996040]">
        <ShoppingCart />
        <router-link to="/basket">  Mon Panier</router-link>
      </ul>

      <!-- Déconnexion -->
      <ul class="border p-2 flex gap-2 items-center rounded hover:cursor-pointer hover:bg-white hover:text-[#996040]">
        <router-link to="/login"><DoorOpen /></router-link>
      </ul>
    </div>
  </nav>
  <div class="w-full h-0.5 mb-6 block md:hidden bg-[#faf5ed] rounded-full"></div>
</template>


<style scoped>

</style>

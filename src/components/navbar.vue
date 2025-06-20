<script setup lang="ts">
    import { Hamburger, ShoppingCart, House, DoorOpen  } from 'lucide-vue-next';
</script>

<template>
  <nav class="z-[999] top-0 w-full flex items-center justify-between px-6 py-4 mb-6 text-xl">
    <!-- Logo + nom -->
    <div class="flex items-center gap-2">
      <Hamburger class="stroke-white size-10" />
      <router-link class="font-medium" to="/">Burger Shop</router-link>
    </div>

    <!-- Menu -->
    <div>
      <ul class="flex gap-4 items-center">
        <li><router-link to="/">Accueil</router-link></li>
        <li class="cursor-pointer" @click="$emit('change-category', 'burgers')">Nos Burgers</li>
        <li class="cursor-pointer" @click="$emit('change-category', 'commands')">Mes Commandes</li>
      </ul>
    </div>

    <!-- Panier + Déconnexion (collés) -->
    <div class="flex items-center gap-2">
      <!-- Panier -->
      <ul class="border p-2 flex gap-2 items-center rounded hover:cursor-pointer hover:bg-white hover:text-[#996040]">
        <ShoppingCart />
        <li><router-link to="/basket">Mon Panier</router-link></li>
      </ul>

      <!-- Déconnexion -->
      <ul class="border p-2 flex gap-2 items-center rounded hover:cursor-pointer hover:bg-white hover:text-[#996040]">

        <router-link to="/login"><DoorOpen /></router-link>
      </ul>
    </div>
  </nav>
</template>

<style scoped>

</style>

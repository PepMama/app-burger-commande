<script setup lang="ts">
    import { Hamburger, ShoppingCart, House } from 'lucide-vue-next';
</script>

<template>
  <nav class="z-[999] sticky top-0 w-full flex items-center justify-between px-6 py-4 mb-6 text-xl">
    <div class="flex items-center gap-2">
        <Hamburger class="stroke-white size-10" />
        <router-link class="font-medium " to="/">Burger Shop</router-link>
    </div>
    <div>
        <ul class="flex gap-4 items-center">
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/">Nos Burgers</router-link></li>
    </ul>
    </div>
    <ul class="border p-2 flex gap-5 items-center rounded hover:cursor-pointer hover:bg-white hover:text-[#996040]">
        <ShoppingCart />
        <li><router-link to="/">Mon Panier</router-link></li>
    </ul>
  </nav>
</template>

<style scoped>

</style>

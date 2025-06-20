<script setup lang="ts">
import { MoveRight } from 'lucide-vue-next';
</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-between gap-10">
    <div class="w-full md:w-1/2 text-center md:text-start">
      <h1 class="text-[48px] md:text-[80px] lg:text-[100px] font-extrabold leading-none mb-6">
        Burger Shop
      </h1>
      <p class="text-base md:text-sm italic max-w-md mx-auto md:mx-0 leading-relaxed mb-8">
        Des recettes généreuses, des ingrédients frais, un goût inoubliable.
        Composez votre menu, ajoutez au panier et commandez en quelques clics.
      </p>
      <div
        class="border flex gap-3 items-center justify-center md:justify-start rounded-full hover:cursor-pointer hover:bg-white hover:text-[#996040] px-6 py-2 w-fit mx-auto md:mx-0"
      >
        <MoveRight />
        <router-link to="/">Voir la liste</router-link>
      </div>
    </div>

    <div class="w-full md:w-1/2 flex justify-center relative">
      <div class="absolute top-1/2 -translate-y-1/2 blur-3xl bg-white opacity-20 w-[110%] h-[110%] rounded-full z-0"></div>
      <img
        src="../assets/burger-home.png"
        alt="Burger"
        class="w-[80%] md:w-full relative z-10"
      />
    </div>
  </div>
</template>


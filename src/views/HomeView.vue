<script setup lang="ts">


import { ref } from 'vue'
import BurgerCard from '@/components/BurgerCard.vue'
import BurgerDetailsModal from '@/components/BurgerDetailsModal.vue'

const burgers = ref([
  {
    id: 1,
    name: 'Cheeseburger',
    description: 'Délicieux cheeseburger classique',
    price: 5.5,
    image: 'BurgerClassique.png',
    composition: 'Steak, fromage, salade, tomate, sauce spéciale'
  },
  {
    id: 2,
    name: 'Bacon Burger',
    description: 'Savoureux burger avec du bacon croustillant',
    price: 6.0,
    image: 'BurgerClassique.png',
    composition: 'Steak, bacon, fromage, oignons, sauce barbecue'
  },
  {
    id: 3,
    name: 'Vegan Burger',
    description: 'Burger végétalien avec galette de légumes',
    price: 5.0,
    image: 'BurgerClassique.png',
    composition: 'Galette de légumes, avocat, salade, tomate, sauce vegan'
  },
  {
    id: 4,
    name: 'Spicy Chicken Burger',
    description: 'Burger de poulet épicé avec sauce piquante',
    price: 6.5,
    image: 'BurgerClassique.png',
    composition: 'Poulet épicé, fromage, salade, sauce piquante'
  },
  {
    id: 5,
    name: 'Double Cheeseburger',
    description: 'Double portion de fromage et de viande',
    price: 7.0,
    image: 'BurgerClassique.png',
    composition: 'Deux steaks, double fromage, salade, tomate, sauce spéciale'
  },
  {
    id: 6,
    name: 'Mushroom Swiss Burger',
    description: 'Burger avec champignons et fromage suisse',
    price: 6.0,
    image: 'BurgerClassique.png',
    composition: 'Steak, champignons sautés, fromage suisse, oignons, sauce moutarde'
  }
])

const selectedBurger = ref(null)

function showBurgerDetails(burger) {
  console.log('Burger sélectionné:', burger)
  selectedBurger.value = burger
}

</script>

<template>
   <div class="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 md:px-[10vw] items-center justify-center mx-auto bg-[#996040]">
    <BurgerCard v-for="burger in burgers" :key="burger.id" :burger="burger" @click="showBurgerDetails(burger)" />

    <BurgerDetailsModal
      v-if="selectedBurger"
      :burger="selectedBurger"
      @close="selectedBurger = null"
    />
  </div>
</template>

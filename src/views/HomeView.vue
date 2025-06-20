<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import BurgerCard from '@/components/BurgerCard.vue'
import BurgerDetailsModal from '@/components/BurgerDetailsModal.vue'

import NavBar from '@/components/navbar.vue'
import Description from '@/components/header-description.vue'
import Footer from '@/components/footer.vue'
import type { Burger } from '@/types/Burger'
import CommandeHistory from '@/components/CommandeHistory.vue'

const selectedCategory = ref('burgers')

const burgers = ref<Burger[]>([])
const selectedBurger = ref<Burger | null>(null)

async function fetchBurgers() {
  try {
    const res = await fetch('http://localhost:3000/burgers')
    burgers.value = await res.json()
  } catch (e) {
    console.error('Erreur lors de la récupération des burgers :', e)
  }
}

function showBurgerDetails(b: Burger) {
  selectedBurger.value = b
}

onMounted(() => {
  fetchBurgers()
})

const burgersSection = ref<HTMLElement | null>(null)
const commandsSection = ref<HTMLElement | null>(null)

watch(selectedCategory, async (newCategory) => {
  await nextTick() // attend que le DOM soit mis à jour

  if (newCategory === 'burgers' && burgersSection.value) {
    burgersSection.value.scrollIntoView({ behavior: 'smooth' })
  } else if (newCategory === 'commands' && commandsSection.value) {
    commandsSection.value.scrollIntoView({ behavior: 'smooth' })
  }
})

</script>


<template>
  <div class="md:px-[10vw] items-center justify-center mx-auto">
    <header>
      <NavBar @change-category="selectedCategory = $event"  />
    </header>
    <main>
      <Description class="md:h-[90vh]" />
      <h2 class="text-[48px] md:text-[60px] lg:text-[100px] font-extrabold leading-none mb-8 mt-3">Nos Burgers</h2>
      <div ref="burgersSection" v-if="selectedCategory === 'burgers'" class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <BurgerCard
          v-for="burger in burgers"
          :key="burger.id"
          :burger="burger"
          @click="showBurgerDetails(burger)"
        />
        <BurgerDetailsModal
          v-if="selectedBurger"
          :burger="selectedBurger"
          @close="selectedBurger = null"
        />
      </div>

      <div ref="commandsSection" v-else-if="selectedCategory === 'commands'" class="text-center text-white mt-10">
        <CommandeHistory />
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

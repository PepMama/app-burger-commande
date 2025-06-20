<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useUserStore } from '@/stores/user'

interface OrderItem {
  id: number
  name: string
  quantity: number
}

interface Commande {
  user: string
  email: string
  address: string
  items: OrderItem[]
  dateTime: string
  total: number
}

const userStore = useUserStore()
const commandes = ref<Commande[]>([])
const openCommandeIndex = ref<number | null>(null)

function toggleCommande(index: number) {
  openCommandeIndex.value = openCommandeIndex.value === index ? null : index
}

async function fetchCommandes() {
  try {
    const res = await fetch(`http://localhost:3000/commandes/${userStore.username}`)
    commandes.value = await res.json()
  } catch (error) {
    console.error('Erreur de récupération des commandes:', error)
  }
}

onMounted(fetchCommandes)
</script>

<template>
  <div class="md:px-[10vw] items-center justify-center mx-auto">

    <main class="w-full mx-auto">
      <div class="flex flex-col justify-center items-center">
        <h1 class="text-[5vh] font-extrabold leading-none mb-6">
          Commandes de {{ userStore.username }}
        </h1>
      </div>

      <div v-if="commandes.length === 0" class="text-center text-white text-xl mt-10">
        Aucune commande trouvée.
      </div>

      <div
        v-for="(commande, index) in commandes"
        :key="index"
        class="mb-4 rounded-xl bg-[#996040] text-white border overflow-hidden transition-all duration-300"
      >
        <!-- Header cliquable avec flèche -->
        <div
          class="cursor-pointer p-6 hover:bg-[#f7f4f2] hover:text-[#996040] transition flex items-center justify-between"
          @click="toggleCommande(index)"
        >
          <h2 class="text-xl font-bold">Commande du {{ commande.dateTime }}</h2>
          <!-- Flèche qui tourne -->
          <svg
            :class="{'transform rotate-180': openCommandeIndex === index, 'transform rotate-0': openCommandeIndex !== index}"
            class="w-6 h-6 transition-transform duration-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </div>

        <!-- Contenu déplié avec transition fade + slide -->
        <transition
          enter-active-class="transition ease-out duration-1300"
          enter-from-class="opacity-0 max-h-0"
          enter-to-class="opacity-100 max-h-screen"
          leave-active-class="transition ease-in duration-700"
          leave-from-class="opacity-100 max-h-screen"
          leave-to-class="opacity-0 max-h-0"
        >
          <div
            v-show="openCommandeIndex === index"
            class="px-6 pb-6 overflow-hidden"
            style="transition-property: max-height, opacity;"
          >
            <p><strong>Email :</strong> {{ commande.email }}</p>
            <p><strong>Adresse :</strong> {{ commande.address }}</p>

            <div class="mt-4">
              <p class="text-xl font-semibold">Articles :</p>
              <ul class="list-disc ml-6">
                <li v-for="item in commande.items" :key="item.id">
                  {{ item.quantity }}x {{ item.name }}
                </li>
              </ul>
            </div>

            <div class="mt-4 font-bold text-right">
              Total : {{ commande.total.toFixed(2) }} €
            </div>
          </div>
        </transition>
      </div>
    </main>
  </div>
</template>

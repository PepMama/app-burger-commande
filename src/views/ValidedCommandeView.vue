<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
import Footer from '@/components/footer.vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'
import { Home } from 'lucide-vue-next'

const userStore = useUserStore()
const router = useRouter()

function goToHome() {
  router.push('/')
}

</script>

<template>
  <div class="md:px-[10vw] items-center justify-center mx-auto">
    <div class="flex flex-col items-center justify-center mx-auto h-[100vh] relative">
      <h1 class="text-[5vh] font-extrabold leading-none mb-6">Merci pour votre commande {{ userStore.username }} !</h1>
      <p class="text-[3vh] mt-6 mb-6">Bon appétit, et à très bientôt sur notre site !</p>
      <button
        @click="goToHome"
        class="border justify-center mx-auto flex gap-5 items-center rounded-full px-6 py-2 w-fit transition
           text-white bg-[#996040] hover:bg-white hover:text-[#996040]
           hover:cursor-pointer
           disabled:bg-gray-400 disabled:text-white disabled:cursor-not-allowed"
      >
        <Home />
        Retourner à l'accueil.
      </button>
    </div>

  </div>
</template>

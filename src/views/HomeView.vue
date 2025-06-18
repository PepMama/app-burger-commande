<script setup lang="ts">
import NavBar from '../components/navbar.vue'
import Description from '../components/header-description.vue'
import Footer from '../components/footer.vue'
import { useUserStore } from '@/stores/user'

const store = useUserStore()
</script>

<template>
  <div class="md:px-[10vw] items-center justify-center mx-auto">
    <header>
      <NavBar/>
    </header>
    <main>
      <Description class="h-screen" />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
  <div>
    <h1>Bienvenue, {{ store.username || 'invité' }} !</h1>
  </div>
</template>

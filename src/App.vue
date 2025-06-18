<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <!-- Optionnel : barre de navigation -->
    <nav>
      <router-link to="/">Accueil</router-link>
      <router-link to="/login">Connexion</router-link>
    </nav>

    <!-- Vue courante selon l'URL -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
// Rien ici pour un App simple
</script>

<style>

</style>

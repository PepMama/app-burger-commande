<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import NavBar from '../components/navbar.vue'
import Footer from '../components/footer.vue'
import { MoveLeft } from 'lucide-vue-next';


const cart = useCartStore()
const user = useUserStore()
const router = useRouter()

const name = ref(user.username || '')
const email = ref('')
const address = ref('')

const errors = ref<string[]>([])

function goToValided() {
  router.push('/valided')
}

async function submitOrder() {
  errors.value = []

  console.log('TEST')

  if (!name.value || !email.value || !address.value) {
    errors.value.push('Tous les champs sont obligatoires.')
  } else if (!email.value.match(/^[\w-.]+@[\w-]+\.[a-z]{2,}$/i)) {
    errors.value.push('Email invalide.')
  }

  if (errors.value.length > 0) return


  try {
    const response = await fetch(`http://localhost:3000/commandes/new/${user.username}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        address: address.value,
        items: cart.items,
        total: cart.total * 1.25
      })
    })

    if (!response.ok) throw new Error('Erreur lors de l’envoi')

    cart.items = []
    router.push('/valided')
  } catch (err) {
    errors.value.push('Une erreur est survenue.')
    console.error(err)
  }
}

</script>

<template>
  <div class="md:px-[10vw] items-center justify-center mx-auto">
    <NavBar />
    <div class="max-w-xl mx-auto py-10 h-screen">



      <h1 class="text-3xl font-bold mb-6">Finaliser votre commande</h1>

      <div class="border justify-center mx-auto flex gap-5 items-center rounded-full hover:cursor-pointer hover:bg-white hover:text-[#996040] px-6 py-2 m-4 w-fit">
        <MoveLeft />
        <router-link to="/basket" >
            Valider la commande
        </router-link>
      </div>

      <div v-if="errors.length" class="text-red-500 mb-4">
        <ul>
          <li v-for="err in errors" :key="err">• {{ err }}</li>
        </ul>
      </div>

      <form @submit.prevent="submitOrder" class="grid gap-4">
        <input v-model="name" type="text" placeholder="Nom" class="border p-2 rounded" />
        <input v-model="email" type="email" placeholder="Email" class="border p-2 rounded" />
        <input v-model="address" type="text" placeholder="Adresse" class="border p-2 rounded" />


        <div class="border justify-center mx-auto flex gap-5 items-center rounded-full hover:cursor-pointer hover:bg-white hover:text-[#996040] px-6 py-2 m-4 w-fit">
          <button class="cursor-pointer" type="submit">
            Valider la commande
          </button>
        </div>

      </form>
    </div>
    <Footer />
  </div>
</template>

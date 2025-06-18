import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Burger {
  id: number
  name: string
  price: number
  description?: string
  image?: string
}

interface CartItem extends Burger {
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  function addToCart(burger: Burger) {
    const existing = items.value.find(i => i.id === burger.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ ...burger, quantity: 1 })
    }
  }

  function removeFromCart(burgerId: number): Burger {
    items.value = items.value.filter(i => i.id !== burgerId)
  }

  return { items, addToCart, removeFromCart }
})

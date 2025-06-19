import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Burger } from '@/types/Burger'

export const useCartStore = defineStore('cart', () => {
  const items = ref<Burger[]>([])

  function addToCart(burger: Burger, quantity: number = 1) {
    const existing = items.value.find(i => i.id === burger.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      items.value.push({ ...burger, quantity })
    }
  }

  function defineQuantity(burger: Burger, quantity: number): void {
    const existing = items.value.find(i => i.id === burger.id)
    if (existing) {
      if (quantity <= 0) {
        removeFromCart(burger.id)
      } else {
        existing.quantity = quantity
      }
    }
    else {
      items.value.push({ ...burger, quantity })
    }
  }

  function removeFromCart(burgerId: number): void {
    items.value = items.value.filter(i => i.id !== burgerId)
  }
  
  function getBurgerQuantity(burgerId: number): number {
    const burger = items.value.find(i => i.id === burgerId)
    return burger ? burger.quantity : 0
  }
  
  const total = computed(() =>
    items.value.reduce((acc, item) => acc + item.price * item.quantity, 0)
  )

  return { items, addToCart, removeFromCart, getBurgerQuantity, defineQuantity, total }
})

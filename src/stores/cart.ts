/* stores/cart.ts */
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Burger } from '@/types/Burger'

type CartItem = {
  id: number
  compositionKey: string
  burger: Burger
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  function makeKey(b: Burger) {
    return b.composition.ingredients
      .map(i => `${i.name}-${i.quantity}`)
      .sort()
      .join('|')
  }

  function addToCart(burger: Burger, qty = 1) {
    const key = makeKey(burger)
    const existing = items.value.find(i => i.id === burger.id && i.compositionKey === key)
    if (existing) existing.quantity += qty
    else items.value.push({ id: burger.id, compositionKey: key, burger: structuredClone(burger), quantity: qty })
  }

  function getTotalQuantity(id: number) {
    return items.value.filter(i => i.id === id).reduce((sum, it) => sum + it.quantity, 0)
  }

  function removeFromCart(index: number) {
    items.value.splice(index, 1)
  }

  function setQuantity(index: number, qty: number) {
    if (items.value[index]) items.value[index].quantity = qty
  }

  const total = computed(() => items.value.reduce((s, it) => s + it.burger.price * it.quantity, 0))

  return { items, addToCart, removeFromCart, setQuantity, getTotalQuantity, total }
})

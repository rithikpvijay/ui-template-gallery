import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const isLoading = ref(false)
  const error = ref<string | Error | null>(null)

  async function fetchUsers() {
    try {
      isLoading.value = true
      error.value = null
      const res = await fetch('data/users.json')
      if (!res.ok) throw new Error('Something went wrong')
      users.value = await res.json()
    } catch (err) {
      if (err instanceof Error) error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  return { users, isLoading, error, fetchUsers }
})

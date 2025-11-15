import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import { API_USERS } from '@/types/UsersApi'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const isLoading = ref(false)
  const error = ref<string | Error | null>(null)

  async function fetchUsers() {
    try {
      isLoading.value = true
      error.value = null
      const res = await fetch(API_USERS)
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

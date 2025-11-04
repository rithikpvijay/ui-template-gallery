import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import { API_USERS } from '@/types/UsersApi'
import type { UserData } from '@/types/UserData'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const isLoading = ref(false)
  const error = ref<string | Error | null>(null)
  const filteredUsers = ref<User[]>([])
  const searchQuery = ref<string | null>(null)
  let filteredUserByStatus: User[]

  const getUserDataByKey = computed(() => {
    return (key: UserData) => [...new Set(users.value.map((user) => user[key]))]
  })

  const getUserById = computed(() => {
    return (id: number) => users.value.find((user) => user.id === id)
  })

  async function fetchUsers() {
    try {
      isLoading.value = true

      error.value = null
      const res = await fetch(`/${API_USERS}`)
      if (!res.ok) throw new Error('Something went wrong')

      users.value = await res.json()
      filteredUsers.value = users.value
    } catch (err) {
      if (err instanceof Error) {
        error.value = err.message
        console.error(err.message)
      }
    } finally {
      isLoading.value = false
    }
  }

  function filterUserByStatus(status: string) {
    if (!users.value.length) return

    if (status === 'All') {
      filteredUserByStatus = users.value
    } else {
      filteredUserByStatus = users.value.filter((user) => user.status === status)
    }

    filteredUsers.value = filteredUserByStatus
  }

  function filterUserByQuery(query: string) {
    searchQuery.value = query

    if (!query) {
      filteredUsers.value = filteredUserByStatus
      return
    }

    filteredUsers.value = filteredUserByStatus.filter((user) =>
      Object.values(user).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase()),
      ),
    )
  }

  function updateUser(id: number, value: Partial<User>) {
    users.value = users.value.map((user) => (user.id === id ? { ...user, ...value } : user))
    filteredUsers.value = users.value
  }

  return {
    error,
    fetchUsers,
    filteredUsers,
    filterUserByStatus,
    filterUserByQuery,
    getUserById,
    getUserDataByKey,
    isLoading,
    searchQuery,
    updateUser,
    users,
  }
})

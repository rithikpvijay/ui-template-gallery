import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import { API_USERS } from '@/types/UsersApi'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const isLoading = ref(false)
  const error = ref<string | Error | null>(null)
  const filteredUsers = ref<User[]>([])
  const searchQuery = ref<string | null>(null)
  let filteredUserByStatus: User[]

  const getUsersName = computed(() => {
    return [...new Set(filteredUsers.value.map((user) => user.name))]
  })

  const getUsersCompany = computed(() => {
    return [...new Set(filteredUsers.value.map((user) => user.company))]
  })

  const getUsersStatus = computed(() => {
    return [...new Set(filteredUsers.value.map((user) => user.status))]
  })

  const getUsersPhone = computed(() => {
    return filteredUsers.value.map((user) => user.phone)
  })

  const getUsersAssignedTo = computed(() => {
    return [...new Set(filteredUsers.value.map((user) => user.mentor))]
  })

  const getUsersEmail = computed(() => {
    return [...new Set(filteredUsers.value.map((user) => user.email))]
  })

  async function fetchUsers() {
    try {
      isLoading.value = true

      error.value = null
      const res = await fetch(API_USERS)
      if (!res.ok) throw new Error('Something went wrong')

      users.value = await res.json()
      filteredUsers.value = users.value
      filteredUserByStatus = users.value
    } catch (err) {
      if (err instanceof Error) error.value = err.message
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

  return {
    error,
    fetchUsers,
    filteredUsers,
    filterUserByStatus,
    filterUserByQuery,
    getUsersAssignedTo,
    getUsersCompany,
    getUsersEmail,
    getUsersName,
    getUsersPhone,
    getUsersStatus,
    isLoading,
    searchQuery,
    users,
  }
})

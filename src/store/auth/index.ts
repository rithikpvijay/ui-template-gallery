import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/subapaseClient'
import { useToast } from 'vue-toastification'
import router from '@/router'

const toast = useToast()

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  const signUp = async (email: string, password: string) => {
    try {
      isLoading.value = true
      const { data, error: authError } = await supabase.auth.signUp({ email, password })
      if (authError) {
        throw authError
      }
      user.value = data.user
      toast.success('User Signed Up Successfully')
      router.replace('/sign-in')
    } catch (err: unknown) {
      const e = err as AuthError
      error.value = e.message || 'Something went wrong while signing up'
      toast.error('Something went wrong')
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, signUp }
})

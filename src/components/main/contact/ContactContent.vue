<template>
  <div class="contact-content-container">
    <div class="contact-table">
      <contact-table></contact-table>
    </div>

    <div class="contact-rows">
      <div v-for="user in users" :key="user.id" class="contact-row">
        <contact-rows :user="user"></contact-rows>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { User } from '@/types/User'
import ContactTable from '@/components/main/contact/ContactTable.vue'
import ContactRows from '@/components/main/contact/ContactRows.vue'

const users = ref<User[] | null>(null)
const isLoading = ref(false)
const error = ref<Error | string | null>(null)

async function getUsers() {
  try {
    isLoading.value = true

    const res = await fetch('data/users.json')
    if (!res.ok) throw new Error('Something went wrong')

    users.value = await res.json()
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message
    }
  } finally {
    isLoading.value = false
  }
}

getUsers()
</script>

<style scoped>
.contact-content-container {
  border: 1px solid var(--color-border);
  border-bottom: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.contact-table,
.contact-row {
  display: grid;
  grid-template-columns: 0.1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  font-size: 13px;
  padding-left: 10px;
  border-bottom: 1px solid var(--color-border);
  align-items: center;
  cursor: pointer;
}

.contact-rows {
  flex: 1;
  overflow-y: scroll;
}
</style>

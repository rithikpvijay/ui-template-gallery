<template>
  <div class="contact-content-container">
    <div class="contact-table">
      <contact-table></contact-table>
    </div>

    <div class="contact-rows" v-if="filteredUsers.length && !isLoading">
      <div v-for="user in filteredUsers" :key="user.id" class="contact-row">
        <contact-rows :user="user"></contact-rows>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ContactTable from '@/components/main/contact/ContactTable.vue'
import ContactRows from '@/components/main/contact/ContactRows.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const store = useUserStore()

const { filteredUsers, isLoading } = storeToRefs(store)

store.fetchUsers()
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

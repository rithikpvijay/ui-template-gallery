<template>
  <div class="contact-content-container">
    <div class="contact-table">
      <contact-table></contact-table>
    </div>

    <div class="contact-rows" v-if="filteredUsers.length && !isLoading">
      <router-link
        :to="`/contact-list/${user.id}`"
        v-for="user in filteredUsers"
        :key="user.id"
        class="contact-row"
      >
        <contact-rows :user="user"></contact-rows>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ContactTable from '@/components/main/contact/ContactTable.vue'
import ContactRows from '@/components/main/contact/ContactRows.vue'
import { useUserStore } from '@/store/user'

const store = useUserStore()

const { filteredUsers, isLoading } = storeToRefs(store)
</script>

<style scoped>
.contact-content-container {
  border: 1px solid var(--color-border);
  border-bottom: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 144px);
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

.contact-row {
  text-decoration: none;
  color: var(--color-text);
}

.contact-rows {
  flex: 1;
  overflow-y: scroll;
}
</style>

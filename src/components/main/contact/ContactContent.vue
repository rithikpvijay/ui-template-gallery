<template>
  <div class="contact-content-container">
    <div class="contact-table">
      <contact-table></contact-table>
    </div>

    <div class="contact-rows" v-if="filteredUsers.length && !isLoading">
      <router-link
        :to="routeBuilder.contactDetails(user.id)"
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
import { routeBuilder } from '@/utility/routeBuilder'

const store = useUserStore()

const { filteredUsers, isLoading } = storeToRefs(store)
</script>

<style scoped>
.contact-content-container {
  border-top: 1px solid var(--color-border);
  border-bottom: none;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 144px);
  padding-bottom: 24px;
}

.contact-table,
.contact-row {
  display: grid;
  grid-template-columns: 0.1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  font-size: 13px;
  padding-left: 10px;
  border: 1px solid var(--color-border);
  border-top: none;
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

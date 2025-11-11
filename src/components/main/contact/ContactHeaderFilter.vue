<template>
  <base-menu>
    <template #title>
      <div class="filter-title">
        <p>{{ title ? title : 'ALL' }}</p>
        <Icon icon="material-symbols:arrow-drop-down" width="16" height="16" />
      </div>
    </template>

    <template #menu>
      <div v-for="item in filterItems" :key="item" @click="handleFilter(item)">{{ item }}</div>
    </template>
  </base-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/store/user'

const filterItems = ['All', 'Salaried', 'Commission', 'Terminated']
const title = ref<string | null>(null)
const store = useUserStore()

function handleFilter(value: string) {
  title.value = value.toUpperCase()
  store.filterUserByStatus(value)
}
</script>

<style scoped>
.filter-title {
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  padding: 6px 12px;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  letter-spacing: 0.4px;
}

.filter-title:hover {
  background-color: var(--color-heading-hover);
}
</style>

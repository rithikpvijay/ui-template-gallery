<template>
  <base-menu>
    <template #title>
      <p>{{ title ? title : 'ALL' }}</p>
      <Icon icon="material-symbols:arrow-drop-down" width="16" height="16" />
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

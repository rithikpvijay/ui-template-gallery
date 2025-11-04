<template>
  <base-menu>
    <template #title>
      <p>{{ title ? title : 'ALL' }}</p>
      <Icon icon="material-symbols:arrow-drop-down" width="16" height="16" />
    </template>

    <template #menu>
      <div @click="handleFilter('All')">All</div>
      <div @click="handleFilter('Salaried')">Salaried</div>
      <div @click="handleFilter('Commission')">Commission</div>
      <div @click="handleFilter('Terminated')">Terminated</div>
    </template>
  </base-menu>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const title = ref<string | null>(null)
const store = useUserStore()
function handleFilter(value: string) {
  title.value = value.toUpperCase()
  store.filterUserByStatus(value)
}
</script>

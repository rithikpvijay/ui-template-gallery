<template>
  <base-menu>
    <template #title>
      <p>ALL</p>
      <Icon icon="material-symbols:arrow-drop-down" width="16" height="16" />
    </template>

    <template #menu>
      <div v-for="item in filterItems" :key="item">{{ item }}</div>
    </template>
  </base-menu>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const filterItems = ['All', 'Salaried', 'Commission', 'Terminated']
</script>

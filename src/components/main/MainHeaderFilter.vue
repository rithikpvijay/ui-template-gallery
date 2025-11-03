<template>
  <base-menu>
    <template #title>
      <p>ALL</p>
      <Icon icon="material-symbols:arrow-drop-down" width="16" height="16" />
    </template>

    <template #menu>
      <div>All</div>
      <div>Salaried</div>
      <div>Commission</div>
      <div>Terminated</div>
    </template>
  </base-menu>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

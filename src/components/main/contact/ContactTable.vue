<template>
  <input type="checkbox" class="check-box" />

  <div class="table-heading" v-for="header in tableHeaders" :key="header">
    <p>{{ header }}</p>
    <Icon icon="tabler:filter-2" width="16" height="16" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const tableHeaders = ['Name', 'Company', 'Status', 'Assigned To', 'Phone', 'Email']
</script>

<style scoped>
.table-heading {
  color: var(--color-table-content);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 12px 24px 12px 12px;
}

.table-heading:hover {
  background-color: var(--color-secondary);
  color: var(--color-text);
}

.check-box {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
</style>

<template>
  <input type="checkbox" class="check-box" />

  <div class="table-heading">
    <p>Name</p>
    <Icon icon="tabler:filter-2" width="16" height="16" />
  </div>

  <div class="table-heading">
    <p>Company</p>
    <Icon icon="tabler:filter-2" width="16" height="16" />
  </div>

  <div class="table-heading">
    <p>Status</p>
    <Icon icon="tabler:filter-2" width="16" height="16" />
  </div>

  <div class="table-heading">
    <p>Assigned to</p>
    <Icon icon="tabler:filter-2" width="16" height="16" />
  </div>

  <div class="table-heading">
    <p>Phone</p>
    <Icon icon="tabler:filter-2" width="16" height="16" />
  </div>

  <div class="table-heading">
    <p>Email</p>
    <Icon icon="tabler:filter-2" width="16" height="16" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
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

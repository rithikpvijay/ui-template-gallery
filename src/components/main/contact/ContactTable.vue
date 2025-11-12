<template>
  <input type="checkbox" class="check-box" />

  <div class="table-heading" v-for="(header, index) in tableHeaders" :key="header">
    <base-filter-menu :header="header">
      <template #title>
        <p>{{ header }}</p>
      </template>
      <template #trigger>
        <Icon icon="tabler:filter-2" width="16" height="16" />
      </template>
      <template #filter-menu>
        <div v-for="(name, i) in getUsersProps[index]?.value" :key="i">
          <input type="checkbox" class="check-box" />
          <div>
            {{ name }}
          </div>
        </div>
      </template>
    </base-filter-menu>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import BaseFilterMenu from '@/components/UI/BaseFilterMenu.vue'

const tableHeaders = ['Name', 'Company', 'Status', 'Assigned to', 'Phone', 'Email']
const {
  getUsersName,
  getUsersAssignedTo,
  getUsersCompany,
  getUsersEmail,
  getUsersPhone,
  getUsersStatus,
} = storeToRefs(useUserStore())

const getUsersProps = [
  getUsersName,
  getUsersCompany,
  getUsersStatus,
  getUsersAssignedTo,
  getUsersPhone,
  getUsersEmail,
]
</script>

<style scoped>
.table-heading {
  color: var(--color-table-content);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
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

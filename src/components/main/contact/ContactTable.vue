<template>
  <input type="checkbox" class="check-box" />

  <div class="table-heading" v-for="(header, index) in tableHeaders" :key="header">
    <base-filter-menu
      :header="header"
      :position="
        index === tableHeaders.length - 1
          ? ElementPosition.BOTTOM_RIGHT
          : ElementPosition.BOTTOM_LEFT
      "
    >
      <template #title>
        <p class="header">{{ header }}</p>
      </template>
      <template #trigger>
        <Icon icon="tabler:filter-2" width="16" height="16" />
      </template>
      <template #filter-menu>
        <div v-for="(name, i) in getUserDataByKey(toCamelCase(header) as keyof User)" :key="i">
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
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import BaseFilterMenu from '@/components/UI/BaseFilterMenu.vue'
import { toCamelCase } from '@/utility/toCamelCase'
import { useUserStore } from '@/store/user'
import type { User } from '@/types/User'
import { ElementPosition } from '@/types/ElementPosition'

const tableHeaders = ['Name', 'Company', 'Status', 'Assigned to', 'Phone', 'Email']
const { getUserDataByKey } = storeToRefs(useUserStore())
</script>

<style scoped>
.table-heading {
  color: var(--color-table-content);
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
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

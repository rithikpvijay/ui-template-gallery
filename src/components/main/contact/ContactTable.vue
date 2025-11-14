<template>
  <input type="checkbox" class="check-box" />

  <div class="table-heading" v-for="(header, index) in tableHeaders" :key="header" ref="headerEl">
    <base-filter-menu
      :header="header"
      :position="index === tableHeaders.length - 1 ? 'bottom-end' : 'bottom-start'"
      :target="headerEl"
    >
      <template #title>
        <p class="header">{{ header }}</p>
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
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/store/user'
import BaseFilterMenu from '@/components/UI/BaseFilterMenu.vue'

const headerEl = ref<HTMLElement[] | null>()

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

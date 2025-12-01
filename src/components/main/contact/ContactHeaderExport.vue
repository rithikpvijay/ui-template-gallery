<template>
  <base-menu>
    <template #title>
      <div class="export-title">
        <Icon icon="mingcute:file-export-line" width="20" height="16" />
        <Icon icon="material-symbols:arrow-drop-down" width="16" height="16" />
      </div>
    </template>

    <template #menu>
      <div class="export-item" v-for="item in exportItems" :key="item.text">
        <Icon :icon="item.iconName" width="16" height="16" style="color: var(--color-icon)" />
        <p>{{ item.text }}</p>
      </div>
    </template>
  </base-menu>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface ExportItem {
  iconName: string
  text: string
}

const exportItems: ExportItem[] = [
  {
    iconName: 'tdesign:file-pdf',
    text: 'Export all data to Excel',
  },
  {
    iconName: 'lucide:file-input',
    text: 'Export selected rows to excel',
  },
  {
    iconName: 'tdesign:file-pdf',
    text: 'Export all data to PDF',
  },
  {
    iconName: 'lucide:file-input',
    text: 'Export selected row to PDF',
  },
]
</script>

<style scoped>
.export-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.export-title {
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  padding: 6px 12px;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  letter-spacing: 0.4px;
}

.export-title:hover {
  background-color: var(--color-heading-hover);
}
</style>

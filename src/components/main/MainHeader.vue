<template>
  <div class="header-container">
    <div class="main-header-left">
      <p class="contacts-text">Contacts</p>
      <main-header-filter></main-header-filter>
    </div>

    <div class="main-header-right">
      <div class="contact">
        <Icon icon="ic:baseline-plus" width="16" height="16" />
        <p>Add Contact</p>
      </div>

      <base-icon icon="mingcute:refresh-4-line" class="refresh-icon"></base-icon>
      <div class="separator"></div>
      <main-header-export></main-header-export>
      <div class="separator"></div>
      <base-icon icon="material-symbols:square-outline-rounded"></base-icon>
      <base-search-bar placeholder="Contact Search" width="160px" fontSize="13px"></base-search-bar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import MainHeaderFilter from '@/components/main/MainHeaderFilter.vue'
import MainHeaderExport from '@/components/main/MainHeaderExport.vue'
</script>

<style scoped>
.header-container {
  padding: 26px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.main-header-left {
  display: flex;
  align-items: center;
  gap: 30px;
}

.contacts-text {
  font-size: 22px;
}

svg {
  margin-bottom: 2px;
}

.contact {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: var(--color-blue);
  text-transform: uppercase;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 500;
  padding: 5px 12px 5px 8px;
  box-shadow: var(--shadow-button);
  cursor: pointer;
}

.contact p {
  letter-spacing: 0.5px;
}

.contact:hover {
  background-color: var(--color-blue-dark);
}

.refresh-icon {
  rotate: 40deg;
}

.separator {
  width: 1px;
  height: 24px;
  background-color: var(--color-border);
}

.search {
  font-size: 14px;
}

.main-header-right {
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>

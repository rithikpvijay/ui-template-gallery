<template>
  <form>
    <div class="search-bar">
      <Icon icon="material-symbols:search" width="16" height="16" class="icon" />

      <input type="text" :placeholder="placeholder" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
interface Props {
  placeholder: string
}
defineProps<Props>()
</script>

<style scoped>
.search-bar {
  display: inline-flex;
  /* border-bottom: 1px solid #888; */

  position: relative;
}

input {
  border: none;
  outline: none;
  padding: 9px 12px 9px 30px;
  background-color: var(--color-secondary);
  font-size: 12px;
  border-bottom: 1px solid #888;
}

input:hover {
  background-color: var(--color-onhover);
  border-bottom: 1px solid #333;
}

.icon {
  color: var(--color-search-icon);
  position: absolute;
  top: 7px;
  left: 9px;
}
</style>

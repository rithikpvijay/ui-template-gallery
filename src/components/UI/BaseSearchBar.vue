<template>
  <div class="search-bar">
    <Icon icon="material-symbols:search" width="16" height="16" class="icon" />
    <input
      type="text"
      :placeholder="placeholder"
      :style="{ width, fontSize }"
      v-model.trim="searchQuery"
      @input="handleInput"
    />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

interface Props {
  placeholder: string
  width?: string
  fontSize?: string
}

const emit = defineEmits(['search'])

const searchQuery = ref<string>('')

withDefaults(defineProps<Props>(), {
  width: '100%',
  fontSize: '12px',
})

function handleInput() {
  emit('search', searchQuery.value)
}
</script>

<style scoped>
.search-bar {
  display: inline-flex;
  position: relative;
}

input {
  border: none;
  outline: none;
  padding: 9px 12px 9px 30px;
  background-color: var(--color-secondary);
  border-bottom: 1px solid #888;
}

input:hover {
  background-color: var(--color-search-bar-hover);
  border-bottom: 1px solid #333;
}

.icon {
  color: var(--color-search-icon);
  position: absolute;
  top: 7px;
  left: 9px;
  pointer-events: none;
}
</style>

<template>
  <div class="search-bar">
    <Icon icon="material-symbols:search" width="16" height="16" class="icon" />
    <input
      type="text"
      :placeholder="placeholder"
      :style="{ width, fontSize }"
      v-model.trim="searchQuery"
      class="search-bar-input"
      @input="handleInput"
      @focus="handleFocusState(true)"
      @blur="handleFocusState(false)"
    />
    <Transition name="focus">
      <div class="focus-state" v-if="isFocus"></div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

interface Props {
  placeholder: string
  width?: string
  fontSize?: string
}

const emit = defineEmits<{ (e: 'search', value: string): void }>()
const searchQuery = ref<string>('')
const isFocus = ref(false)

withDefaults(defineProps<Props>(), {
  width: '100%',
  fontSize: '12px',
})

const handleInput = () => {
  emit('search', searchQuery.value)
}

const handleFocusState = (value: boolean) => {
  isFocus.value = value
}
</script>

<style scoped>
.search-bar {
  display: flex;
  position: relative;
}

.search-bar-input {
  border: none;
  outline: none;
  padding: 9px 12px 9px 30px;
  background-color: var(--color-secondary);
  border-bottom: 1px solid var(--color-search-bar-border);
}

.search-bar-input:hover {
  background-color: var(--color-search-bar-hover);
  border-bottom: 1px solid var(--color-border-hover);
}

.icon {
  color: var(--color-search-icon);
  position: absolute;
  top: 7px;
  left: 9px;
  pointer-events: none;
}

.focus-state {
  position: absolute;
  width: 100%;
  height: 1.5px;
  background-color: var(--color-blue);
  bottom: -1px;
}

.focus-enter-from {
  transform: scale(0);
}

.focus-enter-to {
  transform: scale(1);
}

.focus-enter-active {
  transition: all 0.4s ease;
}
</style>

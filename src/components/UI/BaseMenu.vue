<template>
  <div class="wrapper" ref="menuRef">
    <div class="title-container" @click="handleMenuToggle" :class="{ active: isOpen }">
      <slot name="title" />
    </div>
    <Transition name="fade">
      <div class="menu" v-if="isOpen" @click="handleMenuClick">
        <slot name="menu" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

function handleMenuClick() {
  isOpen.value = false
}

function handleMenuToggle() {
  isOpen.value = !isOpen.value
}

function handleClickOutside(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.wrapper {
  position: relative;
}

.title-container {
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  padding: 6px 12px;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  letter-spacing: 0.4px;
}

.title-container:hover {
  background-color: var(--color-heading-hover);
}

.active {
  background-color: var(--color-heading-hover);
}

.menu {
  position: absolute;
  width: max-content;
  padding: 4px 1px;
  display: inline-flex;
  flex-direction: column;
  font-size: 13px;
  box-shadow: var(--shadow-menu);
  z-index: 10;
  background-color: var(--color-primary);
  top: 100%;
  left: 0;
}

.menu > * {
  padding: 10px 12px;
  cursor: pointer;
  font-size: 13px;
}

.menu > *:hover {
  background-color: var(--color-heading-hover);
}

.menu > *:active {
  background-color: var(--color-active);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active {
  transition: all 0.2s ease-out;
}

.fade-leave-active {
  transition: all 0.2s ease-in;
}
</style>

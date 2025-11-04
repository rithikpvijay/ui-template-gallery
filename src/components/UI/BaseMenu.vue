<template>
  <div class="wrapper" ref="menuRef">
    <div class="title-container" @click="handleMenuToggle" :class="{ active: isOpen }">
      <slot name="title" />
    </div>
    <Transition name="fade">
      <div class="menu" :style="menuStyle" v-if="isOpen" @click="handleMenuClick">
        <slot name="menu" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { CSSProperties } from 'vue'

interface Props {
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'
}

const props = defineProps<Props>()

const isOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

function handleMenuClick() {
  isOpen.value = false
}

function handleMenuToggle() {
  isOpen.value = !isOpen.value
}

function handleClick() {
  isOpen.value = false
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    isOpen.value = false
  }
}

const menuStyle = computed(() => {
  const baseStyle = ref<CSSProperties>({
    position: 'absolute',
    width: 'max-content',
    padding: '4px 1px',
    display: 'inline-flex',
    flexDirection: 'column',
    fontSize: '13px',
    boxShadow: 'var(--shadow-menu)',
    zIndex: 10,
    backgroundColor: 'var(--color-primary)',
  })

  if (props.position) {
    if (props.position === 'bottom-right') {
      return { ...baseStyle.value, top: '100%', right: '0' }
    }
    if (props.position === 'top-right') {
      return { ...baseStyle.value, bottom: '100%', right: '0' }
    }
    if (props.position === 'top-left') {
      return { ...baseStyle.value, bottom: '100%', left: '0' }
    }
  }
  return { ...baseStyle.value, top: '100%', left: '0' }
})

onMounted(() => {
  document.addEventListener('click', handleClick)
  document.addEventListener('keydown', handleKeyDown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.wrapper {
  position: relative;
}

.active {
  background-color: var(--color-heading-hover);
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

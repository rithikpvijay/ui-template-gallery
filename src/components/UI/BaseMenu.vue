<template>
  <div class="wrapper" ref="menuRef">
    <div class="title-container" @click="handleMenuToggle" :class="{ active: isOpen }">
      <slot name="title" />
    </div>
    <Transition name="fade">
      <div
        class="menu"
        :style="{
          ...menuStyle,
          '--menu-hover': props.hoverColor || 'var(--color-heading-hover)',
          backgroundColor: props.backgroundColor,
          color: props.color,
          top: props.top,
          left: props.left,
        }"
        v-if="isOpen"
        @click="handleMenuClick"
      >
        <slot name="menu"></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { CSSProperties } from 'vue'

interface Props {
  backgroundColor?: string
  color?: string
  hoverColor?: string
  top?: string
  left?: string
  width?: string
  position?:
    | 'bottom-left'
    | 'bottom-right'
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-center'
}

const props = defineProps<Props>()
const isOpen = ref(false)
const emit = defineEmits<{ (e: 'menuClose'): void; (e: 'menuToggle', value: boolean): void }>()
const menuRef = ref<HTMLElement | null>(null)

function handleMenuClick() {
  isOpen.value = false
  emit('menuClose')
}

function handleMenuToggle() {
  isOpen.value = !isOpen.value
  emit('menuToggle', isOpen.value)
}

function handleClickOutside(e: MouseEvent) {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false
    emit('menuClose')
  }
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

    if (props.position === 'top-center') {
      return { ...baseStyle.value, bottom: '100%', left: '50%', transform: 'translateX(-50%)' }
    }
    if (props.position === 'bottom-center') {
      return { ...baseStyle.value, top: '100%', left: '50%', transform: 'translateX(-50%)' }
    }
  }
  return { ...baseStyle.value, top: '100%', left: '0' }
})

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

.active {
  background-color: var(--color-menu-hover);
}

.menu {
  background-color: var(--color-primary);
}

.menu > * {
  padding: 10px 12px;
  cursor: pointer;
  font-size: 13px;
}

.menu > *:hover {
  background-color: var(--menu-hover);
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

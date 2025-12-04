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
import { ElementPosition } from '@/types/ElementPosition'
import { getElementPosition } from '@/utility/getElementPosition'

interface Props {
  position?: ElementPosition
}

const props = withDefaults(defineProps<Props>(), {
  position: ElementPosition.BOTTOM_CENTER,
})

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

  const position = getElementPosition(props.position)
  return { ...baseStyle.value, ...position }
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

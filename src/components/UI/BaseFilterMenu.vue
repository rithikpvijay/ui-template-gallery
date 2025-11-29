<template>
  <div class="container-wrapper" ref="menuRef">
    <div class="filter-menu-heading">
      <slot name="title" />
      <div @click="handleOpen">
        <slot name="trigger" />
      </div>
    </div>

    <Transition name="fade">
      <div :style="filterMenuStyle" class="base-menu-container" v-if="isOpen">
        <div class="scroll-area">
          <div class="header">
            <input type="checkbox" class="check-box" />
            <p>Select All</p>
          </div>
          <div class="options">
            <slot name="filter-menu" />
          </div>
        </div>
        <div class="menu-container-buttons">
          <div @click="handleClose">OK</div>
          <div @click="handleClose">CANCEL</div>
        </div>
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
  header: string
  target?: HTMLElement[] | null
  position?: ElementPosition
}

const props = withDefaults(defineProps<Props>(), {
  position: ElementPosition.BOTTOM_CENTER,
})
const menuRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const menuOpenDelay = 150

const filterMenuStyle = computed(() => {
  const baseStyle = ref<CSSProperties>({
    position: 'absolute',
    boxShadow: 'var(--shadow-menu-filter)',
    height: '315px',
    width: '252px',
    backgroundColor: 'var(--color-primary)',
    zIndex: '100',
    padding: '6px 3px 6px 12px',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    color: 'var(--color-text)',
    fontWeight: '400',
  })

  const position = getElementPosition(props.position)
  return { ...baseStyle.value, ...position }
})

const handleClose = () => {
  isOpen.value = false
}

const handleOpen = () => {
  if (!isOpen.value) {
    isOpen.value = true
    return
  }
  isOpen.value = false
  setTimeout(() => {
    isOpen.value = true
  }, menuOpenDelay)
}

const handleClickOutside = (e: MouseEvent) => {
  if (menuRef.value && !menuRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.container-wrapper {
  position: relative;
  display: flex;
  gap: 4px;
  width: 100%;
}

.filter-menu-heading {
  padding: 12px 24px 12px 12px;
  display: flex;
  gap: 4px;
}

.base-menu-container .header {
  display: flex;
  border-bottom: 1px solid var(--color-border);
  gap: 18px;
  padding: 12px 10px;
}

.base-menu-container .scroll-area {
  overflow-y: scroll;
  flex: 1;
}

.check-box {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.options {
  overflow-y: scroll;
}

.options > * {
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.options > *:hover {
  background-color: var(--color-onhover);
}

.menu-container-buttons {
  color: var(--color-blue);
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 10px;
  padding: 4px 12px;
  border-top: 1px solid var(--color-border);
}

.menu-container-buttons div {
  padding: 6px 12px;
  font-weight: 500;
}

.menu-container-buttons div:hover {
  background-color: var(--color-blue-light);
}

.fade-enter-from,
.fade-leave-to {
  transform: scale(0.5);
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  transform: scale(1);
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}
</style>

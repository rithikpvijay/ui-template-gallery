<template>
  <div class="list-item">
    <div class="heading-container" @click="handleClick">
      <div class="main-heading">
        <Icon :icon="icon" width="18" height="18" class="user-icon" />
        <p class="heading">{{ title }}</p>
      </div>
      <div>
        <Icon
          icon="mdi:chevron-down"
          width="18"
          height="18"
          class="arrow"
          :class="{ 'arrow-rotate': isOpen }"
        />
      </div>
    </div>
    <Transition
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div class="sub-heading" v-if="isOpen">
        <p v-for="item in lists" :key="item">{{ item }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

interface Props {
  item: {
    title: string
    lists: string[]
    icon: string
  }
}

const props = defineProps<Props>()

const { title, lists, icon } = props.item

const isOpen = ref(true)

function handleClick() {
  isOpen.value = !isOpen.value
}

function beforeEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0'
}

function enter(el: Element) {
  const htmlEl = el as HTMLElement
  const height = htmlEl.scrollHeight + 'px'
  htmlEl.style.transition = 'height 0.3s ease-out'
  htmlEl.style.height = height
}

function beforeLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
}

function leave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.transition = 'height 0.3s ease-in'
  htmlEl.style.height = '0'
}
</script>

<style scoped>
.list-item {
  border-bottom: 1px solid #ddd;
  overflow: hidden;
}

.heading-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 12px 4px 16px;
  cursor: pointer;
  height: 37px;
}

.heading-container:hover {
  background-color: var(--color-heading-hover);
}

.main-heading {
  display: flex;
  align-items: center;
  gap: 14px;
}

.heading {
  font-size: 13px;
  font-weight: 600;
}

.arrow {
  rotate: -90deg;
  color: var(--color-arrow);
  transition: all 0.1s;
}

.arrow-rotate {
  rotate: 0deg;
}

.sub-heading {
  font-size: 13px;

  display: flex;
  flex-direction: column;
}

.sub-heading p {
  padding: 10px 48px;
}

.sub-heading p:hover {
  background-color: var(--color-heading-hover);
  cursor: pointer;
}

.sub-heading p.active {
  background-color: var(--color-list-active);
}
</style>

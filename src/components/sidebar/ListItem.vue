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
<<<<<<< HEAD
      @before-enter="beforeItemEnter"
      @enter="itemEnter"
      @before-leave="beforeItemLeave"
      @leave="itemLeave"
    >
      <div class="sub-heading" v-if="isOpen">
        <p v-for="item in lists" :key="item.text">{{ item.text }}</p>
=======
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <div class="sub-heading" v-if="isOpen">
        <p v-for="item in lists" :key="item">{{ item }}</p>
>>>>>>> 62558fa (feat(side-bar): add side bar)
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import type { SideBarItem } from '@/types/SideBarItem'

interface Props {
  item: SideBarItem
=======
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

interface Props {
  item: {
    title: string
    lists: string[]
    icon: string
  }
>>>>>>> 62558fa (feat(side-bar): add side bar)
}

const props = defineProps<Props>()

const { title, lists, icon } = props.item

const isOpen = ref(true)

function handleClick() {
  isOpen.value = !isOpen.value
}

<<<<<<< HEAD
function beforeItemEnter(el: Element) {
=======
function beforeEnter(el: Element) {
>>>>>>> 62558fa (feat(side-bar): add side bar)
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0'
}

<<<<<<< HEAD
function itemEnter(el: Element) {
=======
function enter(el: Element) {
>>>>>>> 62558fa (feat(side-bar): add side bar)
  const htmlEl = el as HTMLElement
  const height = htmlEl.scrollHeight + 'px'
  htmlEl.style.transition = 'height 0.3s ease-out'
  htmlEl.style.height = height
}

<<<<<<< HEAD
function beforeItemLeave(el: Element) {
=======
function beforeLeave(el: Element) {
>>>>>>> 62558fa (feat(side-bar): add side bar)
  const htmlEl = el as HTMLElement
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
}

<<<<<<< HEAD
function itemLeave(el: Element) {
=======
function leave(el: Element) {
>>>>>>> 62558fa (feat(side-bar): add side bar)
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
<<<<<<< HEAD
<<<<<<< HEAD
  background-color: var(--color-active);
=======
  background-color: var(--color-list-active);
>>>>>>> 62558fa (feat(side-bar): add side bar)
=======
  background-color: var(--color-active);
>>>>>>> 0b8eb4d (feat(main) : add main content)
}
</style>

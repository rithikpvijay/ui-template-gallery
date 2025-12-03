<template>
  <div class="list-item">
    <div class="heading-container" @click="handleListItemCollpase">
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
      @before-enter="beforeItemEnter"
      @enter="itemEnter"
      @before-leave="beforeItemLeave"
      @leave="itemLeave"
    >
      <div class="sub-heading" v-if="isOpen && !isSidebarCollapsed">
        <p
          v-for="item in lists"
          :key="item.text"
          @click="handleNavigation(item.navigateTo)"
          :class="{ 'active-route': item.navigateTo === route.path }"
        >
          {{ item.text }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { routeBuilder } from '@/utility/routeBuilder'
import { useLayoutState } from '@/hooks/useLayoutState'
import { RoutePath } from '@/types/RoutePath'
import type { SideBarItem } from '@/types/SideBarItem'

interface Props {
  item: SideBarItem
}

const { isSidebarCollapsed } = useLayoutState()
const route = useRoute()
const router = useRouter()
const props = defineProps<Props>()
const { title, lists, icon } = props.item
const isOpen = ref(true)
const containsCurrentRoute = computed(() => lists.some((list) => list.navigateTo === route.path))

watch(
  () => isSidebarCollapsed.value,
  (value) => {
    if (value) {
      isOpen.value = false
    } else if (containsCurrentRoute.value) {
      isOpen.value = true
    }
  },
)

const handleNavigation = (navigateTo: string | undefined) => {
  if (!navigateTo) {
    return
  }

  if (navigateTo === RoutePath.CONTACT_DETAILS) {
    router.push(routeBuilder.contactDetails(1))
    return
  }
  router.push(navigateTo)
}

function handleListItemCollpase() {
  isSidebarCollapsed.value = false
  isOpen.value = !isOpen.value
}

function beforeItemEnter(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = '0'
}

function itemEnter(el: Element) {
  const htmlEl = el as HTMLElement
  const height = htmlEl.scrollHeight + 'px'
  htmlEl.style.transition = 'height 0.3s ease-out'
  htmlEl.style.height = height
}

function beforeItemLeave(el: Element) {
  const htmlEl = el as HTMLElement
  htmlEl.style.height = htmlEl.scrollHeight + 'px'
}

function itemLeave(el: Element) {
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
  min-width: max-content;
}

.sub-heading p:hover {
  background-color: var(--color-heading-hover);
  cursor: pointer;
}

.active-route {
  background-color: var(--color-active);
}

.sub-heading .active-route:hover {
  background-color: var(--color-active);
}
</style>

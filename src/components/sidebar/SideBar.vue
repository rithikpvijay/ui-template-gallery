<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div v-for="item in items" :key="item.title">
        <list-item :item="item"></list-item>
      </div>
    </div>

    <div class="footer">
      <Transition name="footer">
        <p v-if="!isSidebarCollapsed">
          Copyright &copy; {{ date }} <br />
          Developer Express Inc.
        </p>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutState } from '@/hooks/useLayoutState'
import { RoutePath } from '@/types/RoutePath'
import type { SideBarItem } from '@/types/SideBarItem'
import ListItem from './ListItem.vue'

const { isSidebarCollapsed } = useLayoutState()
const items: SideBarItem[] = [
  {
    title: 'CRM',
    lists: [
      { text: 'Contact List', navigateTo: RoutePath.CONTACT_LIST },
      { text: 'Contact Details', navigateTo: RoutePath.CONTACT_DETAILS },
    ],
    icon: 'mdi:user',
  },
  {
    title: 'Planning',
    lists: [{ text: 'Task List' }, { text: 'Task Details' }, { text: 'Scheduler' }],
    icon: 'mdi:calendar',
  },
  {
    title: 'Analytics',
    lists: [
      { text: 'Dashboard', navigateTo: RoutePath.DASHBOARD },
      { text: 'Sales Analysis' },
      { text: 'Geography' },
    ],
    icon: 'material-symbols:analytics-outline-sharp',
  },
  {
    title: 'Authentication',
    lists: [
      { text: 'Sign In Form', navigateTo: RoutePath.SIGN_IN },
      { text: 'Register Form', navigateTo: RoutePath.SIGN_UP },
      { text: 'Reset Password Form' },
    ],
    icon: 'mdi:user-box',
  },
  {
    title: 'Common',
    lists: [{ text: 'User Profile' }],
    icon: 'iconamoon:box-fill',
  },
]

const date = new Date().getFullYear()
</script>

<style scoped>
.sidebar {
  padding: 16px 0;
  height: calc(100vh - 58px);
  display: flex;
  flex-direction: column;
}

.sidebar-content {
  flex: 1;
  overflow-y: scroll;
}

.footer {
  color: var(--color-footer-text);
  padding: 16px 16px 3px 16px;
  font-size: 13px;
  line-height: 1.2;
  min-width: max-content;
}

.footer-enter-from,
.footer-leave-to {
  opacity: 0;
}

.footer-enter-to,
.footer-leave-from {
  opacity: 1;
}

.footer-enter-active,
.footer-leave-active {
  transition: opacity 0.3s ease;
}
</style>

<template>
  <div class="sidebar">
    <div class="sidebar-content">
<<<<<<< HEAD
      <div v-for="item in items" :key="item.title">
        <list-item :item="item"></list-item>
      </div>
=======
      <list-item :item="item1"></list-item>
      <list-item :item="item2"></list-item>
      <list-item :item="item3"></list-item>
      <list-item :item="item4"></list-item>
      <list-item :item="item5"></list-item>
>>>>>>> 62558fa (feat(side-bar): add side bar)
    </div>

    <div class="footer">
      <p>
        Copyright &copy; {{ date }} <br />
        Developer Express Inc.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
<<<<<<< HEAD
import type { SideBarItem } from '@/types/SideBarItem'
import ListItem from './ListItem.vue'

const items: SideBarItem[] = [
  {
    title: 'CRM',
    lists: [{ text: 'Contact List' }, { text: 'Contact Details' }],
    icon: 'mdi:user',
  },
  {
    title: 'Planning',
    lists: [{ text: 'Task List' }, { text: 'Task Details' }, { text: 'Scheduler' }],
    icon: 'mdi:calendar',
  },
  {
    title: 'Analytics',
    lists: [{ text: 'Dashboard' }, { text: 'Sales Analysis' }, { text: 'Geography' }],
    icon: 'material-symbols:analytics-outline-sharp',
  },
  {
    title: 'Authentication',
    lists: [{ text: 'Sign In Form' }, { text: 'Register Form' }, { text: 'Reset Password Form' }],
    icon: 'mdi:user-box',
  },
  {
    title: 'Common',
    lists: [{ text: 'User Profile' }],
    icon: 'iconamoon:box-fill',
  },
]
=======
import ListItem from './ListItem.vue'

interface Item {
  title: string
  lists: string[]
  icon: string
}

const item1: Item = {
  title: 'CRM',
  lists: ['Contact List', 'Contact Details'],
  icon: 'mdi:user',
}

const item2: Item = {
  title: 'Planning',
  lists: ['Task List', 'Task Details', 'Scheduler'],
  icon: 'mdi:calendar',
}

const item3: Item = {
  title: 'Analytics',
  lists: ['Dashboard', 'Sales Analysis', 'Geography'],
  icon: 'material-symbols:analytics-outline-sharp',
}

const item4: Item = {
  title: 'Authentication',
  lists: ['Sign In Form', 'Register Form', 'Reset Password Form'],
  icon: 'mdi:user-box',
}

const item5: Item = {
  title: 'Common',
  lists: ['User Profile'],
  icon: 'iconamoon:box-fill',
}
>>>>>>> 62558fa (feat(side-bar): add side bar)

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
}
</style>

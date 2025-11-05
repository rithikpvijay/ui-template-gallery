<template>
  <div class="sidebar">
    <div class="sidebar-content">
      <div v-for="item in items" :key="item.title">
        <list-item :item="item"></list-item>
      </div>
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
import ListItem from './ListItem.vue'

interface Item {
  title: string
  lists: string[]
  icon: string
}

const items: Item[] = [
  {
    title: 'CRM',
    lists: ['Contact List', 'Contact Details'],
    icon: 'mdi:user',
  },
  {
    title: 'Planning',
    lists: ['Task List', 'Task Details', 'Scheduler'],
    icon: 'mdi:calendar',
  },
  {
    title: 'Analytics',
    lists: ['Dashboard', 'Sales Analysis', 'Geography'],
    icon: 'material-symbols:analytics-outline-sharp',
  },
  {
    title: 'Authentication',
    lists: ['Sign In Form', 'Register Form', 'Reset Password Form'],
    icon: 'mdi:user-box',
  },
  {
    title: 'Common',
    lists: ['User Profile'],
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
}
</style>

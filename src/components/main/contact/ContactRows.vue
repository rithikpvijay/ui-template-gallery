<template>
  <input type="checkbox" class="check-box" />

  <div class="row">
    <p v-html="highlightMatch(user.name, searchQuery)"></p>
    <p class="designation" v-html="highlightMatch(user.designation, searchQuery)"></p>
  </div>

  <div class="row" v-html="highlightMatch(user.company, searchQuery)"></div>
  <div class="row status" :class="statusColor">
    <span class="dot" :class="statusDotColor"></span>
    <span v-html="highlightMatch(user.status, searchQuery)"> </span>
  </div>
  <div class="row" v-html="highlightMatch(user.mentor, searchQuery)"></div>
  <div class="row" v-html="highlightMatch(user.phone, searchQuery)"></div>
  <div class="row" v-html="highlightMatch(user.email, searchQuery)"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import type { User } from '@/types/User'

interface Props {
  user: User
}

const props = defineProps<Props>()

const { searchQuery } = storeToRefs(useUserStore())

const statusColor = computed(() => {
  return {
    salaried: props.user.status === 'Salaried',
    commission: props.user.status === 'Commission',
    terminated: props.user.status === 'Terminated',
  }
})

const statusDotColor = computed(() => {
  return {
    'salaried-dot': props.user.status === 'Salaried',
    'commission-dot': props.user.status === 'Commission',
    'terminated-dot': props.user.status === 'Terminated',
  }
})

function highlightMatch(text: string, query: string | null): string {
  if (!query) return text
  const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${safeQuery})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}
</script>

<style scoped>
.check-box {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}

.row {
  padding: 10px 24px 10px 12px;
}

.designation {
  font-size: 12px;
  color: var(--color-table-content);
  margin-top: 2px;
}

.dot {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
}
.status {
  display: flex;
  align-items: center;
  gap: 6px;
}

.salaried {
  color: var(--color-salaried);
}

.terminated {
  color: var(--color-terminated);
}

.commission {
  color: var(--color-blue);
}

.salaried-dot {
  background-color: var(--color-salaried);
}

.terminated-dot {
  background-color: var(--color-terminated);
}

.commission-dot {
  background-color: var(--color-blue);
}
</style>

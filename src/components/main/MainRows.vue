<template>
  <input type="checkbox" class="check-box" />

  <div class="row">
    <p>{{ user.name }}</p>
    <p class="designation">{{ user.designation }}</p>
  </div>

  <div class="row">{{ user.company }}</div>
  <div class="row">{{ user.status }}</div>
  <div class="row">{{ user.mentor }}</div>
  <div class="row">{{ user.phone }}</div>
  <div class="row">{{ user.email }}</div>
</template>

<script setup lang="ts">
import type { User } from '@/types/User'

interface Props {
  user: User
}

defineProps<Props>()
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
</style>

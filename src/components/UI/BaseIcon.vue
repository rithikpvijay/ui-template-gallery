<template>
  <div class="icon">
    <Icon :icon="icon" :width="width" :height="height" :class="className" />
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

interface Props {
  icon: string
  width?: string
  height?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  width: '20',
  height: '16',
  className: '',
})
</script>

<style scoped>
.icon {
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.icon:hover {
  background-color: var(--color-onhover);
}
</style>

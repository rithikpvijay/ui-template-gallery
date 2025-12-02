<template>
  <div class="quality-container">
    <base-menu
      position="top-center"
      :backgroundColor="'var(--color-playback)'"
      :color="'var(--color-primary)'"
      :hoverColor="'var(--color-playback-hover)'"
      @menuClose="handleControlOnActionMenu"
      @menuToggle="handleControlOnActionMenu"
    >
      <template #title>
        <Icon icon="material-symbols:high-quality" width="24" height="24" class="quality-icon" />
      </template>
      <template #menu>
        <div
          v-for="(level, index) in [...hlsLevel].reverse()"
          :key="level.height"
          class="quality-options"
          :class="{ 'quality-active': selectedQuality === hlsLevel.length - 1 - index }"
          @click="handleVideoQuality(hlsLevel.length - 1 - index)"
        >
          {{ level.height }}p
        </div>
        <div
          class="quality-options"
          :class="{ 'quality-active': selectedQuality === -1 }"
          @click="handleVideoQuality(-1)"
        >
          Auto
        </div>
      </template>
    </base-menu>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { videoContextKey } from '@/types/VolumeContextKey'
import { Icon } from '@iconify/vue'

const videoContext = inject(videoContextKey)
if (!videoContext) {
  throw new Error('Video context is not provided')
}

const selectedQuality = ref(-1)
const { hlsInstance, hlsLevel } = videoContext

const handleVideoQuality = (value: number) => {
  if (!hlsInstance.value) {
    return
  }
  hlsInstance.value.currentLevel = value
  selectedQuality.value = value
}

const handleControlOnActionMenu = (value: boolean) => {
  videoContext.status.qualityOptionsMenu = value
  videoContext.handleControlVisibility()
}
</script>

<style scoped>
.quality-icon {
  cursor: pointer;
  color: var(--color-primary);
}

.quality-options {
  padding: 10px 48px;
}

.quality-options.quality-active {
  background-color: var(--color-blue);
}
</style>

<template>
  <div class="playback-speed-container">
    <base-menu
      :position="'top-center'"
      :backgroundColor="'var(--color-playback)'"
      :color="'var(--color-primary)'"
      :hoverColor="'var(--color-playback-hover)'"
      @menuClose="handleControlOnPlayBack(false)"
      @menuToggle="handleControlOnPlayBack"
    >
      <template #title>
        <Icon
          icon="tabler:brand-speedtest"
          width="24"
          height="24"
          class="playback-speed-icon"
          @click="handleControlOnPlayBack(true)"
        />
      </template>

      <template #menu>
        <div
          v-for="playBackSpeed in playbackSpeeds"
          :key="playBackSpeed.value"
          class="playback-options"
          :class="{ 'playback-active': selectedValue === playBackSpeed.value }"
          @click="handlePlayBackSpeed(playBackSpeed.value)"
        >
          {{ playBackSpeed.label }}
        </div>
      </template>
    </base-menu>

    <div class="playback-icon" v-for="icon in playbackIcons" :key="icon.value">
      <Icon :icon="icon.iconName" width="16" height="16" v-if="selectedIcon === icon.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { videoContextKey } from '@/types/VolumeContextKey'

const playbackSpeeds = [
  { label: '0.25x', value: 0.25 },
  { label: '0.5x', value: 0.5 },
  { label: '0.75x', value: 0.75 },
  { label: 'Normal', value: 1 },
  { label: '1.25x', value: 1.25 },
  { label: '1.5x', value: 1.5 },
  { label: '2x', value: 2 },
]

const playbackIcons = [
  {
    iconName: 'material-symbols:speed-0-25-rounded',
    value: 0.25,
  },
  {
    iconName: 'material-symbols:speed-0-5-rounded',
    value: 0.5,
  },
  {
    iconName: 'material-symbols:speed-0-75-rounded',
    value: 0.75,
  },
  {
    iconName: 'material-symbols:1x-mobiledata-rounded',
    value: 1,
  },
  {
    iconName: 'material-symbols:speed-1-25-rounded',
    value: 1.25,
  },
  {
    iconName: 'material-symbols:speed-1-5-rounded',
    value: 1.5,
  },
  {
    iconName: 'material-symbols:speed-1-75-rounded',
    value: 1.75,
  },
  {
    iconName: 'material-symbols:speed-2x-rounded',
    value: 2,
  },
]

const selectedValue = ref(1)
const selectedIcon = ref(1)
const videoContext = inject(videoContextKey)
if (!videoContext) {
  throw new Error('Video context not provided')
}

const handleControlOnPlayBack = (value: boolean) => {
  videoContext.status.playbackSpeed = value
  videoContext.handleControlVisibility()
}

const handlePlayBackSpeed = (playbackSpeed: number) => {
  if (!videoContext.videoRef.value) {
    return
  }
  videoContext.videoRef.value.playbackRate = playbackSpeed
  selectedValue.value = playbackSpeed
  selectedIcon.value = playbackSpeed
}
</script>

<style scoped>
.playback-speed-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: column;
  cursor: pointer;
}

.playback-speed-icon {
  color: var(--color-primary);
  cursor: pointer;
}

.playback-options {
  padding: 10px 48px;
}

.playback-options.playback-active {
  background-color: var(--color-blue);
}

.playback-icon {
  color: var(--color-primary);
  position: absolute;
  pointer-events: none;
  top: 55%;
}
</style>

<template>
  <div class="volume-container">
    <Icon
      :icon="`${volumeValue > 0 ? (volumeValue > 50 ? 'material-symbols:volume-up' : 'material-symbols:volume-down') : 'material-symbols:volume-off'}`"
      width="24"
      height="24"
      class="volume-icon"
      @click="handleMuteToggle"
    />

    <Transition name="volume">
      <base-slider
        v-model="volumeValue"
        :sliderWidth="64"
        :sliderHeight="10"
        :thumbHeight="12"
        :thumbWidth="12"
        :trackColor="'var(--color-primary)'"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { inject, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { videoContextKey } from '@/types/VolumeContextKey'

const videoContext = inject(videoContextKey)
if (!videoContext) {
  throw new Error('Video Context not provided')
}

const { videoRef, handleMuteToggle, volumeValue } = videoContext

watch(
  () => volumeValue.value,
  (newValue) => {
    if (!videoRef.value) {
      return
    }
    videoRef.value.volume = newValue / 100
  },
)
</script>

<style scoped>
.volume-container {
  display: flex;
  align-items: center;
  gap: 6px;
  min-width: 100px;
  overflow: hidden;
}

.volume-icon {
  color: var(--color-primary);
  cursor: pointer;
}

.volume-enter-from,
.volume-leave-to {
  opacity: 0;
}

.volume-enter-to,
.volume-leave-from {
  opacity: 1;
}

.volume-enter-active,
.volume-leave-active {
  transition: all 0.3s ease;
}
</style>

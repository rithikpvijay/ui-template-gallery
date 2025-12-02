<template>
  <div class="action-controllers">
    <div class="left-controls">
      <Icon
        v-for="controller in leftControllers"
        :key="controller.iconName"
        :icon="controller.iconName"
        :width="controller.width"
        :height="controller.height"
        :class="controller.className"
        @click.stop="controller.clickFn"
        @dblclick.stop
        style="color: var(--color-primary)"
      />
      <volume-button />
    </div>
    <div class="right-controls">
      <div class="display-time">
        {{ displayTime }}
      </div>
      <playback-speed />
      <video-quality />
      <Icon
        :icon="`${props.fullScreen ? 'material-symbols:fullscreen-exit' : 'material-symbols:fullscreen'}`"
        width="24"
        height="24"
        style="color: #fff"
        @click="handleFullScreen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { formatTime } from '@/utility/formatTime'
import type { VideoControllers } from '@/types/VideoConrollers'
import VolumeButton from './VolumeButton.vue'
import PlaybackSpeed from './PlaybackSpeed.vue'
import VideoQuality from './VideoQuality.vue'

interface Props {
  runTime: number | null
  currentTime: number | null
  fullScreen: boolean
  videoPlaying: boolean
  handlePlayBack: () => void
  handleFullScreen: () => void
  handleVideoForward: () => void
  handleVideoReplay: () => void
}

const props = defineProps<Props>()

const leftControllers = computed<VideoControllers[]>(() => [
  {
    iconName: props.videoPlaying
      ? 'material-symbols:pause-circle-rounded'
      : 'material-symbols:play-circle',
    width: '36',
    height: '36',
    clickFn: props.handlePlayBack,
    className: 'play-pause-icon',
  },
  {
    iconName: 'material-symbols:fast-rewind-rounded',
    width: '20',
    height: '20',
    clickFn: props.handleVideoReplay,
    className: 'rewind-icon',
  },
  {
    iconName: 'material-symbols:fast-forward-rounded',
    width: '20',
    height: '20',
    clickFn: props.handleVideoForward,
    className: 'forward-icon',
  },
])

const displayTime = computed(() => {
  if (!props.runTime || !props.currentTime) {
    return
  }
  const totalTime = `${formatTime(props.currentTime)}/${formatTime(props.runTime)}`
  return totalTime
})
</script>

<style scoped>
.action-controllers {
  display: flex;
  align-items: center;
  gap: 36px;
  width: 100%;
  justify-content: space-between;
}

.action-controllers svg {
  cursor: pointer;
}

.left-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.right-controls {
  display: flex;
  align-items: center;
  gap: 24px;
}

.display-time {
  color: var(--color-primary);
  font-size: 13px;
}

.play-pause-icon {
  margin-right: 12px;
}
</style>

<template>
  <TransitionGroup name="action">
    <div
      v-for="controller in actionControllers"
      :key="controller.iconName"
      class="icons-indicator-container"
    >
      <Icon
        v-if="controller.condition"
        :class="controller.className"
        :icon="controller.iconName"
        :width="controller.width"
        :height="controller.height"
      />
    </div>
  </TransitionGroup>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { VideoControllers } from '@/types/VideoConrollers'
import { computed } from 'vue'

interface Props {
  isVideoPlaying: boolean
  playPauseIndication: boolean
  rewindIndication: boolean
  forwardIndication: boolean
}
const props = defineProps<Props>()

const actionControllers = computed<VideoControllers[]>(() => [
  {
    condition: props.isVideoPlaying && props.playPauseIndication,
    iconName: 'material-symbols:play-circle',
    width: '64',
    height: '64',
    className: 'play-pause-indication',
  },
  {
    condition: !props.isVideoPlaying && props.playPauseIndication,
    iconName: 'material-symbols:pause-circle-rounded',
    width: '64',
    height: '64',
    className: 'play-pause-indication',
  },
  {
    condition: props.rewindIndication,
    iconName: 'material-symbols:fast-rewind-rounded',
    width: '54',
    height: '54',
    className: 'rewind-icon-indication',
  },
  {
    condition: props.forwardIndication,
    iconName: 'material-symbols:fast-forward-rounded',
    width: '54',
    height: '54',
    className: 'forward-icon-indication',
  },
])
</script>

<style scoped>
.icons-indicator-container {
  color: var(--color-primary);
}

.play-pause-indication {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.forward-icon-indication,
.rewind-icon-indication {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.forward-icon-indication {
  justify-content: end;
  right: 0%;
}

.action-enter-from,
.action-leave-to {
  opacity: 0;
}

.action-enter-to,
.action-leave-from {
  opacity: 1;
}

.action-enter-active {
  transition: all 0.3s ease-in;
}

.action-leave-active {
  transition: all 0.3s ease-out;
}
</style>

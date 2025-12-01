<template>
  <div
    v-for="controller in actionControllers"
    :key="controller.iconName"
    class="icons-indicator-container"
  >
    <Transition name="action" mode="out-in">
      <div v-if="controller.condition" :class="controller.className">
        <p v-if="props.activeIndication === 'volume'" class="volume-text">{{ volumeValueText }}</p>
        <Icon :icon="controller.iconName" :width="controller.width" :height="controller.height" />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import type { VideoControllers } from '@/types/VideoConrollers'
import type { Indication } from '@/utility/showIndication'

interface Props {
  isVideoPlaying: boolean
  activeIndication: Indication
  volumeValue: number
}
const props = defineProps<Props>()

const volumeValueText = computed(() => {
  return `${Math.ceil(props.volumeValue)}%`
})

const actionControllers = computed<VideoControllers[]>(() => [
  {
    condition: props.isVideoPlaying && props.activeIndication === 'play',
    iconName: 'material-symbols:play-circle',
    width: '64',
    height: '64',
    className: 'play-pause-indication',
  },
  {
    condition: !props.isVideoPlaying && props.activeIndication === 'play',
    iconName: 'material-symbols:pause-circle-rounded',
    width: '64',
    height: '64',
    className: 'play-pause-indication',
  },
  {
    condition: props.activeIndication === 'rewind',
    iconName: 'material-symbols:arrow-back-ios',
    width: '36',
    height: '36',
    className: 'rewind-icon-indication',
  },
  {
    condition: props.activeIndication === 'forward',
    iconName: 'material-symbols:arrow-forward-ios',
    width: '36',
    height: '36',
    className: 'forward-icon-indication',
  },
  {
    condition: props.activeIndication === 'volume',
    iconName: `${props.volumeValue > 0 ? (props.volumeValue > 50 ? 'material-symbols:volume-up' : 'material-symbols:volume-down') : 'material-symbols:volume-off'}`,
    width: '54',
    height: '54',
    className: 'volume-icon-indication',
  },
])
</script>

<style scoped>
.icons-indicator-container {
  color: var(--color-primary);
}

.volume-text {
  position: absolute;
  top: -50%;
  left: 50%;
  transform: translateX(-50%);
  font-weight: 500;
}

.volume-icon-indication,
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
  right: 1%;
}

.rewind-icon-indication {
  left: 1%;
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

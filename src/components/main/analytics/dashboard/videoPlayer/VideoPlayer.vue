<template>
  <div
    class="video-container"
    ref="videoWrapperRef"
    @mousemove="handleControlVisibility"
    @dblclick="handleFullScreen"
  >
    <Icon
      v-if="!status.videoReady || status.buffering"
      icon="line-md:loading-alt-loop"
      width="64"
      height="64"
      class="loading-icon"
    />

    <flash-indicators
      :is-video-playing="status.videoPlaying"
      :volume-value="volumeValue"
      :active-indication="activeIndication"
    />

    <video
      width="768px"
      ref="videoRef"
      poster="/images/poster.png"
      @timeupdate="syncSlider"
      @click="handlePlayBack"
      @loadedmetadata="handleMetaData"
      @loadeddata="status.videoReady = true"
      @waiting="status.buffering = true"
      @playing="status.buffering = false"
    />

    <Transition name="controls">
      <div class="controls" v-show="status.controlVisible" @dblclick.stop>
        <base-slider
          hover
          v-model="sliderValue"
          :thumbColor="'var(--color-blue)'"
          @dragging="status.dragging = $event"
          @dblclick.stop
        />

        <action-controllers
          :run-time="runTime"
          :current-time="currentTime"
          :full-screen="status.fullscreen"
          :video-playing="status.videoPlaying"
          :handle-full-screen="handleFullScreen"
          :handle-play-back="handlePlayBack"
          :handle-video-forward="handleVideoForward"
          :handle-video-replay="handleVideoReplay"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  shallowRef,
  toRefs,
  watch,
} from 'vue'
import { Icon } from '@iconify/vue'
import Hls, { Level } from 'hls.js'
import { handleVisibilityTimeout } from '@/utility/handleVisibilityTimeout'
import { VIDEO_URL_HLS } from '@/types/VideoUrl'
import { showIndication } from '@/utility/showIndication'
import type { Indication } from '@/utility/showIndication'
import { videoContextKey } from '@/types/VolumeContextKey'
import FlashIndicators from './FlashIndicators.vue'
import ActionControllers from './ActionControllers.vue'

const status = reactive({
  buffering: false,
  controlVisible: true,
  dragging: false,
  fullscreen: false,
  videoPlaying: false,
  videoReady: false,
  volume: false,
  playbackSpeedMenu: false,
  qualityOptionsMenu: false,
})

const { controlVisible } = toRefs(status)
const actionMenu = computed(() => status.playbackSpeedMenu || status.qualityOptionsMenu)
const hlsInstance = shallowRef<Hls | null>(null)
const hlsLevel = shallowRef<Level[]>([])
const activeIndication = ref<Indication>('')
const videoRef = ref<HTMLVideoElement | null>(null)
const videoWrapperRef = ref<HTMLElement | null>(null)

const runTime = ref<number | null>(null)
const currentTime = ref<number | null>(null)
const iconIndicationTimeout = ref<number | null>(null)
const controlHideTimeout = ref<number | null>(null)

const sliderValue = ref(0)
const volumeValue = ref(100)
const lastVolumeValue = ref(100)
const skipSeconds = 5
const volumeStep = 10
const controlVisibityTimeMs = 2000

const isMuted = computed(() => volumeValue.value === 0)

watch(
  () => sliderValue.value,
  (newValue) => {
    if (!videoRef.value || !status.dragging) {
      return
    }
    videoRef.value.currentTime = (newValue / 100) * videoRef.value.duration
  },
)

const syncSlider = () => {
  if (!videoRef.value || status.dragging) {
    return
  }
  sliderValue.value = Math.round((videoRef.value.currentTime / videoRef.value.duration) * 100)
  if (videoRef.value.currentTime === videoRef.value.duration) {
    status.videoPlaying = false
  }
  currentTime.value = videoRef.value.currentTime
}

const handleMetaData = () => {
  if (!videoRef.value) {
    return
  }
  runTime.value = videoRef.value.duration
}

const handleControlVisibility = () => {
  if (actionMenu.value) {
    controlVisible.value = true
    if (controlHideTimeout.value) {
      clearTimeout(controlHideTimeout.value)
    }
    return
  }
  handleVisibilityTimeout(controlVisible, controlHideTimeout, controlVisibityTimeMs)
}

const handleFullScreen = () => {
  if (!videoWrapperRef.value) {
    return
  }
  if (document.fullscreenElement) {
    document.exitFullscreen()
    status.fullscreen = false
  } else {
    videoWrapperRef.value.requestFullscreen()
    status.fullscreen = true
  }
}

const handlePlayBack = () => {
  if (videoRef.value?.paused) {
    videoRef.value?.play()
    status.videoPlaying = true
  } else {
    videoRef.value?.pause()
    status.videoPlaying = false
  }

  handleControlVisibility()
  showIndication(activeIndication, iconIndicationTimeout, 'play')
}

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'ArrowRight') {
    handleVideoForward()
  }

  if (e.key === 'ArrowLeft') {
    handleVideoReplay()
  }

  if (e.key === ' ') {
    handlePlayBack()
  }

  if (e.key === 'ArrowUp') {
    handleVolumeStep(+volumeStep)
  }

  if (e.key === 'ArrowDown') {
    handleVolumeStep(-volumeStep)
  }
  if (e.key.toLowerCase() === 'm') {
    handleMuteToggle()
    showIndication(activeIndication, iconIndicationTimeout, 'volume')
  }
}

const handleVolumeStep = (threshold: number) => {
  volumeValue.value = Math.min(100, Math.max(volumeValue.value + threshold, 0))
  handleControlVisibility()
  showIndication(activeIndication, iconIndicationTimeout, 'volume')
}

const handleVideoForward = () => {
  if (!videoRef.value) {
    return
  }
  videoRef.value.currentTime += skipSeconds
  handleControlVisibility()
  showIndication(activeIndication, iconIndicationTimeout, 'forward')
}

const handleVideoReplay = () => {
  if (!videoRef.value) {
    return
  }
  videoRef.value.currentTime -= skipSeconds
  handleControlVisibility()
  showIndication(activeIndication, iconIndicationTimeout, 'rewind')
}

const handleMuteToggle = () => {
  if (!isMuted.value) {
    lastVolumeValue.value = volumeValue.value
    volumeValue.value = 0
  } else {
    volumeValue.value = lastVolumeValue.value
  }
  handleControlVisibility()
}

provide(videoContextKey, {
  handleControlVisibility,
  handleMuteToggle,
  hlsInstance,
  hlsLevel,
  status,
  videoRef,
  videoWrapperRef,
  volumeValue,
})

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)

  if (!videoRef.value) {
    return
  }
  if (Hls.isSupported()) {
    hlsInstance.value = new Hls()
    hlsInstance.value.loadSource(VIDEO_URL_HLS)
    hlsInstance.value.attachMedia(videoRef.value)
  } else if (videoRef.value.canPlayType('application/vnd.apple.mpegurl')) {
    videoRef.value.src = VIDEO_URL_HLS
  }

  hlsInstance.value?.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
    hlsLevel.value = data.levels
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyPress)
  hlsInstance.value?.destroy()
})
</script>

<style scoped>
.video-container {
  position: relative;
  width: 768px;
  height: 432px;
}

.video-container:fullscreen {
  position: relative;
}

.video-container:fullscreen video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
}

.controls {
  position: absolute;
  bottom: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 0 48px;
  width: 100%;
}

.loading-icon {
  color: var(--color-blue);
  z-index: 20;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.controls-enter-from,
.controls-leave-to {
  opacity: 0;
  pointer-events: none;
}

.controls-enter-to,
.controls-leave-from {
  opacity: 1;
  pointer-events: auto;
}

.controls-enter-active,
.hover-enter-active {
  transition: opacity 0.3s ease-in;
}

.controls-leave-active,
.hover-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>

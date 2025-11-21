<template>
  <div
    class="video-container"
    ref="fullScreenRef"
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
      :forward-indication="status.forwardIndication"
      :rewind-indication="status.rewindIndication"
      :play-pause-indication="status.playPauseIndication"
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
    >
      <source :src="VIDEO_URL" type="video/mp4" />
    </video>

    <Transition name="controls">
      <div class="controls" v-show="status.controlVisible">
        <base-slider
          hover
          v-model="sliderValue"
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
import { onBeforeMount, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { handleVisibilityTimeout } from '@/utility/handleVisibilityTimeout'
import { VIDEO_URL } from '@/types/VideoUrl'
import FlashIndicators from './FlashIndicators.vue'
import ActionControllers from './ActionControllers.vue'

const status = reactive({
  playPauseIndication: false,
  forwardIndication: false,
  rewindIndication: false,
  dragging: false,
  controlVisible: true,
  fullscreen: false,
  videoPlaying: false,
  videoReady: false,
  buffering: false,
})

const { playPauseIndication, forwardIndication, rewindIndication, controlVisible } = toRefs(status)

const videoRef = ref<HTMLVideoElement | null>(null)
const fullScreenRef = ref<HTMLElement | null>(null)

const runTime = ref<number | null>(null)
const currentTime = ref<number | null>(null)
const controlHideTimeout = ref<number | null>(null)
const playPauseHideTimeout = ref<number | null>(null)
const forwardHideTimeout = ref<number | null>(null)
const rewindHideTimeout = ref<number | null>(null)

const sliderValue = ref(0)
const skipSeconds = 5
const controlVisibityTimeMs = 2000

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
  handleVisibilityTimeout(controlVisible, controlHideTimeout, controlVisibityTimeMs)
}

const handleFullScreen = () => {
  if (!fullScreenRef.value) {
    return
  }
  if (document.fullscreenElement) {
    document.exitFullscreen()
    status.fullscreen = false
  } else {
    fullScreenRef.value.requestFullscreen()
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
  handleVisibilityTimeout(playPauseIndication, playPauseHideTimeout)
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
}

const handleVideoForward = () => {
  if (!videoRef.value) {
    return
  }
  videoRef.value.currentTime += skipSeconds
  handleControlVisibility()
  handleVisibilityTimeout(forwardIndication, forwardHideTimeout)
}

const handleVideoReplay = () => {
  if (!videoRef.value) {
    return
  }
  videoRef.value.currentTime -= skipSeconds
  handleControlVisibility()
  handleVisibilityTimeout(rewindIndication, rewindHideTimeout)
}

onMounted(() => {
  document.addEventListener('keydown', handleKeyPress)
})

onBeforeMount(() => {
  document.removeEventListener('keydown', handleKeyPress)
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

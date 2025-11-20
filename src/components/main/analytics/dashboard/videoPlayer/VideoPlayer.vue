<template>
  <div
    class="video-container"
    ref="fullScreenRef"
    @mousemove="handleControlVisibility"
    @dblclick="handleFullScreen"
  >
    <div v-if="!status.videoReady || status.buffering" class="video-loading-wrapper">
      <Icon icon="line-md:loading-alt-loop" width="64" height="64" class="loading-icon" />
    </div>

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
        <slider-track
          v-model="sliderValue"
          ref="sliderTrack"
          :update-slider="updateSlider"
          :set-dragging="setDragging"
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
import { onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue'
import { Icon } from '@iconify/vue'
import { handleVisibilityTimeout } from '@/utility/handleVisibilityTimeout'
import { VIDEO_URL } from '@/types/VideoUrl'
import FlashIndicators from './FlashIndicators.vue'
import SliderTrack from './SliderTrack.vue'
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
const sliderTrack = ref<InstanceType<typeof SliderTrack> | null>(null)
const fullScreenRef = ref<HTMLElement | null>(null)

const runTime = ref<number | null>(null)
const currentTime = ref<number | null>(null)
const controlHideTimeout = ref<number | null>(null)
const playPauseHideTimeout = ref<number | null>(null)
const forwardHideTimeout = ref<number | null>(null)
const rewindHideTimeout = ref<number | null>(null)

const sliderValue = ref(0)
const skipSeconds = 5

const setDragging = (value: boolean) => {
  status.dragging = value
}

const handleMetaData = () => {
  if (!videoRef.value) {
    return
  }
  runTime.value = videoRef.value.duration
}

const handleControlVisibility = () => {
  handleVisibilityTimeout(controlVisible, controlHideTimeout, 2000)
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

const updateSlider = (e: MouseEvent) => {
  if (!sliderTrack.value?.sliderContainerRef || !videoRef.value) {
    return
  }
  const rect = sliderTrack.value.sliderContainerRef.getBoundingClientRect()
  const offset = e.clientX - rect.left
  sliderValue.value = Math.min(100, Math.max(0, Math.round((offset / rect.width) * 100)))
  videoRef.value.currentTime = (sliderValue.value / 100) * videoRef.value?.duration
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

.video-loading-wrapper {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 768px;
  height: 432px;
  box-shadow: var(--shadow-menu);
}

.loading-icon {
  color: var(--color-blue);
  z-index: 20;
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

.controls-enter-active {
  transition: opacity 0.3s ease-in;
}

.controls-leave-active {
  transition: opacity 0.3s ease-out;
}
</style>

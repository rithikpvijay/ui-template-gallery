<template>
  <div
    class="video-container"
    ref="fullScreenRef"
    @mousemove="handleControlVisibility"
    @dblclick="handleFullScreen"
  >
    <dashboard-action-controllers
      :is-video-playing="status.videoPlaying"
      :forward-indication="status.forwardIndication"
      :rewind-indication="status.rewindIndication"
      :play-pause-indication="status.playPauseIndication"
    />
    <div v-if="!status.videoReady" class="video-loading-wrapper">
      <Icon icon="line-md:loading-alt-loop" width="64" height="64" class="loading-icon" />
    </div>

    <video
      width="768px"
      ref="videoRef"
      poster="/images/poster.png"
      @timeupdate="syncSlider"
      @click="handlePlayBack"
      @loadedmetadata="handleMetaData"
      @loadeddata="status.videoReady = true"
    >
      <source :src="VIDEO_URL" type="video/mp4" />
    </video>

    <Transition name="controls">
      <div class="controls" v-show="status.controlVisible">
        <div class="slider-container" @pointerdown="handleVideoSeek" ref="sliderContainerRef">
          <div class="bg-track"></div>
          <div class="filled-track" :style="{ width: `${sliderValue}%` }"></div>
          <input
            type="range"
            min="0"
            max="100"
            v-model="sliderValue"
            class="slider"
            @pointerdown="handleDrag"
          />
        </div>
        <div class="seek-controllers">
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
          </div>
          <div class="right-controls">
            <div class="display-time">
              {{ displayTime }}
            </div>
            <Icon
              :icon="`${status.fullscreen ? 'material-symbols:fullscreen-exit' : 'material-symbols:fullscreen'}`"
              width="24"
              height="24"
              style="color: #fff"
              @click="handleFullScreen"
            />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, reactive, ref, toRefs } from 'vue'
import { Icon } from '@iconify/vue'
import DashboardActionControllers from '@/components/main/analytics/dashboard/DashboardActionControllers.vue'
import { handleVisibilityTimeout } from '@/utility/handleVisibilityTimeout'
import { formatTime } from '@/utility/formatTime'
import type { VideoControllers } from '@/types/VideoConrollers'
import { VIDEO_URL } from '@/types/VideoUrl'

const status = reactive({
  playPauseIndication: false,
  forwardIndication: false,
  rewindIndication: false,
  dragging: false,
  controlVisible: false,
  fullscreen: false,
  videoPlaying: false,
  videoReady: false,
})
const { playPauseIndication, forwardIndication, rewindIndication, controlVisible } = toRefs(status)

const videoRef = ref<HTMLVideoElement | null>(null)
const sliderContainerRef = ref<HTMLElement | null>(null)
const fullScreenRef = ref<HTMLElement | null>(null)

const runTime = ref<number | null>(null)
const currentTime = ref<number | null>(null)
const controlHideTimeout = ref<number | null>(null)
const playPauseHideTimeout = ref<number | null>(null)
const forwardHideTimeout = ref<number | null>(null)
const rewindHideTimeout = ref<number | null>(null)

const sliderValue = ref(0)
const skipSeconds = 5

const displayTime = computed(() => {
  if (!runTime.value || !currentTime.value) {
    return
  }
  const totalTime = `${formatTime(currentTime.value)}/${formatTime(runTime.value)}`
  return totalTime
})

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
  if (!sliderContainerRef.value || !videoRef.value) {
    return
  }
  const rect = sliderContainerRef.value.getBoundingClientRect()
  const offset = e.clientX - rect.left
  sliderValue.value = Math.min(100, Math.max(0, Math.round((offset / rect.width) * 100)))
  videoRef.value.currentTime = (sliderValue.value / 100) * videoRef.value?.duration
}

const handleVideoSeek = (e: MouseEvent) => {
  updateSlider(e)
}

const handleDrag = () => {
  status.dragging = true
  document.addEventListener('pointermove', startDrag)
  document.addEventListener('pointerup', stopDrag)
}

const startDrag = (e: MouseEvent) => {
  status.dragging = true
  updateSlider(e)
}

const stopDrag = () => {
  status.dragging = false
  document.removeEventListener('pointermove', startDrag)
  document.removeEventListener('pointerup', stopDrag)
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

const leftControllers = computed<VideoControllers[]>(() => [
  {
    iconName: status.videoPlaying
      ? 'material-symbols:pause-circle-rounded'
      : 'material-symbols:play-circle',
    width: '36',
    height: '36',
    clickFn: handlePlayBack,
    className: 'play-pause-icon',
  },
  {
    iconName: 'material-symbols:fast-rewind-rounded',
    width: '20',
    height: '20',
    clickFn: handleVideoReplay,
    className: 'rewind-icon',
  },
  {
    iconName: 'material-symbols:fast-forward-rounded',
    width: '20',
    height: '20',
    clickFn: handleVideoForward,
    className: 'forward-icon',
  },
])

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

.slider-container {
  position: relative;
  width: 100%;
  height: 16px;
}

.seek-controllers {
  display: flex;
  align-items: center;
  gap: 36px;
  width: 100%;
  justify-content: space-between;
}

.seek-controllers svg {
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
  gap: 32px;
}

.play-pause-icon {
  margin-right: 24px;
}

.bg-track {
  position: absolute;
  height: 5px;
  background-color: var(--color-slider-track);
  width: 100%;
  border-radius: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.filled-track {
  position: absolute;
  height: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--color-blue);
  border-radius: 24px 0px 0px 24px;
  z-index: 2;
  cursor: pointer;
}

.slider {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  z-index: 3;
  background: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
  background-color: var(--color-primary);
  position: relative;
  z-index: 4;
}

.display-time {
  color: var(--color-primary);
  font-size: 13px;
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

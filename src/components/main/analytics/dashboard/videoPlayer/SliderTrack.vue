<template>
  <div class="slider-container" @pointerdown="handleVideoSeek" ref="sliderContainerRef">
    <div class="bg-track"></div>
    <div class="filled-track" :style="{ width: `${modelValue}%` }"></div>
    <input
      type="range"
      min="0"
      max="100"
      class="slider"
      :value="modelValue"
      @pointerdown="handleDrag"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: number
  updateSlider: (e: MouseEvent) => void
  setDragging: (value: boolean) => void
}

const sliderContainerRef = ref<HTMLElement | null>(null)

defineExpose({
  sliderContainerRef,
})

const props = defineProps<Props>()

const handleVideoSeek = (e: MouseEvent) => {
  props.updateSlider(e)
}

const handleDrag = () => {
  props.setDragging(true)
  document.addEventListener('pointermove', startDrag)
  document.addEventListener('pointerup', stopDrag)
}

const startDrag = (e: MouseEvent) => {
  props.setDragging(false)
  props.updateSlider(e)
}

const stopDrag = () => {
  props.setDragging(false)
  document.removeEventListener('pointermove', startDrag)
  document.removeEventListener('pointerup', stopDrag)
}
</script>

<style scoped>
.slider-container {
  position: relative;
  width: 100%;
  height: 16px;
  cursor: pointer;
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
</style>

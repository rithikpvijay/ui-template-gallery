<template>
  <div
    class="slider-container"
    ref="sliderContainerRef"
    :style="{ width: `${sliderWidth}px`, height: `${sliderHeight}px` }"
    @pointerdown="handleSliderValue"
    @pointermove="handleHover"
    @pointerleave="hoverState.hover = false"
    @dblclick.stop
  >
    <div
      v-if="hoverState.hover && hover"
      class="hover-track"
      :style="{ width: `${hoverState.value}%` }"
    ></div>
    <div class="bg-track"></div>
    <div
      class="filled-track"
      :style="{ width: `${modelValue}%`, backgroundColor: trackColor }"
    ></div>
    <div
      class="thumb"
      :style="{
        left: `${modelValue}%`,
        height: `${thumbHeight}px`,
        width: `${thumbWidth}px`,
        backgroundColor: thumbColor,
      }"
      :class="{ 'hover-class': hoverState.hover && hover }"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

interface Props {
  modelValue: number
  hover?: boolean
  sliderWidth?: number
  sliderHeight?: number
  thumbWidth?: number
  thumbHeight?: number
  trackColor?: string
  thumbColor?: string
}
defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'dragging', value: boolean): void
}>()

const sliderContainerRef = ref<HTMLElement | null>(null)
const hoverState = reactive({
  hover: false,
  value: 0,
})

const getSliderValue = (e: MouseEvent) => {
  if (!sliderContainerRef.value) {
    return 0
  }
  const rect = sliderContainerRef.value.getBoundingClientRect()
  const percentage = ((e.clientX - rect.left) / rect.width) * 100
  const value = Math.min(100, Math.max(0, percentage))
  return value
}

const handleHover = (e: MouseEvent) => {
  hoverState.hover = true
  hoverState.value = getSliderValue(e)
}

const handleSliderValue = (e: MouseEvent) => {
  if (e.button !== 0) {
    return
  }
  const value = getSliderValue(e)
  emit('update:modelValue', value)
  emit('dragging', true)
  document.addEventListener('pointermove', startDrag)
  document.addEventListener('pointerup', stopDrag)
}

const startDrag = (e: MouseEvent) => {
  const value = getSliderValue(e)
  emit('update:modelValue', value)
}

const stopDrag = () => {
  document.removeEventListener('pointermove', startDrag)
  document.removeEventListener('pointerup', stopDrag)
  emit('dragging', false)
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
  height: 25%;
  background-color: var(--color-slider-track);
  width: 100%;
  border-radius: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.filled-track {
  position: absolute;
  height: 50%;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--color-blue);
  border-radius: 24px 0px 0px 24px;
  z-index: 2;
  cursor: pointer;
}

.hover-track {
  background-color: var(--color-secondary);
  position: absolute;
  height: 32%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 24px;
  z-index: 2;
}

.thumb {
  width: 16px;
  height: 16px;
  background-color: var(--color-primary);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

.thumb.hover-class {
  height: 20px;
  width: 20px;
}
</style>

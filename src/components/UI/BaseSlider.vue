<template>
  <div class="slider-container" ref="sliderContainerRef">
    <div class="bg-track"></div>
    <div class="filled-track" :style="{ width: `${modelValue}%` }"></div>
    <div
      class="thumb"
      :style="{ left: `${modelValue}%` }"
      :class="{ hoverClass: props.hover }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: number
  hover?: boolean
}
const props = defineProps<Props>()
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
  height: 32%;
  background-color: var(--color-slider-track);
  width: 100%;
  border-radius: 24px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}

.filled-track {
  position: absolute;
  height: 64%;
  top: 50%;
  transform: translateY(-50%);
  background-color: var(--color-blue);
  border-radius: 24px 0px 0px 24px;
  z-index: 2;
  cursor: pointer;
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

.thumb.hoverClass {
  height: 20px;
  width: 20px;
}
</style>

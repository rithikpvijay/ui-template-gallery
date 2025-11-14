<template>
  <div class="main-container">
    <main-header></main-header>
    <main-content></main-content>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/main/MainHeader.vue'
import MainContent from '@/components/main/MainContent.vue'
</script>

<style scoped>
.main-container {
  padding: 0 32px;
  height: calc(100vh - 58px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

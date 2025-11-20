<template>
  <div class="dashboard-container">
    <p class="dashboard-header">Checkout our session</p>
    <div class="vedio-player-container">
      <vedio-player />
    </div>
  </div>
</template>

<script setup lang="ts">
import VedioPlayer from '@/components/main/analytics/dashboard/videoPlayer/VideoPlayer.vue'
</script>

<style scoped>
.dashboard-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  margin-top: 54px;
}

.dashboard-header {
  font-size: 24px;
  font-weight: 500;
  text-transform: capitalize;
}
</style>

<template>
  <div class="contact-container">
    <contact-header></contact-header>
    <contact-content></contact-content>
  </div>
</template>

<script setup lang="ts">
import ContactHeader from '@/components/main/contact/ContactHeader.vue'
import ContactContent from '@/components/main/contact/ContactContent.vue'
</script>

<style scoped>
.contact-container {
  height: calc(100vh - 58px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>

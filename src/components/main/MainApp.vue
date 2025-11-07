<template>
  <div class="main-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-container {
  padding: 0 32px;
  overflow-y: scroll;
}
</style>

<template>
  <div class="grid-container">
    <nav-bar class="nav"></nav-bar>
    <side-bar class="side-bar"></side-bar>
    <main-app class="main"></main-app>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/nav/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import MainApp from '@/components/MainApp.vue'
</script>

<style scoped>
.grid-container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
}

.nav {
  grid-column: 1/-1;

  z-index: 1;
  box-shadow: var(--shadow-outer), var(--shadow-inner);
}

/* .main {
} */

.side-bar {
  background-color: var(--color-secondary);
}
</style>

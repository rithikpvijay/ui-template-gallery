<template>
  <div class="container">
    <nav-bar class="nav"></nav-bar>
    <side-bar class="side-bar"></side-bar>
    <main-app class="main"></main-app>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import MainApp from '@/components/MainApp.vue'
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
}

.nav {
  grid-column: 1/-1;

  padding: 20px;
  box-shadow: var(--shadow-outer), var(--shadow-inner);
}

/* .main {
} */

.side-bar {
  background-color: var(--color-secondary);
}
</style>

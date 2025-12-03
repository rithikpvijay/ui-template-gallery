<template>
  <div class="grid-container" :class="gridContainer">
    <nav-bar class="nav"></nav-bar>
    <side-bar class="side-bar" :class="[hideSidebar]"></side-bar>
    <main-app class="main">
      <router-view></router-view>
    </main-app>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/nav/NavBar.vue'
import SideBar from '@/components/sidebar/SideBar.vue'
import MainApp from '@/components/main/MainApp.vue'
import { useLayoutState } from '@/hooks/useLayoutState'
import { RoutePath } from '@/types/RoutePath'

const { isSidebarCollapsed } = useLayoutState()
const route = useRoute()
const isLoginPage = computed(
  () => route.path === RoutePath.SIGN_IN || route.path === RoutePath.SIGN_UP,
)
const hideSidebar = computed(() => {
  return { 'sidebar-hidden': isLoginPage.value }
})

const gridContainer = computed(() => {
  return {
    'grid-container-sidebar-hidden': isLoginPage.value,
    'grid-container-sidebar-collapse': isSidebarCollapsed.value && !isLoginPage.value,
  }
})
</script>

<style scoped>
.grid-container {
  height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  transition: all 0.3s ease;
}

.grid-container-sidebar-hidden {
  grid-template-columns: 1fr;
}

.grid-container-sidebar-collapse {
  grid-template-columns: 48px 1fr;
}

.nav {
  grid-column: 1/-1;
  z-index: 1;
  box-shadow: var(--shadow-outer), var(--shadow-inner);
}

.side-bar {
  background-color: var(--color-secondary);
}

.sidebar-hidden {
  display: none;
}
</style>

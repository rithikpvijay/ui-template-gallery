<template>
  <div class="nav-container">
    <div class="icon-text">
      <div class="nav-icon">
        <Icon icon="mdi:menu" width="24" height="16" />
      </div>
      <p>UI Template Gallery</p>
    </div>

    <div class="nav-utilities">
      <div class="search-bar nav-item">
        <base-search-bar placeholder="Search"></base-search-bar>
      </div>
      <div class="nav-icon nav-item">
        <Icon icon="material-symbols:dark-mode-outline-rounded" width="20" height="16" />
      </div>
      <div class="nav-icon nav-item">
        <Icon icon="mdi:bell-outline" width="20" height="16" />
      </div>
      <base-menu position="bottom-right">
        <template #title>
          <div class="image-container nav-item">
            <img :src="userImage" alt="user-image" class="image" />
          </div>
        </template>
        <template #menu>
          <div class="log-out" @click="handleLogout">
            <Icon icon="material-symbols:directions-run-rounded" width="18" height="18" />
            <p>Logout</p>
          </div>
        </template>
      </base-menu>
    </div>
    <div class="overlay" v-if="isLoading">
      <Icon icon="line-md:loading-loop" width="86" height="86" class="loading" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import userImage from '@/assets/user-image.png'
import BaseSearchBar from '../UI/BaseSearchBar.vue'
import { useAuthStore } from '@/store/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isLoading } = storeToRefs(authStore)

const handleLogout = () => {
  authStore.logout()
}
</script>

<style scoped>
.nav-container {
  padding: 12px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-text {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  height: 12px;
}

.icon-text p {
  font-weight: 500;
}

.nav-icon {
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.nav-icon:hover {
  background-color: var(--color-search-bar-hover);
}

.image-container {
  width: 26px;
  height: 26px;
  border: 1px solid var(--color-image-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.nav-utilities {
  display: flex;
  align-items: center;
  margin-right: 8px;
}

.image-container:hover {
  border-color: var(--color-blue);
}

.image {
  width: 26px;
  height: 26px;
  object-fit: cover;
  object-position: top;
  border-radius: 50%;
}

.search-bar {
  padding-right: 8px;
}

.log-out {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 0;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
  justify-content: center;
  color: var(--color-blue);
}

.overlay {
  position: fixed;
  height: calc(100vh - 56.5px);
  width: calc(100vw - 250px);
  top: 8%;
  left: 17%;
  backdrop-filter: blur(2px);
}
</style>

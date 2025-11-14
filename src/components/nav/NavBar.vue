<template>
  <div class="nav-container">
    <div class="icon-text">
      <div class="nav-icon">
        <Icon icon="mdi:menu" width="24" height="16" />
      </div>
      <p>UI Template Gallery</p>
    </div>

    <div class="nav-utilities">
      <div class="search-bar">
        <base-search-bar placeholder="Search"></base-search-bar>
      </div>
      <div class="nav-icon">
        <Icon icon="material-symbols:dark-mode-outline-rounded" width="20" height="16" />
      </div>
      <div class="nav-icon">
        <Icon icon="mdi:bell-outline" width="20" height="16" />
      </div>
      <div class="image-container">
        <img :src="userImage" alt="user-image" class="image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import userImage from '@/assets/user-image.png'
import BaseSearchBar from '../UI/BaseSearchBar.vue'
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
  background-color: var(--color-onhover);
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
</style>

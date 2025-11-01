<template>
  <main-layout></main-layout>
</template>

<script setup lang="ts">
import MainLayout from './layout/MainLayout.vue'
</script>

<style>
:root {
  --color-primary: #fff;
  --color-secondary: #f2f2f2;
  --color-onhover: #e4e4e4;
  --color-search-bar: rgba(0, 0, 0, 0.04);
  --color-search-icon: #0000008a;
  --color-blue: #03a9f4;

  --shadow-outer: 0 4px 8px rgba(0, 0, 0, 0.05);
  --shadow-inner: 0 0 4px rgba(0, 0, 0, 0.15);
}

body {
  font-family: 'Roboto', sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>

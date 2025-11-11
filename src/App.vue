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
  --color-search-bar-hover: #e4e4e4;
  --color-search-bar: #0000000a;
  --color-search-icon: #0000008a;
  --color-blue: #03a9f4;
  --color-blue-dark: #0288d1;
  --color-arrow: #0000008a;
  --color-heading-hover: #7a7a7a1f;
  --color-active: #0000001f;
  --color-footer-text: #0000009b;
  --color-image-border: #f1f1f1;
  --color-border: #e0e0e0;
  --color-text: #000000de;
  --color-icon: #0000008a;
  --color-table-content: #00000099;

  --shadow-outer: 0 4px 8px rgba(0, 0, 0, 0.05);
  --shadow-inner: 0 0 4px rgba(0, 0, 0, 0.15);
  --shadow-menu: 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-button: 0 1px 3px rgba(0, 0, 0, 0.24);
}

body {
  font-family: 'Roboto', sans-serif;
  color: var(--color-text);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--color-border);
}
</style>

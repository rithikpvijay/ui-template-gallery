<template>
  <div class="auth-cta">
    <router-link v-if="type === 'resigter'" :to="RoutePath.SIGN_UP" class="auth-btn btn-register">
      Register
    </router-link>

    <p>or</p>

    <div class="cta-btn">
      <button class="auth-btn btn-service">
        <img :src="googleLogo" alt="logo-google" class="logo" />
        <span> Sign In with Google </span>
      </button>
      <button class="auth-btn btn-service">
        <img :src="microSoftLogo" alt="logo-microsoft" class="logo" />
        <span> Sign In with Microsoft </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import googleLogo from '@/assets/google-logo.webp'
import microSoftLogo from '@/assets/microsoft-logo.png'
import { RoutePath } from '@/types/RoutePath'

defineProps<{ type: string }>()
</script>

<style scoped>
.auth-btn {
  display: inline-block;
  padding: 6px 24px;
  border-radius: 2px;
  border: none;
  font-weight: 500;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: var(--shadow-button);
  background-color: var(--color-primary);
  width: 100%;
  text-decoration: none;
  color: var(--color-text);
}

.auth-btn:hover {
  background-color: var(--color-secondary);
}

.btn-sign-in {
  background-color: var(--color-blue);
  color: var(--color-primary);
}

.btn-sign-in:hover {
  background-color: var(--color-blue-dark);
}

.auth-cta {
  text-align: center;
  font-size: 13px;
}

.btn-register {
  margin: 48px 0 24px 0;
}

.logo {
  width: 16px;
}

.btn-service {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.cta-btn {
  margin-top: 24px;
}
</style>

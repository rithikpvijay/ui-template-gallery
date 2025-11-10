<template>
  <div class="register-container">
    <div class="register-box">
      <base-form>
        <template #title>Register</template>

        <template #input>
          <div class="register-input">
            <label for="email">Email*</label>
            <input type="text" id="email" />
          </div>

          <div class="register-input">
            <label for="password">Password*</label>
            <input type="password" id="password" />
          </div>

          <div class="register-input">
            <label for="conform-password">Confirm Password*</label>
            <input type="password" />
          </div>

          <span class="terms-conditions"
            >By creating an account, you agree to the Terms of Service and Privacy Policy</span
          >
        </template>
        <template #form-btn> Register </template>
      </base-form>

      <div class="sign-in">Have an account? Sign In</div>

      <auth-providers type="sign-in"></auth-providers>
    </div>
  </div>
</template>

<script setup lang="ts">
import AuthProviders from './AuthProviders.vue'
</script>

<style scoped>
.register-container {
  display: flex;
  min-height: calc(100vh - 56.4px);
  align-items: center;
  justify-content: center;
}

.register-box {
  box-shadow: var(--shadow-auth-form);
  border-radius: 8px;
  padding: 16px 24px;
  width: 360px;
}

.register-input {
  display: flex;
  flex-direction: column;
}

.terms-conditions {
  font-size: 12px;
  color: var(--color-table-content);
}

.sign-in {
  text-align: center;
  font-size: 12px;
  margin-top: 24px;
  padding-bottom: 36px;
  margin-bottom: 16px;
  color: var(--color-blue);
  border-bottom: 1px solid var(--color-border);
}
</style>

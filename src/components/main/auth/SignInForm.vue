<template>
  <div class="auth-container">
    <div class="auth-box">
      <base-form @submit="handleSignUp">
        <template #title>
          <div>Sign In</div>
        </template>

        <template #input>
          <div class="auth-form-input">
            <label for="email">Email:*</label>
            <input type="text" id="email" v-model="formValues.email" />
          </div>

          <div class="auth-form-input">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="formValues.password" />
          </div>

          <div class="auth-form-check-box">
            <input type="checkbox" id="save-info" />
            <label for="save-info">Remember me</label>
          </div>
        </template>

        <template #form-btn> Sign In</template>
      </base-form>

      <div class="auth-forgot-link">Forgot password?</div>
      <auth-providers type="resigter" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '@/store/auth'
import AuthProviders from './AuthProviders.vue'
import { EMAIL_REGEX_PATTERN } from '@/types/FormValidation'

const toast = useToast()
const authStore = useAuthStore()
const isFormValid = ref(true)
const formValues = reactive({
  email: '',
  password: '',
})

const validateForm = () => {
  isFormValid.value = true

  if (!EMAIL_REGEX_PATTERN.test(formValues.email)) {
    isFormValid.value = false
  }
}

const handleSignUp = () => {
  validateForm()

  if (!isFormValid.value) {
    toast.error('Provide a valid email')
    return
  }
  authStore.signIn(formValues.email, formValues.password)
}
</script>

<style scoped>
.auth-container {
  display: flex;
  min-height: calc(100vh - 56.4px);
  align-items: center;
  justify-content: center;
}

.auth-box {
  box-shadow: var(--shadow-auth-form);
  border-radius: 8px;
  padding: 24px;
  width: 360px;
  position: relative;
}

.auth-form-input {
  display: flex;
  flex-direction: column;
}

.auth-form-check-box {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
  color: var(--color-table-content);
}

.auth-form-check-box label {
  cursor: pointer;
  margin: 0;
}

.auth-form-check-box input {
  width: 16px;
  height: 16px;
}

.auth-forgot-link {
  font-size: 12px;
  color: var(--color-blue);
  text-decoration: underline;
  margin-top: 20px;
  text-align: center;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: var(--color-blue-dark);
}
</style>

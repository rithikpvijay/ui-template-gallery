<template>
  <div class="register-container">
    <div class="register-box">
      <base-form @submit="handleSignUp">
        <template #title>Register</template>

        <template #input>
          <div class="register-input">
            <label for="email">Email*</label>
            <input
              type="text"
              id="email"
              v-model="formValues.email.value"
              @focus="handleShowInvalidMessage('email')"
              @blur="handleInputBlur('email')"
            />
            <Icon
              icon="material-symbols:error"
              width="20"
              height="20"
              class="error-icon"
              v-if="!formValues.email.isValid"
            />
            <span
              class="invalid-message"
              v-if="!formValues.email.isValid && showInvalidMessage.email"
              >Email is invalid</span
            >
          </div>

          <div class="register-input">
            <label for="password">Password*</label>
            <input
              type="password"
              id="password"
              v-model="formValues.password.value"
              @focus="handleShowInvalidMessage('password')"
              @blur="handleInputBlur('password')"
            />

            <Icon
              icon="material-symbols:error"
              width="20"
              height="20"
              class="error-icon"
              v-if="!formValues.password.isValid"
            />
            <span
              class="invalid-message"
              v-if="!formValues.password.isValid && showInvalidMessage.password"
              >Password must contain atleast 6 characters</span
            >
          </div>

          <div class="register-input">
            <label for="conform-password">Confirm Password*</label>
            <input
              type="password"
              v-model="formValues.confirmPassword.value"
              @focus="handleShowInvalidMessage('confirmPassword')"
              @blur="handleInputBlur('confirmPassword')"
            />
            <Icon
              icon="material-symbols:error"
              width="20"
              height="20"
              class="error-icon"
              v-if="!formValues.confirmPassword.isValid"
            />
            <span
              class="invalid-message"
              v-if="!formValues.confirmPassword.isValid && showInvalidMessage.confirmPassword"
              >Password do not match</span
            >
          </div>

          <span class="terms-conditions">
            By creating an account, you agree to the Terms of Service and Privacy Policy
          </span>
        </template>
        <template #form-btn> Register </template>
      </base-form>

      <router-link to="/sign-in" class="sign-in">Have an account? Sign In</router-link>
      <auth-providers type="sign-in" />

      <div class="sign-in">Have an account? Sign In</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useAuthStore } from '@/store/auth'
import { EMAIL_REGEX_PATTERN, MIN_PASSWORD_LENGTH } from '@/types/FormValidation'
import AuthProviders from './AuthProviders.vue'

type Field = keyof typeof showInvalidMessage

const authStore = useAuthStore()

const formValues = reactive({
  email: { value: '', isValid: true },
  password: { value: '', isValid: true },
  confirmPassword: { value: '', isValid: true },
})

const showInvalidMessage = reactive({
  email: false,
  password: false,
  confirmPassword: false,
})

const isFormValid = ref(true)

const handleShowInvalidMessage = (field: Field) => {
  showInvalidMessage[field] = true
}

const handleInputBlur = (field: Field) => {
  showInvalidMessage[field] = false
  formValues[field].isValid = true
}

const validateForm = () => {
  isFormValid.value = true

  if (!EMAIL_REGEX_PATTERN.test(formValues.email.value)) {
    isFormValid.value = false
    formValues.email.isValid = false
  }

  if (formValues.password.value.length < MIN_PASSWORD_LENGTH) {
    isFormValid.value = false
    formValues.password.isValid = false
  }

  if (formValues.confirmPassword.value.length !== formValues.password.value.length) {
    isFormValid.value = false
    formValues.confirmPassword.isValid = false
  }
}

const handleSignUp = () => {
  validateForm()

  if (!isFormValid.value) {
    return
  }

  authStore.signUp(formValues.email.value, formValues.password.value)
}
</script>

<style scoped>
.register-container {
  display: flex;
  min-height: calc(100vh - 56.4px);
  align-items: center;
  justify-content: center;
}

.register-box {
  position: relative;
  box-shadow: var(--shadow-auth-form);
  border-radius: 8px;
  padding: 16px 24px;
  width: 360px;
}

.register-input {
  display: flex;
  flex-direction: column;
  position: relative;
}

.terms-conditions {
  font-size: 12px;
  color: var(--color-table-content);
}

.sign-in {
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 12px;
  margin-top: 24px;
  padding-bottom: 36px;
  margin-bottom: 16px;
  color: var(--color-blue);
  border-bottom: 1px solid var(--color-border);
}

.error-icon {
  position: absolute;
  color: var(--color-validation-error);
  right: 1%;
  top: 45%;
}

.invalid-message {
  background-color: var(--color-validation-message);
  color: var(--color-primary);
  font-size: 12px;
  width: fit-content;
  padding: 3px 12px;
  border-radius: 6px;
  position: absolute;
  bottom: -20px;
}
</style>

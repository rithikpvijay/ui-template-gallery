<template>
  <div class="contact-details-container">
    <div class="contact-details-nav">
      <base-icon icon="material-symbols:arrow-back" @click="handleRouteBack"></base-icon>
      <p>{{ fullName ? fullName : '' }}</p>
    </div>

    <div class="details-box" v-if="formValues">
      <div class="details-btn-flex">
        <p>Details</p>
        <div class="edit-save-btn" @click="handleFormEditing" v-if="isFormDisabled">
          <Icon icon="material-symbols:edit" width="14" height="14" />
          <p>Edit</p>
        </div>
        <div v-if="!isFormDisabled">
          <span class="edit-save-btn" @click="handleFormSave">Save</span>
          <span class="cancel-btn" @click="handleFormCancel">Cancel</span>
        </div>
      </div>

      <form class="contact-details-form">
        <img src="/images/avatar.png" alt="image of user" class="avatar-image" />
        <div class="status-container">
          <span class="status">Status</span>

          <div class="menu-title menu-title-static" v-if="isFormDisabled">
            <span class="dot" :class="statusDotColor"></span>
            <span :class="statusTextColor">
              {{ formValues.status }}
            </span>
          </div>

          <base-menu v-if="!isFormDisabled" class="input-menu">
            <template #title>
              <div class="menu-title">
                <span class="dot" :class="statusDotColor"></span>
                <span :class="statusTextColor">
                  {{ statusValue }}
                </span>
              </div>
            </template>
            <template #menu v-if="!isFormDisabled">
              <div class="menu-item" @click="handleStatus('Salaried')">
                <span class="dot salaried-dot"></span>
                <span class="salaried"> Salaried </span>
              </div>

              <div @click="handleStatus('Terminated')">
                <span class="dot terminated-dot"></span>
                <span class="terminated"> Terminated </span>
              </div>
              <div @click="handleStatus('Commission')">
                <span class="dot commission-dot"></span>
                <span class="commission"> Commission </span>
              </div>
            </template>
          </base-menu>
        </div>
        <div class="first-name-container">
          <label for="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            v-model="firstName"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>

        <div class="last-name-container">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            v-model="lastName"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>
        <div class="position-container">
          <label for="position">Position</label>
          <input
            type="text"
            id="position"
            v-model="formValues.designation"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>
        <div class="assigned-to-container">
          <label for="assignedTo">Assigned To</label>
          <input
            type="text"
            id="assignedTo"
            v-model="formValues.mentor"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>

        <div class="company-container">
          <label for="company">Company</label>
          <input
            type="text"
            id="company"
            v-model="formValues.company"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>
        <div class="contact-container">Contacts</div>

        <div class="address-container">
          <label for="address">Address</label>
          <input
            type="text"
            id="address"
            v-model="formValues.address"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>

        <div class="city-container">
          <label for="city">City</label>
          <input
            type="text"
            id="city"
            v-model="formValues.city"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>

        <div class="state-container">
          <label for="state">State</label>
          <input
            type="text"
            id="state"
            v-model="formValues.state"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>

        <div class="zip-code-container">
          <label for="zipcode">Zip Code</label>
          <input
            type="text"
            id="zipcode"
            v-model="formValues.zipcode"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>

        <div class="phone-container">
          <label for="phone">Phone</label>
          <input
            type="text"
            id="phone"
            v-model="formValues.phone"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>

        <div class="email-container">
          <label for="email">Email</label>
          <input
            type="text"
            id="email"
            v-model="formValues.email"
            :disabled="isFormDisabled"
            :class="{ disabled: isFormDisabled }"
          />
        </div>
      </form>
      <div class="call-email-container" v-if="isFormDisabled">
        <a :href="`tel:${formValues.phone}`" class="call-email-btn">
          <Icon icon="material-symbols:call" width="16" height="16" />
          <span>Call</span>
        </a>
        <a :href="`mailto:${formValues.email}`" class="call-email-btn email-btn">
          <Icon icon="material-symbols:mail" width="16" height="16" />
          <span> Send Email </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'

const props = defineProps<{ id: string }>()
const userStore = useUserStore()
const isFormDisabled = ref(true)
const originalData = computed(() => userStore.getUserById(+props.id))
const formValues = reactive({ ...originalData.value })
const fullName = ref<string | undefined>(originalData.value?.name)
const statusValue = ref<string | undefined>(originalData.value?.status)
const router = useRouter()

watch(originalData, (newValue) => {
  if (!newValue) {
    return
  }
  Object.assign(formValues, newValue)
  fullName.value = newValue.name
  statusValue.value = newValue.status
})

const firstName = computed({
  get() {
    return formValues.name?.split(' ')[0]
  },
  set(value) {
    if (!formValues.name) {
      return
    }
    const parts = formValues.name.split(' ')
    formValues.name = `${value} ${parts[1] || ''}`.trim()
  },
})

const lastName = computed({
  get() {
    return formValues.name?.split(' ')[1]
  },
  set(value) {
    if (!formValues.name) {
      return
    }
    const parts = formValues.name.split(' ')
    formValues.name = `${parts[0] || ''} ${value}`.trim()
  },
})

const statusDotColor = computed(() => {
  let status = statusValue.value
  if (isFormDisabled.value) {
    status = formValues.status
  }
  return {
    'salaried-dot': status === 'Salaried',
    'terminated-dot': status === 'Terminated',
    'commission-dot': status === 'Commission',
  }
})

const statusTextColor = computed(() => {
  let status = statusValue.value
  if (isFormDisabled.value) {
    status = formValues.status
  }
  return {
    salaried: status === 'Salaried',
    terminated: status === 'Terminated',
    commission: status === 'Commission',
  }
})

const handleRouteBack = () => {
  router.replace('/contact-list')
}

const handleFormEditing = () => {
  isFormDisabled.value = false
}

const handleFormSave = () => {
  isFormDisabled.value = true
  formValues.status = statusValue.value
  userStore.updateUser(+props.id, formValues)
}

const handleFormCancel = () => {
  Object.assign(formValues, originalData.value)
  isFormDisabled.value = true
}

const handleStatus = (value: string) => {
  statusValue.value = value
}
</script>

<style scoped>
.contact-details-container {
  padding: 24px 0 10px 0;
}

.details-box {
  max-width: 500px;
  margin: 0 auto;
}

.contact-details-nav {
  display: flex;
  align-items: center;
  font-size: 22px;
  gap: 6px;
}

.edit-save-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background-color: var(--color-blue);
  text-transform: uppercase;
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 500;
  padding: 6px 12px;
  box-shadow: var(--shadow-button);
  cursor: pointer;
}

.edit-save-btn p {
  letter-spacing: 0.5px;
}

.edit-save-btn:hover {
  background-color: var(--color-blue-dark);
}

.cancel-btn {
  text-transform: uppercase;
  font-size: 13px;
  border: 1px solid #bbb;
  padding: 5px 12px;
  font-weight: 500;
  cursor: pointer;
  margin-left: 6px;
}

.cancel-btn:hover {
  background-color: var(--color-secondary);
}

.details-btn-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.avatar-image {
  width: 200px;
  display: inline-block;
  border-radius: 10px;
  grid-row: 1/5;
}

.contact-details-form {
  display: grid;
  grid-template-columns: 1fr 0.3fr 0.7fr;
  grid-template-rows: repeat(10, 1fr);
  column-gap: 24px;
  row-gap: 16px;
  margin-top: 30px;
}

.contact-details-form input {
  width: 100%;
  border: none;
  outline: none;
  padding: 16px 12px 4px 12px;
  background-color: var(--color-secondary);
  border-bottom: 1px solid #888;
  font-size: 13px;
}

.contact-details-form input:hover {
  background-color: var(--color-search-bar-hover);
}

.contact-details-form div:focus-within label {
  color: var(--color-blue);
}

.contact-details-form div {
  position: relative;
}

.contact-details-form label,
.status {
  font-size: 10px;
  position: absolute;
  left: 12px;
  z-index: 1;
}

.status-container {
  grid-column: 2/-1;
}

.first-name-container {
  grid-column: 2/-1;
}

.last-name-container {
  grid-column: 2/-1;
}

.company-container {
  grid-column: 1/-1;
}

.contact-container {
  grid-column: 1/-1;
  border-bottom: 1px solid #ddd;
}

.position-container {
  grid-row: 5/5;
}

.address-container {
  grid-column: 1/-1;
}

.assigned-to-container {
  grid-column: 2/-1;
  grid-row: 5/5;
}

.email-container {
  grid-column: 2/-1;
}

.contact-details-form .disabled {
  background-color: var(--color-primary);
  border: none;
}

.contact-details-form .disabled:hover {
  background-color: var(--color-primary);
}

.assigned-to-container .disabled,
.company-container .disabled {
  color: var(--color-blue);
}

.call-email-container {
  display: flex;
  gap: 8.2rem;
}

.call-email-btn {
  display: flex;
  align-items: center;
  color: var(--color-blue);
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 500;
  gap: 6px;
  letter-spacing: 0.6px;
  border: 1px solid var(--color-blue);
  padding: 6px 12px;
  margin-left: 12px;
  text-decoration: none;
}

.call-email-btn:hover {
  background-color: var(--color-blue-light);
  cursor: pointer;
}

.email-btn {
  margin-left: 36px;
}

.dot {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
}

.salaried-dot {
  background-color: var(--color-salaried);
}

.terminated-dot {
  background-color: var(--color-terminated);
}

.commission-dot {
  background-color: var(--color-blue);
}

.input-menu {
  background-color: var(--color-secondary);
  border-bottom: 1px solid #888;
}

.base-menu:hover,
.base-menu {
  background-color: var(--color-primary);
}

.menu-title {
  padding: 14px 12px 4px 12px;
  width: 225px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 400;
  font-size: 12px;
  cursor: pointer;
}

.menu-item {
  width: 250px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.salaried {
  color: var(--color-salaried);
}

.terminated {
  color: var(--color-terminated);
}

.commission {
  color: var(--color-blue);
}
</style>

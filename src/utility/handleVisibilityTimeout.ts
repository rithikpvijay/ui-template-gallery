import type { Ref } from 'vue'

export const handleVisibilityTimeout = (
  visibilityRef: Ref<boolean>,
  timeoutValue: Ref<number | null>,
  time = 1000,
) => {
  visibilityRef.value = true
  if (timeoutValue.value) {
    clearTimeout(timeoutValue.value)
  }

  timeoutValue.value = setTimeout(() => {
    visibilityRef.value = false
  }, time)
}

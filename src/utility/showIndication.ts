import type { Ref } from 'vue'

export type Indication = '' | 'forward' | 'rewind' | 'volume' | 'play' | 'pause'

export const showIndication = (
  activeIndication: Ref<Indication>,
  timeoutRef: Ref<number | null>,
  value: Indication,
  time = 1000,
) => {
  activeIndication.value = value
  if (timeoutRef.value) {
    clearTimeout(timeoutRef.value)
  }

  timeoutRef.value = setTimeout(() => {
    activeIndication.value = ''
  }, time)
}

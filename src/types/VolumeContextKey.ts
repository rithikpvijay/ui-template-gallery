import type { InjectionKey, Ref } from 'vue'

export interface Status {
  buffering?: boolean
  controlVisible?: boolean
  dragging?: boolean
  fullscreen?: boolean
  videoPlaying?: boolean
  videoReady?: boolean
  volume?: boolean
  volumeFocus?: boolean
}

interface volumeContext {
  handleMuteToggle: () => void
  videoRef: Ref<HTMLVideoElement | null>
  volumeValue: Ref<number>
}

export const volumeContextKey: InjectionKey<volumeContext> = Symbol('videoContextKey')

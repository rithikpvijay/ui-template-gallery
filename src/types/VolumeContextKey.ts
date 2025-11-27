import type { InjectionKey, Ref } from 'vue'

export interface Status {
  buffering?: boolean
  controlVisible?: boolean
  dragging?: boolean
  fullscreen?: boolean
  videoPlaying?: boolean
  videoReady?: boolean
  volume?: boolean
  playbackSpeed?: boolean
}

interface videoContext {
  handleControlVisibility: () => void
  handleMuteToggle: () => void
  status: Status
  videoRef: Ref<HTMLVideoElement | null>
  volumeValue: Ref<number>
}

export const videoContextKey: InjectionKey<videoContext> = Symbol('videoContextKey')

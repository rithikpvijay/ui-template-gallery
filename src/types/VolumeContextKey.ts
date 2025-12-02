import type { InjectionKey, Ref, ShallowRef } from 'vue'
import type { Level } from 'hls.js'
import type Hls from 'hls.js'

export interface Status {
  buffering?: boolean
  controlVisible?: boolean
  dragging?: boolean
  fullscreen?: boolean
  videoPlaying?: boolean
  videoReady?: boolean
  volume?: boolean
  playbackSpeedMenu?: boolean
  qualityOptionsMenu?: boolean
}

interface videoContext {
  handleControlVisibility: () => void
  handleMuteToggle: () => void
  hlsInstance: ShallowRef<Hls | null>
  hlsLevel: ShallowRef<Level[]>
  status: Status
  videoRef: Ref<HTMLVideoElement | null>
  videoWrapperRef: Ref<HTMLElement | null>
  volumeValue: Ref<number>
}

export const videoContextKey: InjectionKey<videoContext> = Symbol('videoContextKey')

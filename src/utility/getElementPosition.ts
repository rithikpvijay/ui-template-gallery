import { ElementPosition } from '@/types/ElementPosition'

export const getElementPosition = (position: ElementPosition = ElementPosition.BOTTOM_CENTER) => {
  if (position === ElementPosition.BOTTOM_RIGHT) {
    return { top: '100%', right: '0' }
  }

  if (position === ElementPosition.TOP_RIGHT) {
    return { bottom: '100%', right: '0' }
  }

  if (position === ElementPosition.TOP_LEFT) {
    return { bottom: '100%', left: '0' }
  }

  if (position === ElementPosition.BOTTOM_LEFT) {
    return { top: '100%', left: '0' }
  }

  if (position === ElementPosition.BOTTOM_CENTER) {
    return { top: '100%', left: '50%', transform: 'translateX(-50%)' }
  }

  return { bottom: '100%', left: '50%', transform: 'translateX(-50%)' }
}

export const formatTime = (input: number) => {
  const hours = Math.floor(input / 3600)
  const minutes = Math.floor((input % 3600) / 60)
  const seconds = Math.floor(input % 60)

  const hh = hours > 0 ? `${String(hours).padStart(2, '0')}:` : ''
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return `${hh}${mm}:${ss}`
}

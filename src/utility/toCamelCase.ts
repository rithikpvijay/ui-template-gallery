export const toCamelCase = (input: string) => {
  const parts = input.trim().toLowerCase().split(/\s+/)
  if (parts.length === 1) {
    return parts[0]
  }

  const [first, ...rest] = parts
  return first + rest.map((p) => p[0]?.toUpperCase() + p.slice(1)).join('')
}

export function resolveTag (tag: string) {
  return encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`)
}

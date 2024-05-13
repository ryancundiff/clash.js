export function resolveTag (tag: string) {
  tag = tag.toUpperCase()
  
  return encodeURIComponent(tag.startsWith('#') ? tag : `#${tag}`)
}

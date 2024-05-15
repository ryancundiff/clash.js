/**
 * Resolves a tag to a valid tag format.
 * @param tag Tag to resolve.
 */
export function resolveTag (tag: string) {
  // Credit: clashperk/clashofclans.js
  return `#${tag.toUpperCase().replace(/[#]/g, '').replace(/[\s]/g, '').replace(/[O]/g, '0')}`
}

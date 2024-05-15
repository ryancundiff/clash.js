/**
 * Check if a tag is valid in format.
 * @param tag Tag to check.
*/
export function isValidTag (tag: string) {
  return /^#[PYLQGRJCUV0289]{3,9}$/g.test(tag)
}

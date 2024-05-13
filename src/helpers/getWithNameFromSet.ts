export function getWithNameFromSet <Type extends { name: string }> (items: Array<Type>, set: Set<string>) {
  let array = new Array<Type>

  for (const item of items) {
    if (item.name && set.has(item.name)) {
      array.push(item)
    }
  }

  return array.length > 0
    ? array
    : null
}
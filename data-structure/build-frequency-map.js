/**
 * @param {array|string} arr
 * @returns {map}
 */
const buildFrequencyMap = (arr) => {
  const map = new Map()

  for (let i = 0; i < arr.length; i++) {
    if (!map.has(arr[i])) {
      map.set(arr[i], 0)
    }
    map.set(arr[i], map.get(arr[i]) + 1)
  }

  return map
}

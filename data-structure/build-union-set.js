/**
 * @param {array|string} arr
 * @returns {set}
 */
const buildUnionSet = (arr) => {
  const set = new Set()

  for (let i = 0; i < arr.length; i++) {
    set.add(arr[i])
  }

  return set
}

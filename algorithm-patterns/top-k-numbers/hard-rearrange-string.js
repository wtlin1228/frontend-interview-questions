/**
 * Rearrange String (hard)
 *
 * Given a string, find if its letters can be rearranged in such
 * a way that no two same characters come next to each other.
 *
 *
 * Example 1:
 *
 * Input: "aappp"
 * Output: "papap"
 * Explanation: In "papap", none of the repeating characters come
 * next to each other.
 *
 *
 * Example 2:
 *
 * Input: "Programming"
 * Output: "rgmrgmPiano" or "gmringmrPoa" or "gmrPagimnor", etc.
 * Explanation: None of the repeating characters come next to each other.
 *
 *
 * Example 3:
 *
 * Input: "aapa"
 * Output: ""
 * Explanation: In all arrangements of "aapa", atleast two 'a' will
 * come together e.g., "apaa", "paaa".
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Time Complexity: O(n log n), n = str.length
 * Space Complexity: O(n)
 */
const rearrange_string = function (str) {
  // O(n) time, n = str.length
  // O(k) space, k = number of distinct char
  const frequencyMap = {}
  str.split('').forEach((s) => {
    if (!frequencyMap[s]) {
      frequencyMap[s] = 1
    } else {
      frequencyMap[s] += 1
    }
  })

  // O(k) time, k = number of distinct char
  // O(k) space, k = number of distinct char
  const maxHeap = new Heap(
    Object.entries(frequencyMap), // [[char, frequency], [char, frequency], ...]
    (child, parent) => child[1] < parent[1]
  )
  maxHeap.buildHeap()

  // O(n) space, n = str.length
  let result = []
  let previousChar = null
  let previousFrequency = 0
  // O(n log k) time, n = str.length, k = number of distinct char
  while (maxHeap.size() > 0) {
    const [char, frequency] = maxHeap.pop()
    if (previousChar !== null && previousFrequency > 0) {
      maxHeap.push([previousChar, previousFrequency])
    }
    result.push(char)
    previousChar = char
    previousFrequency = frequency - 1
  }

  if (result.length === str.length) {
    return result.join('')
  }

  return ''
}

console.log(`Rearranged string: ${rearrange_string('aappp')}`)
console.log(`Rearranged string: ${rearrange_string('Programming')}`)
console.log(`Rearranged string: ${rearrange_string('aapa')}`)

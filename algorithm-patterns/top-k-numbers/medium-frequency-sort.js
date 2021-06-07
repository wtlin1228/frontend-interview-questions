/**
 * Frequency Sort (medium)
 *
 * Given a string, sort it based on the decreasing frequency of its characters.
 *
 *
 * Example 1:
 *
 * Input: "Programming"
 * Output: "rrggmmPiano"
 * Explanation: 'r', 'g', and 'm' appeared twice, so they need to appear before any other character.
 *
 *
 * Example 2:
 *
 * Input: "abcbab"
 * Output: "bbbaac"
 * Explanation: 'b' appeared three times, 'a' appeared twice, and 'c' appeared only once.
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Time Complexity: O(n log n), n = str.length
 * Space Complexity: O(n)
 */
const sort_character_by_frequency = function (str) {
  const frequencyMap = {}
  str.split('').forEach((s) => {
    if (!frequencyMap[s]) {
      frequencyMap[s] = 1
    } else {
      frequencyMap[s] += 1
    }
  })

  const maxHeap = new Heap(
    Object.entries(frequencyMap),
    (child, parent) => child[1] < parent[1]
  )

  maxHeap.buildHeap()

  let result = ''
  while (maxHeap.size() > 0) {
    const pair = maxHeap.pop()
    result += Array(pair[1]).fill(pair[0]).join('')
  }

  return result
}

console.log(
  `String after sorting characters by frequency: ${sort_character_by_frequency(
    'Programming'
  )}`
)
console.log(
  `String after sorting characters by frequency: ${sort_character_by_frequency(
    'abcbab'
  )}`
)

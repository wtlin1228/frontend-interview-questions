/**
 * Top 'K' Frequent Numbers (medium)
 *
 * Given an unsorted array of numbers, find the top ‘K’ frequently occurring numbers in it.
 *
 *
 * Example 1:
 *
 * Input: [1, 3, 5, 12, 11, 12, 11], K = 2
 * Output: [12, 11]
 * Explanation: Both '11' and '12' apeared twice.
 *
 *
 * Example 2:
 *
 * Input: [5, 12, 11, 3, 11], K = 2
 * Output: [11, 5] or [11, 12] or [11, 3]
 * Explanation: Only '11' appeared twice, all other numbers appeared once.
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Time Complexity: O(n + n log k), n = nums.length
 * Space Complexity: O(n)
 */
const find_k_frequent_numbers = function (nums, k) {
  // O(n) time, O(n) space
  const frequencyMap = {}
  nums.forEach((n) => {
    if (!frequencyMap[n]) {
      frequencyMap[n] = 1
    } else {
      frequencyMap[n] += 1
    }
  })

  // O(n log k)
  // O(k)
  const minHeap = new Heap(
    [],
    (child, parent) => child.frequency >= parent.frequency
  )
  for (const [value, frequency] of Object.entries(frequencyMap)) {
    if (minHeap.size() === k) {
      if (minHeap.peek().frequency < frequency) {
        minHeap.pop()
        minHeap.push({
          value,
          frequency,
        })
      }
    } else {
      minHeap.push({
        value,
        frequency,
      })
    }
  }

  return minHeap.toArray().map(({ value }) => value)
}

console.log(
  `Here are the K frequent numbers: ${find_k_frequent_numbers(
    [1, 3, 5, 12, 11, 12, 11],
    2
  )}`
)
console.log(
  `Here are the K frequent numbers: ${find_k_frequent_numbers(
    [5, 12, 11, 3, 11],
    2
  )}`
)

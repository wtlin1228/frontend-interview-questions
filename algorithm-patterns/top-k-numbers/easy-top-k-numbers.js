/**
 * Top 'K' Numbers (easy)
 *
 * Given an unsorted array of numbers, find the ‘K’ largest numbers in it.
 *
 * Note: For a detailed discussion about different approaches to solve this
 * problem, take a look at Kth Smallest Number.
 *
 *
 * Example 1:
 *
 * Input: [3, 1, 5, 12, 2, 11], K = 3
 * Output: [5, 12, 11]
 *
 *
 * Example 2:
 *
 * Input: [5, 12, 11, -1, 12], K = 3
 * Output: [12, 11, 12]
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Time Complexity: O(n log k), n = nums.length
 * Space Complexity: O(k)
 */
const find_k_largest_numbers = function (nums, k) {
  const minHeap = new Heap([], (child, parent) => child >= parent)
  nums.forEach((num) => {
    if (minHeap.size() === k) {
      if (num > minHeap.peek()) {
        minHeap.pop()
        minHeap.push(num)
      }
    } else {
      minHeap.push(num)
    }
  })

  return minHeap.toArray()
}

console.log(
  `Here are the top K numbers: ${find_k_largest_numbers(
    [3, 1, 5, 12, 2, 11],
    3
  )}`
)
console.log(
  `Here are the top K numbers: ${find_k_largest_numbers(
    [5, 12, 11, -1, 12],
    3
  )}`
)

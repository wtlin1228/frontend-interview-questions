/**
 * 'K' Closest Numbers (medium)
 *
 * Given a sorted number array and two integers ‘K’ and ‘X’, find ‘K’ closest numbers to ‘X’ in the array. Return the numbers in the sorted order. ‘X’ is not necessarily present in the array.
 *
 *
 * Example 1:
 *
 * Input: [5, 6, 7, 8, 9], K = 3, X = 7
 * Output: [6, 7, 8]
 *
 *
 * Example 2:
 *
 * Input: [2, 4, 5, 6, 9], K = 3, X = 6
 * Output: [4, 5, 6]
 *
 *
 * Example 3:
 *
 * Input: [2, 4, 5, 6, 9], K = 3, X = 10
 * Output: [5, 6, 9]
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Time Complexity: O(N log K), n = arr.length
 * Space Complexity: O(K)
 */
const find_closest_elements = function (arr, K, X) {
  result = []

  const maxHeap = new Heap([], (child, parent) => parent.length > child.length)
  arr.forEach((n) => {
    if (maxHeap.size() === K) {
      if (maxHeap.peek().length > Math.abs(n - X)) {
        maxHeap.pop()
        maxHeap.push({ value: n, length: Math.abs(n - X) })
      }
    } else {
      maxHeap.push({ value: n, length: Math.abs(n - X) })
    }
  })

  while (maxHeap.size() > 0) {
    result.push(maxHeap.pop().value)
  }

  return result
}

console.log(
  `'K' closest numbers to 'X' are: ${find_closest_elements(
    [5, 6, 7, 8, 9],
    3,
    7
  )}`
)
console.log(
  `'K' closest numbers to 'X' are: ${find_closest_elements(
    [2, 4, 5, 6, 9],
    3,
    6
  )}`
)
console.log(
  `'K' closest numbers to 'X' are: ${find_closest_elements(
    [2, 4, 5, 6, 9],
    3,
    10
  )}`
)

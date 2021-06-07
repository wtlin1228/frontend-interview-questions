/**
 * Maximum Distinct Elements (medium)
 *
 * Given an array of numbers and a number ‘K’, we need to remove ‘K’
 * numbers from the array such that we are left with maximum distinct
 * numbers.
 *
 *
 * Example 1:
 *
 * Input: [7, 3, 5, 8, 5, 3, 3], and K=2
 * Output: 3
 * Explanation: We can remove two occurrences of 3 to be left with 3 distinct numbers [7, 3, 8], we have
 * to skip 5 because it is not distinct and occurred twice.
 * Another solution could be to remove one instance of '5' and '3' each to be left with three
 * distinct numbers [7, 5, 8], in this case, we have to skip 3 because it occurred twice.
 *
 *
 * Example 2:
 *
 * Input: [3, 5, 12, 11, 12], and K=3
 * Output: 2
 * Explanation: We can remove one occurrence of 12, after which all numbers will become distinct. Then
 * we can delete any two numbers which will leave us 2 distinct numbers in the result.
 *
 *
 * Example 3:
 *
 * Input: [1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5], and K=2
 * Output: 3
 * Explanation: We can remove one occurrence of '4' to get three distinct numbers.
 */

const { Heap } = require('../../algorithm/heap/heap')

/**
 * Time Complexity: O(n + m + k log m), n = nums.length, m = number of distinct value whose frequency is greater than 1
 * Space Complexity: O(n)
 */
const find_maximum_distinct_elements = function (nums, k) {
  if (nums.length < k) {
    return 0
  }

  const frequencyMap = {}

  // O(n)
  nums.forEach((num) => {
    if (!frequencyMap[num]) {
      frequencyMap[num] = 1
    } else {
      frequencyMap[num] += 1
    }
  })

  const arrForFrequencyGreaterThan1 = Object.values(frequencyMap).filter(
    (frequency) => frequency > 1
  )
  const minHeap = new Heap(
    arrForFrequencyGreaterThan1,
    (child, parent) => child >= parent
  )
  minHeap.buildHeap() // O(m), m = number of distinct value whose frequency is greater than 1

  let result =
    Object.keys(frequencyMap).length - arrForFrequencyGreaterThan1.length

  // O(k log m)
  while (minHeap.size() > 0 && k > 0) {
    k -= minHeap.pop() - 1
    if (k > 0) {
      result += 1
    }
  }

  if (k > 0) {
    result -= k
  }

  return result
}

console.log(
  `Maximum distinct numbers after removing K numbers: ${find_maximum_distinct_elements(
    [7, 3, 5, 8, 5, 3, 3],
    2
  )}`
)
console.log(
  `Maximum distinct numbers after removing K numbers: ${find_maximum_distinct_elements(
    [3, 5, 12, 11, 12],
    3
  )}`
)
console.log(
  `Maximum distinct numbers after removing K numbers: ${find_maximum_distinct_elements(
    [1, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5],
    2
  )}`
)

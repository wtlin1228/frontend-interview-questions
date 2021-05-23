/**
 * Maximum Sum Subarray of Size K (easy)
 *
 * Given an array of positive numbers and a positive number ‘k,’
 * find the maximum sum of any contiguous subarray of size ‘k’.
 *
 * Input: [2, 1, 5, 1, 3, 2], k=3
 * Output: 9
 * Explanation: Subarray with maximum sum is [5, 1, 3].
 *
 * Input: [2, 3, 4, 1, 5], k=2
 * Output: 7
 * Explanation: Subarray with maximum sum is [3, 4].
 */

/**
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
const max_sub_array_of_size_k = function (k, arr) {
  let maxSum = 0
  let windowSum = 0

  for (let start = 0, end = 0; end < arr.length; end++) {
    windowSum += arr[end]

    if (end >= k) {
      windowSum -= arr[start]
      start++
    }

    maxSum = Math.max(maxSum, windowSum)
  }

  return maxSum
}

console.log(max_sub_array_of_size_k(3, [2, 1, 5, 1, 3, 2]))
console.log(max_sub_array_of_size_k(2, [2, 3, 4, 1, 5]))

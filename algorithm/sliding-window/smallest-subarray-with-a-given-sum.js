/**
 * Smallest Subarray with a given sum (easy)
 *
 * Given an array of positive numbers and a positive number ‘S,’
 * find the length of the smallest contiguous subarray whose sum
 * is greater than or equal to ‘S’. Return 0 if no such subarray exists.
 *
 * Input: [2, 1, 5, 2, 3, 2], S=7
 * Output: 2
 * Explanation: The smallest subarray with a sum greater than or equal to '7' is [5, 2].
 *
 * Input: [2, 1, 5, 2, 8], S=7
 * Output: 1
 * Explanation: The smallest subarray with a sum greater than or equal to '7' is [8].
 *
 * Input: [3, 4, 1, 1, 6], S=8
 * Output: 3
 * Explanation: Smallest subarrays with a sum greater than or equal to '8' are [3, 4, 1]
 * or [1, 1, 6].
 */

/**
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
const smallest_subarray_with_given_sum = function (s, arr) {
  let minLength = Infinity
  let windowSum = 0

  for (let start = 0, end = 0; end < arr.length; end++) {
    windowSum += arr[end]

    while (windowSum >= s) {
      minLength = Math.min(minLength, end - start + 1)
      windowSum -= arr[start]
      start += 1
    }
  }

  if (minLength === Infinity) {
    return 0
  }

  return minLength
}

console.log(smallest_subarray_with_given_sum(7, [2, 1, 5, 2, 3, 2]))
console.log(smallest_subarray_with_given_sum(7, [2, 1, 5, 2, 8]))
console.log(smallest_subarray_with_given_sum(8, [3, 4, 1, 1, 6]))

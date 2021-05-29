/**
 * Longest Subarray with Ones after Replacement (hard)
 *
 * Given an array containing 0s and 1s, if you are allowed to replace
 * no more than ‘k’ 0s with 1s, find the length of the longest contiguous
 * subarray having all 1s.
 *
 * Input: Array=[0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], k=2
 * Output: 6
 * Explanation: Replace the '0' at index 5 and 8 to have the longest contiguous subarray of 1s having length 6.
 *
 * Input: Array=[0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], k=3
 * Output: 9
 * Explanation: Replace the '0' at index 6, 9, and 10 to have the longest contiguous subarray of 1s having length 9.
 */

/**
 * Time Complexity: O(N), N = arr.length
 * Space Complexity: O(1)
 */
function length_of_longest_substring(arr, k) {
  let maxLength = 0
  let maxOnesCount = 0

  for (let start = 0, end = 0; end < arr.length; end++) {
    if (arr[end] === 1) {
      maxOnesCount += 1
    }

    if (end - start + 1 - maxOnesCount > k) {
      if (arr[start] === 1) {
        maxOnesCount -= 1
      }
      start += 1
    }

    maxLength = Math.max(maxLength, end - start + 1)
  }

  return maxLength
}

console.log(length_of_longest_substring([0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1], 2))
console.log(
  length_of_longest_substring([0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1], 3)
)

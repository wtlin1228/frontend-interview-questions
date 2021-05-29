/**
 * Triplets with Smaller Sum (medium)
 *
 * Given an array arr of unsorted numbers and a target sum,
 * count all triplets in it such that arr[i] + arr[j] + arr[k] < target
 * where i, j, and k are three different indices.
 * Write a function to return the count of such triplets.
 *
 * Input: [-1, 0, 2, 3], target=3
 * Output: 2
 * Explanation: There are two triplets whose sum is less than the target: [-1, 0, 3], [-1, 0, 2]
 *
 * Input: [-1, 4, 2, 1, 3], target=5
 * Output: 4
 * Explanation: There are four triplets whose sum is less than the target:
 *    [-1, 1, 4], [-1, 1, 3], [-1, 1, 2], [-1, 2, 3]
 */

/**
 * Time Complexity: O(N^2), N = arr.length
 * Space Complexity: O(N), for sorting
 */
function triplet_with_smaller_sum(arr, target) {
  let count = 0

  arr.sort((a, b) => a - b)

  for (let i = 0; i < arr.length; i++) {
    count += search_pair(arr, target - arr[i], i + 1)
  }
  return count
}

/**
 * Time Complexity: O(N), N = arr.length
 * Space Complexity: O(1)
 */
function search_pair(arr, targetSum, left) {
  let count = 0
  let right = arr.length - 1

  while (left < right) {
    const currentSum = arr[left] + arr[right]
    if (currentSum < targetSum) {
      count += right - left
      left += 1
    } else {
      right -= 1
    }
  }

  return count
}

console.log(triplet_with_smaller_sum([-1, 0, 2, 3], 3))
console.log(triplet_with_smaller_sum([-1, 4, 2, 1, 3], 5))

/**
 * Similar Problems
 *
 * Problem: Write a function to return the list of all such triplets
 * instead of the count. How will the time complexity change in this case?
 *
 * Solution: Time complexity is O(N^3), because instead of `count += right - left`.
 * It needs to iterate through right to left to push each number pair.
 */

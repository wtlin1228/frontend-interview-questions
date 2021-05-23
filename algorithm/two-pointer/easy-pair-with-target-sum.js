/**
 * Pair with Target Sum (easy)
 *
 * Given an array of sorted numbers and a target sum, find a pair
 * in the array whose sum is equal to the given target.
 *
 * Input: [1, 2, 3, 4, 6], target=6
 * Output: [1, 3]
 * Explanation: The numbers at index 1 and 3 add up to 6: 2+4=6
 *
 * Input: [2, 5, 9, 11], target=11
 * Output: [0, 2]
 * Explanation: The numbers at index 0 and 2 add up to 11: 2+9=11
 */

/**
 * Time Complexity: O(N), N = arr.length
 * Space Complexity: O(1)
 */
function pair_with_target_sum(arr, targetSum) {
  let right = arr.length - 1
  let left = 0

  while (left < right) {
    const currentSum = arr[left] + arr[right]

    if (currentSum === targetSum) {
      return [left, right]
    }

    if (currentSum < targetSum) {
      left += 1
    } else {
      right -= 1
    }
  }

  return [-1, -1]
}

console.log(pair_with_target_sum([1, 2, 3, 4, 6], 6))
console.log(pair_with_target_sum([2, 5, 9, 11], 11))

/**
 * Triplet Sum Close to Target (medium)
 *
 * Given an array of unsorted numbers and a target number, find a triplet
 * in the array whose sum is as close to the target number as possible,
 * return the sum of the triplet. If there are more than one such triplet,
 * return the sum of the triplet with the smallest sum.
 *
 * Input: [-2, 0, 1, 2], target=2
 * Output: 1
 * Explanation: The triplet [-2, 1, 2] has the closest sum to the target.
 *
 * Input: [-3, -1, 1, 2], target=1
 * Output: 0
 * Explanation: The triplet [-3, 1, 2] has the closest sum to the target.
 *
 * Input: [1, 0, 1, 1], target=100
 * Output: 3
 * Explanation: The triplet [1, 1, 1] has the closest sum to the target.
 *
 */

/**
 * Time Complexity: O(N^2), N = arr.length
 * Space Complexity: O(N), for sorting
 */
function triplet_sum_close_to_target(arr, targetSum) {
  let result = Infinity

  arr.sort((a, b) => a - b)

  for (let i = 0; i < arr.length; i++) {
    const pairSum = pair_sum_close_to_target(arr, i + 1, targetSum - arr[i])

    if (
      Math.abs(targetSum - (pairSum + arr[i])) < Math.abs(targetSum - result)
    ) {
      result = pairSum + arr[i]
    }
  }

  return result
}

/**
 * Time Complexity: O(N), N = arr.length
 * Space Complexity: O(1)
 */
function pair_sum_close_to_target(arr, left, targetSum) {
  let right = arr.length - 1
  let result = Infinity
  while (left < right) {
    const currentSum = arr[left] + arr[right]

    if (currentSum === targetSum) {
      return currentSum
    }

    if (Math.abs(targetSum - currentSum) < Math.abs(targetSum - result)) {
      result = currentSum
    }

    if (currentSum < targetSum) {
      left += 1
    } else {
      right -= 1
    }
  }

  return result
}

console.log(triplet_sum_close_to_target([-2, 0, 1, 2], 2))
console.log(triplet_sum_close_to_target([-3, -1, 1, 2], 1))
console.log(triplet_sum_close_to_target([1, 0, 1, 1], 100))
console.log(triplet_sum_close_to_target([1, -1, -1, -5, -100, 1, 1], -100))

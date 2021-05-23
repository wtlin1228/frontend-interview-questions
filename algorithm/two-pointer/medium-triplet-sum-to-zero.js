/**
 * Triplet Sum to Zero (medium)
 *
 * Given an array of unsorted numbers, find all unique triplets in it that add up to zero.
 *
 * Input: [-3, 0, 1, 2, -1, 1, -2]
 * Output: [-3, 1, 2], [-2, 0, 2], [-2, 1, 1], [-1, 0, 1]
 * Explanation: There are four unique triplets whose sum is equal to zero.
 *
 * Input: [-5, 2, -1, -2, 3]
 * Output: [[-5, 2, 3], [-2, -1, 3]]
 * Explanation: There are two unique triplets whose sum is equal to zero.
 */

/**
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
function search_triplets(arr) {
  let triplets = []

  // Time Complexity: O(N * log(N))
  // Space Complexity: O(N)
  arr.sort((a, b) => a - b)

  for (let i = 0; i < arr.length; i++) {
    search_pair(arr, arr[i] * -1, i + 1, triplets)
  }

  return triplets
}

/**
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
function search_pair(arr, targetSum, left, triplets) {
  let right = arr.length - 1

  while (left < right) {
    const currentSum = arr[left] + arr[right]

    if (currentSum === targetSum) {
      triplets.push([targetSum * -1, arr[left], arr[right]])

      while (arr[left] === arr[left + 1]) {
        left += 1
      }

      while (arr[right] === arr[right - 1]) {
        right -= 1
      }
    }

    if (currentSum < targetSum) {
      left += 1
    } else {
      right -= 1
    }
  }
}

console.log(search_triplets([-3, 0, 1, 2, -1, 1, -2]))
console.log(search_triplets([-5, 2, -1, -2, 3]))

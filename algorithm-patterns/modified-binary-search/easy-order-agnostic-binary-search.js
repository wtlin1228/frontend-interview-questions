/**
 * Order-agnostic Binary Search (easy)
 *
 * Given a sorted array of numbers, find if a given number ‘key’ is present in the array.
 * Though we know that the array is sorted, we don’t know if it’s sorted in ascending
 * or descending order. You should assume that the array can have duplicates.
 *
 * Write a function to return the index of the ‘key’ if it is present in the array, otherwise return -1.
 *
 * Example 1:
 *
 * Input: [4, 6, 10], key = 10
 * Output: 2
 *
 *
 * Example 2:
 *
 * Input: [1, 2, 3, 4, 5, 6, 7], key = 5
 * Output: 4
 *
 *
 * Example 3:
 *
 * Input: [10, 6, 4], key = 10
 * Output: 0
 *
 *
 * Example 4:
 *
 * Input: [10, 6, 4], key = 4
 * Output: 2
 */

/**
 * Time Complexity: O(log n), n = arr.length, because we reduce half size in each iteration
 * Space Complexity: O(1)
 */
const binary_search = function (arr, key) {
  // arr = []
  if (arr.length === 0) {
    return -1
  }

  // arr = [x]
  if (arr.length === 1) {
    return arr[0] === key ? 0 : -1
  }

  // arr = [x, x, x, x, x, x]
  if (arr[0] === arr[arr.length - 1]) {
    return arr[0] === key ? 0 : -1
  }

  let isAscending = arr[0] < arr[arr.length - 1]
  let start = 0
  let end = arr.length - 1
  while (start <= end) {
    const middle = Math.floor((start + end) / 2)

    if (arr[middle] === key) {
      return middle
    }

    if (arr[middle] > key) {
      if (isAscending) {
        end = middle - 1
      } else {
        start = middle + 1
      }
    } else {
      if (isAscending) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    }
  }

  return -1
}

console.log(binary_search([4, 6, 10], 10))
console.log(binary_search([1, 2, 3, 4, 5, 6, 7], 5))
console.log(binary_search([10, 6, 4], 10))
console.log(binary_search([10, 6, 4], 4))
console.log(binary_search([10, 6, 4], 5))
console.log(binary_search([10, 6, 4], 11))
console.log(binary_search([6, 6, 6, 6, 6, 6], 4))
console.log(binary_search([6, 6, 6, 6, 6, 6], 6))
console.log(binary_search([], 4))

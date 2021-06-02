/**
 * Number Range (medium)
 *
 * Given an array of numbers sorted in ascending order, find the
 * range of a given number ‘key’. The range of the ‘key’ will be
 * the first and last position of the ‘key’ in the array.
 *
 * Write a function to return the range of the ‘key’. If the ‘key’
 * is not present return [-1, -1].
 *
 * Example 1:
 *
 * Input: [4, 6, 6, 6, 9], key = 6
 * Output: [1, 3]
 *
 *
 * Example 2:
 *
 * Input: [1, 3, 8, 10, 15], key = 10
 * Output: [3, 3]
 *
 *
 * Example 3:
 *
 * Input: [1, 3, 8, 10, 15], key = 12
 * Output: [-1, -1]
 */

const find_range = function (arr, key) {
  if (arr.length === 0) {
    return [-1, -1]
  }

  if (arr[0] === arr[arr.length - 1] && arr[0] === key) {
    return [0, arr.length - 1]
  }

  let result = [-1, -1]

  result[0] = binarySearch(arr, key, false)

  if (result[0] !== -1) {
    result[1] = binarySearch(arr, key, true)
  }

  return result
}

/**
 * Time Complexity: O(log n), n = arr.length, because we reduce half size in each iteration
 * Space Complexity: O(1)
 */
const binarySearch = (arr, key, isSearchingTheRightBound) => {
  let keyIndex = -1
  let start = 0
  let end = arr.length - 1
  while (start <= end) {
    const middle = Math.floor((start + end) / 2)

    if (arr[middle] > key) {
      end = middle - 1
    } else if (arr[middle] < key) {
      start = middle + 1
    } else {
      keyIndex = middle
      if (isSearchingTheRightBound) {
        start = middle + 1
      } else {
        end = middle - 1
      }
    }
  }

  return keyIndex
}

console.log(find_range([4, 6, 6, 6, 9], 6))
console.log(find_range([6, 6, 6, 6, 6], 6))
console.log(find_range([], 6))
console.log(find_range([1, 3, 8, 10, 15], 10))
console.log(find_range([1, 3, 8, 10, 15], 12))

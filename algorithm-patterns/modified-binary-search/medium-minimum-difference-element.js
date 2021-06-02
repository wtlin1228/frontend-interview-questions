/**
 * Minimum Difference Element (medium)
 *
 * Given an array of numbers sorted in ascending order, find the element
 * in the array that has the minimum difference with the given ‘key’.
 *
 * Example 1:
 *
 * Input: [4, 6, 10], key = 7
 * Output: 6
 * Explanation: The difference between the key '7' and '6' is minimum than any other number in the array
 *
 *
 * Example 2:
 *
 * Input: [4, 6, 10], key = 4
 * Output: 4
 *
 *
 * Example 3:
 *
 * Input: [1, 3, 8, 10, 15], key = 12
 * Output: 10
 *
 *
 * Example 4:
 *
 * Input: [4, 6, 10], key = 17
 * Output: 10
 */

/**
 * Time Complexity: O(log n), n = reader.arr.length, because we reduce half size in each iteration
 * Space Complexity: O(1)
 */
const search_min_diff_element = function (arr, key) {
  if (arr[0] > key) {
    return arr[0]
  }

  if (arr[arr.length - 1] < key) {
    return arr[arr.length - 1]
  }

  let start = 0
  let end = arr.length - 1
  while (start <= end) {
    const middle = Math.floor((start + end) / 2)
    const middleValue = arr[middle]

    if (middleValue === key) {
      return middleValue
    }

    if (middleValue > key) {
      end = middle - 1
    } else {
      start = middle + 1
    }
  }

  if (key - arr[end] <= arr[start] - key) {
    return arr[end]
  } else {
    return arr[start]
  }
}

console.log(search_min_diff_element([4, 6, 10], 7))
console.log(search_min_diff_element([4, 6, 10], 4))
console.log(search_min_diff_element([1, 3, 8, 10, 15], 12))
console.log(search_min_diff_element([4, 6, 10], 17))

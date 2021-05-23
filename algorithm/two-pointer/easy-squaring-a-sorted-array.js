/**
 * Squaring a Sorted Array (easy)
 *
 * Given a sorted array, create a new array containing squares of
 * all the numbers of the input array in the sorted order.
 *
 * Input: [-2, -1, 0, 2, 3]
 * Output: [0, 1, 4, 4, 9]
 *
 * Input: [-3, -1, 0, 1, 2]
 * Output: [0, 1, 1, 4, 9]
 */

/**
 * Time Complexity: O(N), N = arr.length
 * Space Complexity: O(N), N = arr.length
 */
function make_squares(arr) {
  let result = Array.from({ length: 5 })
  let left = 0
  let right = arr.length - 1

  for (let i = arr.length - 1; i >= 0; i--) {
    const leftSquareNumber = arr[left] * arr[left]
    const rightSquareNumber = arr[right] * arr[right]

    result[i] = Math.max(leftSquareNumber, rightSquareNumber)

    if (rightSquareNumber > leftSquareNumber) {
      right -= 1
    } else {
      left += 1
    }
  }

  return result
}

console.log(`Squares: ${make_squares([-2, -1, 0, 2, 3])}`)
console.log(`Squares: ${make_squares([-3, -1, 0, 1, 2])}`)

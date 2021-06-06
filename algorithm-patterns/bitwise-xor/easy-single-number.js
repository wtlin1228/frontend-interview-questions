/**
 * Single Number (easy)
 *
 * In a non-empty array of integers, every number appears twice except for one, find that single number.
 *
 * Example 1:
 *
 * Input: 1, 4, 2, 1, 3, 2, 3
 * Output: 4
 *
 *
 * Example 2:
 *
 * Input: 7, 9, 7
 * Output: 9
 */

/**
 * Time Complexity: O(N), N = arr.length
 * Space Complexity: O(1)
 */
function find_single_number(arr) {
  return arr.reduce((acc, curr) => acc ^ curr, 0)
}

console.log(find_single_number([1, 4, 2, 1, 3, 2, 3]))
console.log(find_single_number([7, 9, 7]))
console.log(find_single_number([0]))

/**
 * Similar Question
 *
 * In a non-empty array of chars, every char appears twice except for one, find that single char.
 */

function find_single_char(arr) {
  return String.fromCharCode(
    arr.reduce((acc, curr) => acc ^ curr.charCodeAt(0), 0)
  )
}

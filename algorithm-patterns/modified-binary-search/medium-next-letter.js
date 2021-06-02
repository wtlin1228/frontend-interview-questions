/**
 * Next Letter (medium)
 *
 * Given an array of lowercase letters sorted in ascending order, find
 * the smallest letter in the given array greater than a given ‘key’.
 *
 * Assume the given array is a circular list, which means that the last
 * letter is assumed to be connected with the first letter. This also means
 * that the smallest letter in the given array is greater than the last
 * letter of the array and is also the first letter of the array.
 *
 * Write a function to return the next letter of the given ‘key’.
 *
 * Example 1:
 *
 * Input: ['a', 'c', 'f', 'h'], key = 'f'
 * Output: 'h'
 * Explanation: The smallest letter greater than 'f' is 'h' in the given array.
 *
 *
 * Example 2:
 *
 * Input: ['a', 'c', 'f', 'h'], key = 'b'
 * Output: 'c'
 * Explanation: The smallest letter greater than 'b' is 'c'.
 *
 *
 * Example 3:
 *
 * Input: ['a', 'c', 'f', 'h'], key = 'm'
 * Output: 'a'
 * Explanation: As the array is assumed to be circular, the smallest letter greater than 'm' is 'a'.
 *
 *
 * Example 4:
 *
 * Input: ['a', 'c', 'f', 'h'], key = 'h'
 * Output: 'a'
 * Explanation: As the array is assumed to be circular, the smallest letter greater than 'h' is 'a'.
 */

/**
 * Time Complexity: O(log n), n = letters.length, because we reduce half size in each iteration
 * Space Complexity: O(1)
 */
const search_next_letter = function (letters, key) {
  if (key > letters[letters.length - 1]) {
    return letters[0]
  }

  let start = 0
  let end = letters.length - 1
  while (start <= end) {
    const middle = Math.floor((start + end) / 2)

    if (letters[middle] > key) {
      end = middle - 1
    } else {
      start = middle + 1
    }
  }

  return letters[start % letters.length]
}

console.log(search_next_letter(['a', 'c', 'f', 'h'], 'f'))
console.log(search_next_letter(['a', 'c', 'f', 'h'], 'b'))
console.log(search_next_letter(['a', 'c', 'f', 'h'], 'm'))

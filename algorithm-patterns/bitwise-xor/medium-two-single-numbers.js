/**
 * Two Single Numbers (medium)
 *
 * In a non-empty array of numbers, every number appears exactly twice
 * except two numbers that appear only once. Find the two numbers that
 * appear only once.
 *
 * Example 1:
 *
 * Input: [1, 4, 2, 1, 3, 5, 6, 2, 3, 5]
 * Output: [4, 6]
 *
 *
 * Example 2:
 *
 * Input: [2, 1, 3, 2]
 * Output: [1, 3]
 */

/**
 * Time Complexity: O(N), N = arr.length
 * Space Complexity: O(1)
 */
function find_single_numbers(nums) {
  // n1 XOR n2
  const n1xn2 = nums.reduce((acc, curr) => acc ^ curr, 0)

  // There must be a bit that is 1 in num1, is 0 in num2.
  // Find it and use it to separate the nums into two group.
  let rightmostSetBit = 1
  while ((rightmostSetBit & n1xn2) === 0) {
    rightmostSetBit = rightmostSetBit << 1
  }

  let num1 = 0
  let num2 = 0
  nums.forEach((n) => {
    if ((n & rightmostSetBit) === 0) {
      num1 = num1 ^ n
    } else {
      num2 = num2 ^ n
    }
  })

  return [num1, num2]
}

console.log(
  `Single numbers are: ${find_single_numbers([1, 4, 2, 1, 3, 5, 6, 2, 3, 5])}`
)
console.log(`Single numbers are: ${find_single_numbers([2, 1, 3, 2])}`)

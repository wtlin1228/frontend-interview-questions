/**
 * Complement of Base 10 Number (medium)
 *
 * Every non-negative integer N has a binary representation,
 * for example, 8 can be represented as “1000” in binary and
 * 7 as “0111” in binary.
 *
 * The complement of a binary representation is the number
 * in binary that we get when we change every 1 to a 0 and
 * every 0 to a 1. For example, the binary complement of
 * “1010” is “0101”.
 *
 * For a given positive number N in base-10, return the
 * complement of its binary representation as a base-10 integer.
 *
 *
 * Example 1:
 *
 * Input: 8
 * Output: 7
 * Explanation: 8 is 1000 in binary, its complement is 0111 in binary, which is 7 in base-10.
 *
 *
 * Example 2:
 *
 * Input: 10
 * Output: 5
 * Explanation: 10 is 1010 in binary, its complement is 0101 in binary, which is 5 in base-10.
 */

/**
 * Time Complexity: O(b), b = how many bits of n
 * Space Complexity: O(1)
 */
function calculate_bitwise_complement(n) {
  let bitCount = 0
  let num = n
  while (num > 0) {
    bitCount += 1
    num = num >> 1
  }

  const allBitsSet = Math.pow(2, bitCount) - 1

  return n ^ allBitsSet
}

console.log(`Bitwise complement is: ${calculate_bitwise_complement(8)}`)
console.log(`Bitwise complement is: ${calculate_bitwise_complement(10)}`)

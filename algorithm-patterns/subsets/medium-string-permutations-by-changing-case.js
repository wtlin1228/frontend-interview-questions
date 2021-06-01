/**
 * String Permutations by changing case (medium)
 *
 * Given a string, find all of its permutations preserving the character sequence but changing case.
 *
 * Example 1:
 *
 * Input: "ad52"
 * Output: "ad52", "Ad52", "aD52", "AD52"
 *
 *
 * Example 2:
 *
 * Input: "ab7c"
 * Output: "ab7c", "Ab7c", "aB7c", "AB7c", "ab7C", "Ab7C", "aB7C", "AB7C"
 */

const numberChars = Array.from({ length: 10 }, (_, index) => String(index))
const isNumberChar = (n) => numberChars.includes(n)

/**
 * Time Complexity: O(N * 2 ^ N),
 * Space Complexity: O(N * 2 ^ N)
 */
const find_letter_case_string_permutations = function (str) {
  if (str.length === 0) {
    return []
  }

  let subsets = ['']

  for (let char of str) {
    const n = subsets.length
    for (let i = 0; i < n; i++) {
      if (isNumberChar(char)) {
        subsets[i] += char
      } else {
        subsets.push(subsets[i] + char.toUpperCase())
        subsets[i] += char.toLowerCase()
      }
    }
  }

  return subsets
}

console.log(
  `String permutations are: ${find_letter_case_string_permutations('ad52')}`
)
console.log(
  `String permutations are: ${find_letter_case_string_permutations('ab7c')}`
)

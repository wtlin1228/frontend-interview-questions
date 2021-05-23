/**
 * No-repeat Substring (hard)
 *
 * Given a string, find the length of the longest substring, which has no repeating characters.
 *
 * Input: String="aabccbb"
 * Output: 3
 * Explanation: The longest substring without any repeating characters is "abc".
 *
 * Input: String="abbbb"
 * Output: 2
 * Explanation: The longest substring without any repeating characters is "ab".
 *
 * Input: String="abccde"
 * Output: 3
 * Explanation: Longest substrings without any repeating characters are "abc" & "cde".
 */

/**
 * Time Complexity: O(N), N = str.length
 * Space Complexity: O(K), K = distinct characters in the input string
 */
function non_repeat_substring(str) {
  let maxLength = 0
  let charIndexMap = {}

  for (let start = 0, end = 0; end < str.length; end++) {
    const rightChar = str[end]

    if (rightChar in charIndexMap) {
      start = Math.max(start, charIndexMap[rightChar] + 1)
    }

    charIndexMap[rightChar] = end

    maxLength = Math.max(maxLength, end - start + 1)
  }

  return maxLength
}

console.log(
  `Length of the longest substring: ${non_repeat_substring('aabccbb')}`
)
console.log(`Length of the longest substring: ${non_repeat_substring('abbbb')}`)
console.log(
  `Length of the longest substring: ${non_repeat_substring('abccde')}`
)

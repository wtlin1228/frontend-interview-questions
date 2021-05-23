/**
 * Longest Substring with K Distinct Characters (medium)
 *
 * Given a string, find the length of the longest substring in it
 * with no more than K distinct characters. You can assume that K
 * is less than or equal to the length of the given string.
 *
 * Input: String="araaci", K=2
 * Output: 4
 * Explanation: The longest substring with no more than '2' distinct characters is "araa".
 *
 * Input: String="araaci", K=1
 * Output: 2
 * Explanation: The longest substring with no more than '1' distinct characters is "aa".
 *
 * Input: String="cbbebi", K=3
 * Output: 5
 * Explanation: The longest substrings with no more than '3' distinct characters are "cbbeb" & "bbebi".
 */

/**
 * Time Complexity: O(N), N = str.length
 * Space Complexity: O(K), K = max distinct characters
 */
const longest_substring_with_k_distinct = function (str, k) {
  let maxLength = 0
  let charFrequency = {}

  for (let start = 0, end = 0; end < str.length; end++) {
    const rightChar = str[end]
    if (!charFrequency[rightChar]) {
      charFrequency[rightChar] = 1
    }

    while (Object.keys(charFrequency).length > k) {
      leftChar = str[start]
      charFrequency[leftChar] -= 1
      if (charFrequency[leftChar] === 0) {
        delete charFrequency[leftChar]
      }
      start += 1
    }

    maxLength = Math.max(maxLength, end - start + 1)
  }

  return maxLength
}

console.log(longest_substring_with_k_distinct('araaci', 2))
console.log(longest_substring_with_k_distinct('araaci', 1))
console.log(longest_substring_with_k_distinct('cbbebi', 3))

/**
 * Longest Substring with Same Letters after Replacement (hard)
 *
 * Given a string with lowercase letters only, if you are allowed to
 * replace no more than ‘k’ letters with any letter, find the length of the longest substring having the same letters after replacement.
 *
 * Input: String="aabccbb", k=2
 * Output: 5
 * Explanation: Replace the two 'c' with 'b' to have a longest repeating substring "bbbbb".
 *
 * Input: String="abbcb", k=1
 * Output: 4
 * Explanation: Replace the 'c' with 'b' to have a longest repeating substring "bbbb".
 *
 * Input: String="abccde", k=1
 * Output: 3
 * Explanation: Replace the 'b' or 'd' with 'c' to have the longest repeating substring "ccc".
 */

/**
 * Time Complexity: O(N), N = str.length
 * Space Complexity: O(1), input is letters => O(26) => O(1)
 */
function length_of_longest_substring(str, k) {
  let maxLength = 0
  let maxRepeatLetterCount = 0
  let frequencyMap = {}

  for (let start = 0, end = 0; end < str.length; end++) {
    const rightChar = str[end]

    if (!frequencyMap[rightChar]) {
      frequencyMap[rightChar] = 0
    }
    frequencyMap[rightChar] += 1

    maxRepeatLetterCount = Math.max(
      maxRepeatLetterCount,
      frequencyMap[rightChar]
    )

    if (end - start + 1 - maxRepeatLetterCount > k) {
      const leftChar = str[start]
      frequencyMap[leftChar] -= 1
      start += 1
    }

    maxLength = Math.max(maxLength, end - start + 1)
  }

  return maxLength
}

console.log(length_of_longest_substring('aabccbb', 2))
console.log(length_of_longest_substring('abbcb', 1))
console.log(length_of_longest_substring('abccde', 1))
console.log(length_of_longest_substring('aabccbbccxyzwabcd', 2))

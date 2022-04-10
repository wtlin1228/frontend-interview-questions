/**
 * 159. Longest Substring with At Most Two Distinct Characters
 * https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/
 *
 * Given a string s, return the length of the longest substring that contains at most two distinct characters.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "eceba"
 * Output: 3
 * Explanation: The substring is "ece" which its length is 3.
 *
 *
 *
 * Example 2:
 *
 * Input: s = "ccaabbb"
 * Output: 5
 * Explanation: The substring is "aabbb" which its length is 5.
 *
 *
 * Constraints:
 *
 * 1 <= s.length <= 105
 * s consists of English letters.
 */

/**
 * I use a two pointers approach.
 *
 * Time Complexity: O(n), where n = s.length
 * Space Complexity: O(1)
 *
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
  let left = 0
  let right = 0
  const visitedCharMap = {}
  let distinctCharCount = 0

  let result = 0

  while (right < s.length) {
    // Move right pointer 1 step right.
    const toBeAdd = s[right]

    if (visitedCharMap[toBeAdd]) {
      visitedCharMap[toBeAdd] += 1
    } else {
      distinctCharCount += 1
      visitedCharMap[toBeAdd] = 1
    }

    right += 1

    // Keep moving left pointer 1 step right.
    while (distinctCharCount > 2) {
      const toBeRemove = s[left]

      visitedCharMap[toBeRemove] -= 1

      if (visitedCharMap[toBeRemove] === 0) {
        distinctCharCount -= 1
      }

      left += 1
    }

    // Track the longest substring with at most two distinct characters.
    if (distinctCharCount <= 2 && right - left > result) {
      result = right - left
    }
  }

  return result
}

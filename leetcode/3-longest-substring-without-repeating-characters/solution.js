/**
 * 3. Longest Substring Without Repeating Characters
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *
 *
 * Given a string s, find the length of the longest substring without repeating characters.
 *
 * Example 1:
 *
 * Input: s = "abcabcbb"
 * Output: 3
 * Explanation: The answer is "abc", with the length of 3.
 * Example 2:
 *
 * Input: s = "bbbbb"
 * Output: 1
 * Explanation: The answer is "b", with the length of 1.
 * Example 3:
 *
 * Input: s = "pwwkew"
 * Output: 3
 * Explanation: The answer is "wke", with the length of 3.
 * Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.
 *
 *
 * Constraints:
 *
 * 0 <= s.length <= 5 * 104
 * s consists of English letters, digits, symbols and spaces.
 */

/**
 * Time Complexity: O(n), n = s.length
 * Space Complexity: O(n), n = s.length
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  if (s.length < 2) {
    return s.length
  }

  const set = new Set()
  let result = 0

  for (let right = 0, left = 0; right < s.length; right++) {
    const currentChar = s[right]

    while (set.has(currentChar)) {
      set.delete(s[left])
      left += 1
    }

    set.add(currentChar)
    result = Math.max(result, right - left + 1)
  }

  return result
}

console.log(lengthOfLongestSubstring('')) // 0
console.log(lengthOfLongestSubstring('a')) // 1
console.log(lengthOfLongestSubstring('aa')) // 1
console.log(lengthOfLongestSubstring('ab')) // 2
console.log(lengthOfLongestSubstring('abca')) // 3
console.log(lengthOfLongestSubstring('aaaa')) // 1
console.log(lengthOfLongestSubstring('abcab')) // 3

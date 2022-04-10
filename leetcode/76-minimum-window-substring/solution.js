/**
 * 76. Minimum Window Substring
 * https://leetcode.com/problems/minimum-window-substring/
 *
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
 *
 * The testcases will be generated such that the answer is unique.
 *
 * A substring is a contiguous sequence of characters within the string.
 *
 *
 *
 * Example 1:
 *
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
 *
 *
 *
 * Example 2:
 *
 * Input: s = "a", t = "a"
 * Output: "a"
 * Explanation: The entire string s is the minimum window.
 *
 *
 *
 * Example 3:
 *
 * Input: s = "a", t = "aa"
 * Output: ""
 * Explanation: Both 'a's from t must be included in the window.
 * Since the largest window of s only has one 'a', return empty string.
 *
 *
 * Constraints:
 *
 * m == s.length
 * n == t.length
 * 1 <= m, n <= 105
 * s and t consist of uppercase and lowercase English letters.
 *
 *
 * Follow up: Could you find an algorithm that runs in O(m + n) time?
 */

const buildLookupMap = (o) =>
  o.split('').reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1
    } else {
      acc[curr] = 1
    }
    return acc
  }, {})

/**
 * It's a two pointer approach. I use left and right pointers to maintain a window.
 * And keep track of the matched char inside this window by `inWindowMap` and `inWindowMatches`.
 *
 * Time Complexity: O(m + n), where m = s.length and n = t.length
 * Space Complexity: O(n), where n = t.length
 *
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (s.length < t.length) {
    return ''
  }

  const lookupMap = buildLookupMap(t)
  let left = 0
  let right = 0

  const inWindowMap = {}
  let inWindowMatches = 0

  let findMatchOnce = false
  let matchLeft
  let matchRight

  while (right < s.length) {
    const charToAdd = s[right]
    if (lookupMap[charToAdd]) {
      inWindowMap[charToAdd] = inWindowMap[charToAdd]
        ? inWindowMap[charToAdd] + 1
        : 1
      if (inWindowMap[charToAdd] <= lookupMap[charToAdd]) {
        inWindowMatches += 1
      }
    }
    right += 1

    while (inWindowMatches === t.length) {
      const shouldUpdateRange = matchRight - matchLeft > right - left
      if (!findMatchOnce || shouldUpdateRange) {
        findMatchOnce = true
        matchLeft = left
        matchRight = right
      }
      const charToRemove = s[left]
      if (lookupMap[charToRemove]) {
        inWindowMap[charToRemove] -= 1
        if (inWindowMap[charToRemove] < lookupMap[charToRemove]) {
          inWindowMatches -= 1
        }
      }
      left += 1
    }
  }

  return findMatchOnce ? s.slice(matchLeft, matchRight) : ''
}

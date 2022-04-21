/**
 * 20. Valid Parentheses
 * https://leetcode.com/problems/valid-parentheses/
 *
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 *
 * An input string is valid if:
 *
 * Open brackets must be closed by the same type of brackets.
 * Open brackets must be closed in the correct order.
 *
 *
 * Example 1:
 *
 * Input: s = "()"
 * Output: true
 *
 *
 * Example 2:
 *
 * Input: s = "()[]{}"
 * Output: true
 *
 *
 * Example 3:
 *
 * Input: s = "(]"
 * Output: false
 *
 *
 * Constraints:
 *
 * 1 <= s.length <= 10^4
 * s consists of parentheses only '()[]{}'.
 */

/**
 * Time Complexity: O(N), where N = s.length
 * Space Complexity: O(N), where N = s.length
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = []
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case '(':
      case '[':
      case '{':
        stack.push(s[i])
        break
      case ')':
        if (stack.pop() !== '(') {
          return false
        }
        break
      case ']':
        if (stack.pop() !== '[') {
          return false
        }
        break
      case '}':
        if (stack.pop() !== '{') {
          return false
        }
        break
    }
  }

  return stack.length === 0
}

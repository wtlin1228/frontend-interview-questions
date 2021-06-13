/**
 * https://leetcode.com/problems/one-edit-distance/
 *
 * An edit between two strings is one of the following changes.
 *
 * + Add a character
 * + Delete a character
 * + Change a character
 *
 * Given two string s1 and s2, find if s1 can be converted to s2 with
 * exactly one edit. Expected time complexity is O(m+n) where m and n
 * are lengths of two strings.
 *
 *
 * Examples:
 *
 * Input:  s1 = "geeks", s2 = "geek"
 * Output: yes
 * Number of edits is 1
 *
 * Input:  s1 = "geeks", s2 = "geeks"
 * Output: no
 * Number of edits is 0
 *
 * Input:  s1 = "geaks", s2 = "geeks"
 * Output: yes
 * Number of edits is 1
 *
 * Input:  s1 = "peaks", s2 = "geeks"
 * Output: no
 * Number of edits is 2
 */

/**
 * Time Complexity: O(n), n = s1 length
 * Space Complexity: O(1)
 */
function isEditDistanceOne(s1, s2) {
  if (s1 === s2) {
    return false
  }

  if (Math.abs(s1.length - s2.length) > 1) {
    return false
  }

  if (s1.length === 0 || s2.length === 0) {
    return true
  }

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      return (
        isAddChar(s1, s2, i + 1) ||
        isDeleteChar(s1, s2, i + 1) ||
        isChangeChar(s1, s2, i + 1)
      )
    }
  }

  return false
}

function isAddChar(s1, s2, idx) {
  if (s1.length + 1 !== s2.length) {
    return false
  }

  for (let i = idx; i < s1.length; i++) {
    if (s1[i] !== s2[i + 1]) {
      return false
    }
  }

  return true
}
function isDeleteChar(s1, s2, idx) {
  if (s1.length - 1 !== s2.length) {
    return false
  }

  for (let i = idx; i < s1.length; i++) {
    if (s1[i] !== s2[i - 1]) {
      return false
    }
  }

  return true
}
function isChangeChar(s1, s2, idx) {
  if (s1.length !== s2.length) {
    return false
  }

  for (let i = idx; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      return false
    }
  }

  return true
}

console.log(isEditDistanceOne('foo', 'foo') === false)
console.log(isEditDistanceOne('foo', 'foooooo') === false)
console.log(isEditDistanceOne('geeks', 'geek') === true)
console.log(isEditDistanceOne('geeks', 'geeks') === false)
console.log(isEditDistanceOne('geaks', 'geeks') === true)
console.log(isEditDistanceOne('peaks', 'geeks') === false)
console.log(isEditDistanceOne('', 'a') === true)
console.log(isEditDistanceOne('', '') === false)
console.log(isEditDistanceOne('', 'aa') === false)
console.log(isEditDistanceOne('aaabaaab', 'aaaaaab') === true)

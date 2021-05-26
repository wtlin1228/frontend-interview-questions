/**
 * https://leetcode.com/problems/decode-string/
 *
 * Given an encoded string, return its decoded string.
 *
 *
 * Example 1:
 *
 * Input: s = "3[a]2[bc]"
 * Output: "aaabcbc"
 *
 *
 * Example 2:
 *
 * Input: s = "3[a2[c]]"
 * Output: "accaccacc"
 *
 *
 * Example 3:
 *
 * Input: s = "2[abc]3[cd]ef"
 * Output: "abcabccdcdcdef"
 *
 *
 * Example 4:
 *
 * Input: s = "abc3[cd]xyz"
 * Output: "abccdcdcdxyz"
 */

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
  const isNumber = (n) => /[0-9]+/.test(n)

  // prefix + d + [X] + Y
  function F(s) {
    // console.log(`s = ${s}`)
    if (s.length === 0) return ''

    // prefix
    let i = 0
    let prefix = ''
    while (i < s.length && !isNumber(s[i])) {
      prefix += s[i]
      i++
    }

    // console.log(`prefix = ${prefix}`)

    // d
    let d = ''
    while (isNumber(s[i])) {
      d += s[i]
      i += 1
    }
    d = Number(d)

    // console.log(`d = ${d}`)

    if (d === 0) {
      return prefix
    }

    // X
    let openBrackets = 1
    let j = i + 1
    while (openBrackets !== 0) {
      if (s[j] === '[') openBrackets += 1
      if (s[j] === ']') openBrackets -= 1
      j += 1
    }
    const X = s.slice(i + 1, j - 1)

    // console.log(`X = ${X}`)

    // Y
    const Y = s.slice(j)
    // console.log(`Y = ${Y}`)

    return prefix + Array.from({ length: d }, () => F(X)).join('') + F(Y)
  }

  return F(s)
}

console.log(decodeString('3[a]2[bc]'), 'aaabcbc' === decodeString('3[a]2[bc]'))
console.log(decodeString('3[a2[c]]'), 'accaccacc' === decodeString('3[a2[c]]'))
console.log(
  decodeString('2[abc]3[cd]ef'),
  'abcabccdcdcdef' === decodeString('2[abc]3[cd]ef')
)
console.log(
  decodeString('abc3[cd]xyz'),
  'abccdcdcdxyz' === decodeString('abc3[cd]xyz')
)

console.log(decodeString('aaabbb3[xyz]ccc'))

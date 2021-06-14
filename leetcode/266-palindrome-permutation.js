/**
 * https://leetcode.com/problems/palindrome-permutation/
 *
 * Given a string, determine if a permutation of the string could form a palindrome.
 *
 *
 * Example 1:
 *
 * Input: "code"
 * Output: false
 * Example 2:
 *
 * Input: "aab"
 * Output: true
 * Example 3:
 *
 * Input: "carerac"
 * Output: true
 *
 *
 * Hint:
 *
 * + Consider the palindromes of odd vs even length. What difference do you notice?
 *
 * + Count the frequency of each character.
 *
 * + If each character occurs even number of times, then it must be a palindrome.
 *   How about character which occurs odd number of times?
 */

/**
 * Time Complexity: O(n), n = s.length
 * Space Complexity: O(m), m = number of distinct characters in s
 */
function palindromePermutation(s) {
  const frequencyMap = {}

  for (let x of s.split('')) {
    if (!frequencyMap[x]) {
      frequencyMap[x] = 1
    } else {
      frequencyMap[x] += 1
    }
  }

  let oddCount = 0
  Object.values(frequencyMap).forEach((frequency) => {
    if (frequency % 2 !== 0) {
      oddCount += 1
    }
  })

  return oddCount < 2
}

console.log(palindromePermutation('') === true)
console.log(palindromePermutation('a') === true)
console.log(palindromePermutation('aa') === true)
console.log(palindromePermutation('aabbccdd') === true)
console.log(palindromePermutation('aabbccdde') === true)
console.log(palindromePermutation('aabbccddeee') === true)
console.log(palindromePermutation('aabbccddeeeee') === true)

console.log(palindromePermutation('ab') === false)
console.log(palindromePermutation('abc') === false)
console.log(palindromePermutation('aabc') === false)
console.log(palindromePermutation('aabbccddfg') === false)
console.log(palindromePermutation('aabbccddefff') === false)
console.log(palindromePermutation('aabbccddeeefff') === false)
console.log(palindromePermutation('aabbccddeeeeefff') === false)

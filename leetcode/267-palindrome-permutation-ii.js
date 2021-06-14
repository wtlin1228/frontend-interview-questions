/**
 * https://leetcode.com/problems/palindrome-permutation-ii/
 *
 * Given a string s, return all the palindromic permutations (without duplicates)
 * of it. Return an empty list if no palindromic permutation could be form.
 *
 *
 * Example 1:
 *
 * Input: "aabb"
 * Output: ["abba", "baab"]
 *
 *
 * Example 2:
 *
 * Input: "abc"
 * Output: []
 *
 *
 * Hint:
 *
 * + If a palindromic permutation exists, we just need to generate the first half of
 *   the string.
 *
 * + To generate all distinct permutations of a (half of) string, use a similar
 *   approach from: Permutations II or Next Permutation.
 */

/**
 * Time Complexity: O(n * n!), n = s.length
 * Space Complexity: O(m), m = number of distinct characters in s
 */
function palindromePermutationII(s) {
  if (s === '') {
    return ['']
  }

  // 1. build frequencyMap
  const frequencyMap = {}
  for (let x of s.split('')) {
    if (!frequencyMap[x]) {
      frequencyMap[x] = 1
    } else {
      frequencyMap[x] += 1
    }
  }

  // 2. prepare array for generating permutation
  //    early return if can't generate permutation
  const evenCharArr = []
  let oddChars = ''

  const frequencyPairs = Object.entries(frequencyMap)
  for (let i = 0; i < frequencyPairs.length; i++) {
    const [char, frequency] = frequencyPairs[i]

    if (frequency % 2 !== 0) {
      if (oddChars.length !== 0) {
        return []
      }
      oddChars = Array(frequency).fill(char).join('')
    } else {
      for (let i = 0; i < frequency / 2; i++) {
        evenCharArr.push(char)
      }
    }
  }

  // 3. generate permutation
  const halfSubsets = permuteUnique(evenCharArr)

  if (halfSubsets.length === 0 && oddChars.length !== 0) {
    return [oddChars]
  }

  // 4. combine with odd character
  const result = halfSubsets.map((halfSubset) => {
    const reversedHalfSubset = [...halfSubset].reverse()
    if (oddChars.length === 0) {
      return halfSubset.join('') + reversedHalfSubset.join('')
    } else {
      return halfSubset.join('') + oddChars + reversedHalfSubset.join('')
    }
  })

  return result
}

/**
 * Time Complexity: O(n * n!), n = nums.length
 * Space Complexity: O(n * n!), n = nums.length
 */
var permuteUnique = function (nums) {
  if (nums.length === 0) {
    return []
  }

  const result = [[nums[0]]]

  for (let i = 1; i < nums.length; i++) {
    const currentLayerCount = result.length
    const lookupTable = {}
    for (let j = 0; j < currentLayerCount; j++) {
      const subset = result.shift()
      // console.log(`inserting ${nums[i]} into ${subset}`)
      for (let k = 0; k <= subset.length; k++) {
        const copiedSubset = [...subset]
        copiedSubset.splice(k, 0, nums[i])
        // console.log(`new subset: ${copiedSubset}`)
        if (!lookupTable[copiedSubset.join('')]) {
          lookupTable[copiedSubset.join('')] = 1
          result.push(copiedSubset)
        }
      }
    }
  }

  return result
}

console.log(palindromePermutationII('a'))
console.log(palindromePermutationII('ab'))
console.log(palindromePermutationII('abaaa'))
console.log(palindromePermutationII('abbbaaaccccdd'))
console.log(palindromePermutationII(''))
console.log(palindromePermutationII('aabb'))
console.log(palindromePermutationII('abc'))

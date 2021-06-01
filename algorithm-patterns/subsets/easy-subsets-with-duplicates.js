/**
 * Subsets With Duplicates (easy)
 *
 * Given a set of numbers that might contain duplicates, find all of its distinct subsets.
 *
 * Example 1:
 *
 * Input: [1, 3, 3]
 * Output: [], [1], [3], [1,3], [3,3], [1,3,3]
 *
 *
 * Example 2:
 *
 * Input: [1, 5, 3, 3]
 * Output: [], [1], [5], [3], [1,5], [1,3], [5,3], [1,5,3], [3,3], [1,3,3], [3,3,5], [1,5,3,3]
 */

/**
 * ------ My Strategy ------
 * 1. Sort the nums first because I want the items with same value placed together.
 * 2. If 'next number' is a new value, copy all subsets.
 *    Else, only copy the previous pushed subsets.
 * 3. Add 'next number' to each copied subset and push them into subsets.
 */

/**
 * Time Complexity: O(N * 2 ^ N)
 * Space Complexity: O(N * 2 ^ N)
 */
const find_subsets = function (nums) {
  // 1. Sort the nums first because I want the items with same value placed together.
  nums.sort((a, b) => a - b)

  let subsets = [[]]
  let startIndex = 0
  let endIndex = 0

  for (let i = 0; i < nums.length; i++) {
    // 2. If 'next number' is a new value, copy all subsets.
    startIndex = 0
    // 2. Else, only copy the previous pushed subsets.
    if (i > 0 && nums[i] === nums[i - 1]) {
      startIndex = endIndex
    }
    endIndex = subsets.length

    for (let j = startIndex; j < endIndex; j++) {
      // 3. Add 'next number' to each copied subset and push them into subsets.
      let set = subsets[j].slice(0)
      set.push(nums[i])
      subsets.push(set)
    }
  }

  return subsets
}

console.log('Here is the list of subsets: ')
let result = find_subsets([1, 3, 3])
result.forEach((subset) => {
  console.log(subset)
})

console.log('Here is the list of subsets: ')
result = find_subsets([1, 5, 3, 3])
result.forEach((subset) => {
  console.log(subset)
})

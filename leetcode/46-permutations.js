/**
 * https://leetcode.com/problems/permutations/
 *
 * Given an array nums of distinct integers, return all the
 * possible permutations. You can return the answer in any order.
 *
 *
 * Example 1:
 *
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 * Example 2:
 *
 * Input: nums = [0,1]
 * Output: [[0,1],[1,0]]
 *
 *
 * Example 3:
 *
 * Input: nums = [1]
 * Output: [[1]]
 *
 *
 * Constraints:
 *
 * + 1 <= nums.length <= 6
 * + -10 <= nums[i] <= 10
 * + All the integers of nums are unique.
 */

/**
 * Time Complexity: O(n * n!), n = nums.length
 * Space Complexity: O(n * n!), n = nums.length
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  if (nums.length < 2) {
    return [...nums]
  }

  const result = [[nums[0]]]

  for (let i = 1; i < nums.length; i++) {
    const currentLayerCount = result.length
    for (let j = 0; j < currentLayerCount; j++) {
      const subset = result.shift()
      // console.log(`inserting ${nums[i]} into ${subset}`)
      for (let k = 0; k <= subset.length; k++) {
        const copiedSubset = [...subset]
        copiedSubset.splice(k, 0, nums[i])
        // console.log(`new subset: ${copiedSubset}`)
        result.push(copiedSubset)
      }
    }
  }

  return result
}

console.log(permute([]))
console.log(permute([1]))
console.log(permute([0, 1]))
console.log(permute([1, 2, 3]))

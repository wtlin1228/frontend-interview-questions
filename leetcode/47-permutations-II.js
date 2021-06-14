/**
 * https://leetcode.com/problems/permutations-ii/
 *
 * Given a collection of numbers, nums, that might contain duplicates,
 * return all possible unique permutations in any order.
 *
 *
 * Example 1:
 *
 * Input: nums = [1,1,2]
 * Output:
 * [[1,1,2],
 *  [1,2,1],
 *  [2,1,1]]
 *
 *
 * Example 2:
 *
 * Input: nums = [1,2,3]
 * Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 *
 * Constraints:
 * 1 <= nums.length <= 8
 * -10 <= nums[i] <= 10
 */

/**
 * Time Complexity: O(n * n!), n = nums.length
 * Space Complexity: O(n * n!), n = nums.length
 * @param {number[]} nums
 * @return {number[][]}
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

console.log(permuteUnique([]))
console.log(permuteUnique([1]))
console.log(permuteUnique([1, 1]))
console.log(permuteUnique([1, 1, 1]))
console.log(permuteUnique([1, 1, 2]))
console.log(permuteUnique([1, 2, 3]))
console.log(permuteUnique([1, 2, 2, 3, 3]))

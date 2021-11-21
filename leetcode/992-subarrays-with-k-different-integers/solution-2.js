/**
 * 992. Subarrays with K Different Integers
 *
 * https://leetcode.com/problems/subarrays-with-k-different-integers/
 *
 *
 * Given an integer array nums and an integer k, return the number of good subarrays of nums.
 *
 * A good array is an array where the number of different integers in that array is exactly k.
 *
 * For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
 * A subarray is a contiguous part of an array.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [1,2,1,2,3], k = 2
 * Output: 7
 * Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
 * Example 2:
 *
 * Input: nums = [1,2,1,3,4], k = 3
 * Output: 3
 * Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 2 * 104
 * 1 <= nums[i], k <= nums.length
 */

const { SizeMap } = require('./sizeMap')
/**
 * nums = [1, 2, 1, 2, 3], k = 2
 *                                               = right - left + 1
 *             left  right  map                  count              subArrays
 *             0     0      { 1: 1 }             1                  [1,]
 *             0     1      { 1: 1, 2: 1 }       2                  [1, 2], [, 2]
 *             0     2      { 1: 2, 2: 1 }       3                  [1, 2, 1], [, 2, 1], [, , 1]
 *             0     3      { 1: 2, 2: 2 }       4                  [1, 2, 1, 2], [, 2, 1, 2], [, , 1, 2], [, , , 2]
 *             0     4      { 1: 2, 2: 2, 3: 1 } 0
 * inner loop  1     4      { 1: 1, 2: 2, 3: 1 } 0
 * inner loop  2     4      { 1: 1, 2: 1, 3: 1 } 0
 * inner loop  3     4      { 2: 1, 3: 1 }       2                  [2, 3], [, 3]
 *             3     5
 *                   ^ terminated here, since 5 > nums.length
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const subarraysWithAtMostKDistinct = (nums, k) => {
  const map = new SizeMap()
  let left = 0
  let right = 0
  map.add(nums[right])

  let result = 0
  while (right < nums.length) {
    if (map.getSize() <= k) {
      result += right - left + 1
    }

    right += 1
    map.add(nums[right])

    while (map.getSize() > k) {
      map.remove(nums[left])
      left += 1
    }
  }

  return result
}

/**
 * Time Complexity: O(n), where n = nums.length
 * Space Complexity: O(n), where n = nums.length
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysWithKDistinct = function (nums, k) {
  return (
    subarraysWithAtMostKDistinct(nums, k) -
    subarraysWithAtMostKDistinct(nums, k - 1)
  )
}

console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)) // 7

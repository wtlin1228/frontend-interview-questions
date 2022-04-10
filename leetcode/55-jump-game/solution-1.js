/**
 * 55. Jump Game
 * https://leetcode.com/problems/jump-game/
 *
 * You are given an integer array nums. You are initially positioned at the array's first index,
 * and each element in the array represents your maximum jump length at that position.
 *
 * Return true if you can reach the last index, or false otherwise.
 *
 *
 * Example 1:
 *
 * Input: nums = [2,3,1,1,4]
 * Output: true
 * Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
 *
 *
 * Example 2:
 *
 * Input: nums = [3,2,1,0,4]
 * Output: false
 * Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0,
 * which makes it impossible to reach the last index.
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 104
 * 0 <= nums[i] <= 105
 */

/**
 * This is a dynamic programming bottom-up approach.
 * Time Complexity: O(n^2), where n = nums.length
 * Space Complexity: O(n), where n = nums.length
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  const length = nums.length
  const lastIndex = length - 1

  const memo = Array.from({ length }, () => null)
  memo[length - 1] = true

  for (let i = length - 2; i >= 0; i--) {
    const allowedSteps = nums[i]

    if (i + allowedSteps >= lastIndex) {
      memo[i] = true
      continue
    }

    for (let step = 1; step <= allowedSteps; step++) {
      if (memo[i + step] === true) {
        memo[i] = true
        continue
      }
    }
  }

  return memo[0] === true
}

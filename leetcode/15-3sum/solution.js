/**
 * https://leetcode.com/problems/3sum/
 *
 *
 * Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.
 *
 * Notice that the solution set must not contain duplicate triplets.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [-1,0,1,2,-1,-4]
 * Output: [[-1,-1,2],[-1,0,1]]
 * Example 2:
 *
 * Input: nums = []
 * Output: []
 * Example 3:
 *
 * Input: nums = [0]
 * Output: []
 *
 *
 * Constraints:
 *
 * 0 <= nums.length <= 3000
 * -105 <= nums[i] <= 105
 */

/**
 * Time Complexity: O(N ^ 2), where N = nums.length
 * Space Complexity: O(N), where N = nums.length
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) {
    return []
  }

  // Time Complexity: O(N * logN), where N = nums.length
  // Space Complexity: O(N), where N = nums.length
  nums.sort((a, b) => a - b)

  let result = []
  // Time Complexity: O(N ^ 2), where N = nums.length
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue
    }
    // Time Complexity: O(N), where N = nums.length
    searchPair({
      targetSum: nums[i] * -1,
      left: i + 1,
      nums,
      result,
    })
  }
  return result
}

/**
 * Time Complexity: O(N), where N = nums.length
 * Space Complexity: O(1)
 */
searchPair = ({ targetSum, left, nums, result }) => {
  let right = nums.length - 1
  while (left < right) {
    if (nums[left] + nums[right] === targetSum) {
      result.push([targetSum * -1, nums[left], nums[right]])

      while (nums[left] === nums[left + 1]) {
        left += 1
      }
      while (nums[right] === nums[right - 1]) {
        right -= 1
      }
    }

    if (nums[left] + nums[right] < targetSum) {
      left += 1
    } else {
      right -= 1
    }

    if (targetSum > 0 && nums[right] < 0) {
      return
    }
    if (targetSum < 0 && nums[left] > 0) {
      return
    }
  }
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
console.log(threeSum([-4, -1, -1, 0, 0, 0, 0, 1, 2, 3, 4]))

/**
 * 163. Missing Ranges
 * https://leetcode.com/problems/missing-ranges/
 *
 * You are given an inclusive range [lower, upper] and a sorted unique integer array nums, where all elements are in the inclusive range.
 *
 * A number x is considered missing if x is in the range [lower, upper] and x is not in nums.
 *
 * Return the smallest sorted list of ranges that cover every missing number exactly. That is, no element of nums is in any of the ranges, and each missing number is in one of the ranges.
 *
 * Each range [a,b] in the list should be output as:
 *
 * "a->b" if a != b
 * "a" if a == b
 *
 *
 * Example 1:
 *
 * Input: nums = [0,1,3,50,75], lower = 0, upper = 99
 * Output: ["2","4->49","51->74","76->99"]
 * Explanation: The ranges are:
 * [2,2] --> "2"
 * [4,49] --> "4->49"
 * [51,74] --> "51->74"
 * [76,99] --> "76->99"
 *
 *
 *
 * Example 2:
 *
 * Input: nums = [-1], lower = -1, upper = -1
 * Output: []
 * Explanation: There are no missing ranges since there are no missing numbers.
 *
 *
 * Constraints:
 *
 * -109 <= lower <= upper <= 109
 * 0 <= nums.length <= 100
 * lower <= nums[i] <= upper
 * All the values of nums are unique.
 */

var outputFormatter = function (ranges) {
  return ranges.reduce((acc, curr) => {
    const [lower, upper] = curr
    if (lower === upper) {
      acc.push(`${lower}`)
    } else {
      acc.push(`${lower}->${upper}`)
    }
    return acc
  }, [])
}

/**
 * Time Complexity: O(n), where n = nums.length
 * Space Complexity: O(1)
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
var findMissingRanges = function (nums, lower, upper) {
  if (nums.length === 0) {
    return outputFormatter([[lower, upper]])
  }

  if (lower === upper) {
    return []
  }

  const isStartFromLower = nums[0] === lower
  const isEndAtUpper = nums[nums.length - 1] === upper

  const result = []

  if (!isStartFromLower) {
    result.push([lower, nums[0] - 1])
  }

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] !== nums[i + 1] - 1) {
      result.push([nums[i] + 1, nums[i + 1] - 1])
    }
  }

  if (!isEndAtUpper) {
    result.push([nums[nums.length - 1] + 1, upper])
  }

  return outputFormatter(result)
}

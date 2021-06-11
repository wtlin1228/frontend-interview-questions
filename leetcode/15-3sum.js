/**
 * https://leetcode.com/problems/3sum/
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums, k) {
  if (nums.length < 3) {
    return []
  }

  // Time Complexity: O(N * log(N))
  // Space Complexity: O(N)
  nums.sort((a, b) => a - b)

  const result = []
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      // skip same element to avoid duplicate triplets
      continue
    }
    twoSum(result, nums, i + 1, nums[i] * -1)
  }

  return result
}

var twoSum = function (result, nums, left, k) {
  console.log(`find two sum `)
  let right = nums.length - 1
  while (left < right) {
    const sum = nums[left] + nums[right]

    if (sum === k) {
      result.push([k * -1, nums[left], nums[right]])

      while (nums[left] === nums[left + 1]) {
        left += 1
      }

      while (nums[right] === nums[right - 1]) {
        right -= 1
      }
    }

    if (sum < k) {
      left += 1
    } else {
      right -= 1
    }
  }
}

console.log(threeSum([-2, 0, 1, 1, 2]))
console.log(threeSum([-1, 0, 1, 2, -1, -4]))

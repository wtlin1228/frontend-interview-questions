/**
 * https://leetcode.com/problems/house-robber/
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  function robRecursive(nums, start) {
    if (start > nums.length - 1) {
      return 0
    }

    return Math.max(
      nums[start] + robRecursive(nums, start + 2),
      robRecursive(nums, start + 1)
    )
  }

  return Math.max(robRecursive(nums, 0), robRecursive(nums, 1))
}

var robWithCache = function (nums) {
  const cache = {}

  function robRecursive(nums, start) {
    if (start > nums.length - 1) {
      return 0
    }

    if (!cache[start]) {
      cache[start] = Math.max(
        nums[start] + robRecursive(nums, start + 2),
        robRecursive(nums, start + 1)
      )
    }

    return cache[start]
  }

  return Math.max(robRecursive(nums, 0), robRecursive(nums, 1))
}

var robWithDynamicProgramming = function (nums) {
  const l = nums.length

  if (l === 0) {
    return 0
  }
  if (l === 1) {
    return nums[l - 1]
  }
  if (l === 2) {
    return Math.max(nums[l - 1], nums[l - 2])
  }
  if (l === 3) {
    return Math.max(nums[l - 1] + nums[l - 3], nums[l - 2])
  }

  const profit = Array.from({ length: l }, () => 0)
  profit[l - 1] = nums[l - 1]
  profit[l - 2] = nums[l - 2]
  profit[l - 3] = nums[l - 3] + profit[l - 1]

  for (let i = l - 4; i >= 0; i--) {
    profit[i] = nums[i] + Math.max(profit[i + 2], profit[i + 3])
  }

  return Math.max(profit[0], profit[1])
}

console.log(robWithDynamicProgramming([1, 2, 3, 1]))
console.log(robWithDynamicProgramming([2, 7, 9, 3, 1]))
console.log(robWithDynamicProgramming([]))
console.log(
  robWithDynamicProgramming([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ])
)

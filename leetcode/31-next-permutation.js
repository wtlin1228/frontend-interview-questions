/**
 * https://leetcode.com/problems/next-permutation/
 *
 * Implement next permutation, which rearranges numbers into the
 * lexicographically next greater permutation of numbers.
 *
 * If such an arrangement is not possible, it must rearrange it as
 * the lowest possible order (i.e., sorted in ascending order).
 *
 * The replacement must be in place and use only constant extra memory.
 *
 *
 * Example 1:
 *
 * Input: nums = [1,2,3]
 * Output: [1,3,2]
 *
 *
 * Example 2:
 *
 * Input: nums = [3,2,1]
 * Output: [1,2,3]
 *
 *
 * Example 3:
 *
 * Input: nums = [1,1,5]
 * Output: [1,5,1]
 *
 *
 * Example 4:
 *
 * Input: nums = [1]
 * Output: [1]
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 100
 * 0 <= nums[i] <= 100
 */

/**
 * Time Complexity: O(n), n = nums.length
 * Space Complexity: O(1)
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums) {
  const n = nums.length

  if (n === 1) {
    // console.log(nums)
    return
  }

  if (nums[n - 1] > nums[n - 2]) {
    swap(nums, n - 1, n - 2)
    // console.log(nums)
    return
  }

  // 1. find the pivot from right to left
  let pivotIdx = 0
  for (let i = n - 2; i > 0; i--) {
    if (nums[i - 1] < nums[i] && nums[i] >= nums[i + 1]) {
      pivotIdx = i
      break
    }
  }

  // console.log(`find pivot nums[${pivotIdx}]: ${nums[pivotIdx]}`)

  // nums is descending
  if (pivotIdx === 0) {
    for (let i = 0; i < n / 2; i++) {
      swap(nums, i, n - 1 - i)
    }
    // console.log(nums)
    return
  }

  // 2. find the one just larger then pivot from [pivotIdx, n - 1]
  const pivotLeftValue = nums[pivotIdx - 1]
  let justLargerIdx = pivotIdx
  for (let i = pivotIdx; i < n; i++) {
    if (nums[i] > pivotLeftValue && nums[i] <= nums[justLargerIdx]) {
      justLargerIdx = i
    }
  }

  // console.log(`find just larger nums[${justLargerIdx}]: ${nums[justLargerIdx]}`)

  // 3. swap nums[pivotIdx - 1] and nums[justLargerIdx]
  swap(nums, pivotIdx - 1, justLargerIdx)
  // console.log(nums)

  // 4. sort nums from [pivotIdx, n - 1]
  for (let i = 0; i < (n - 1 - pivotIdx) / 2; i++) {
    swap(nums, pivotIdx + i, n - 1 - i)
  }
  // console.log(nums)
}

function swap(nums, i, j) {
  ;[nums[i], nums[j]] = [nums[j], nums[i]]
}

// console.log(nextPermutation([1, 2, 3]))
// console.log(nextPermutation([3, 2, 1]))
// console.log(nextPermutation([1, 1, 5]))
// console.log(nextPermutation([1]))

// console.log(nextPermutation([1, 3, 2]))
// console.log(nextPermutation([1, 5, 8, 2]))
// console.log(nextPermutation([1, 5, 8, 6]))
// console.log(nextPermutation([1, 5, 8, 6, 7, 4, 3]))
// console.log(nextPermutation([1, 5, 8, 6, 7, 4, 9]))

// console.log(nextPermutation([4, 2, 4, 4, 3]))
console.log(nextPermutation([2, 3, 1, 3, 3]))

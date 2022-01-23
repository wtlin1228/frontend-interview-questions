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
  const swapByIndex = (idx1, idx2) => {
    ;[nums[idx1], nums[idx2]] = [nums[idx2], nums[idx1]]
  }

  const reverseToEndFromIdx = (idx) => {
    let left = idx
    let right = length - 1
    while (left < right) {
      swapByIndex(left, right)
      left += 1
      right -= 1
    }
  }

  const length = nums.length

  // if nums[n-1] < nums[n] -> swap them, then done!
  // ex: 1234 -> 1243
  if (nums[length - 2] < nums[length - 1]) {
    swapByIndex(length - 2, length - 1)
    return nums
  }

  // find the first turn
  let pivotIdx
  for (let i = length - 2; i > 0; i--) {
    if (nums[i - 1] < nums[i]) {
      pivotIdx = i
      break
    }
  }

  // no pivot found means that nums is the biggest number
  // ex: 3210 -> 1023
  if (!pivotIdx) {
    // ex: 4321 -> 1234
    reverseToEndFromIdx(0)
    if (nums[0] !== 0) {
      return nums
    }

    // ex: 3210 -> 0123 -> 1023
    for (let i = 0; i < length; i++) {
      if (nums[i] !== '0') {
        swapByIndex(0, i)
      }
    }
    return nums
  }

  // swap the smallest number that is greater than nums[pivot - 1]
  // in the range of [pivotIdx, length - 1]
  // ex: ...698765 -> ...798665
  //        ^  ^
  for (let i = length - 1; i >= pivotIdx; i--) {
    if (nums[i] > nums[pivotIdx - 1]) {
      swapByIndex(i, pivotIdx - 1)
      break
    }
  }

  // reverse [pivotIdx, length - 1]
  // ex: ...798665 -> ...756689
  reverseToEndFromIdx(pivotIdx)
  return nums
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

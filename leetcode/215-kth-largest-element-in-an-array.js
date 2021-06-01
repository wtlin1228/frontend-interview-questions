/**
 * https://leetcode.com/problems/kth-largest-element-in-an-array/
 */

/**
 * First idea:
 *
 * Use a max-heap. Because building a heap cost O(n).
 * And pop the max value from the heap cost O(log n).
 * So, the worst case is O(n log n) if input k is equal to the length of number array.
 *
 *
 * Second idea:
 *
 * Sort the number array first. It's O(n log n) time.
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => b - a)
  return nums[k - 1]
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2))

console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))

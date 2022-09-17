// Time complexity: O(n), where n = nums.length
// Space complexity: O(n), where n = nums.length

/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var validSubarraySize = function (nums, threshold) {
  // first find the largest subarray such that the given index is the minimum element
  const lookup = nums.map((n) => ({ prev: -1, next: nums.length }))

  let stack = [] // element interface would be { index, value }

  // find next smallest index for each index
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    while (stack.length > 0 && stack[stack.length - 1].value > n) {
      const entry = stack.pop()
      lookup[entry.index].next = i
    }
    stack.push({ index: i, value: n })
  }

  // find prev smallest index for each index
  stack = []
  for (let i = nums.length - 1; i >= 0; i--) {
    const n = nums[i]
    while (stack.length > 0 && stack[stack.length - 1].value > n) {
      const entry = stack.pop()
      lookup[entry.index].prev = i
    }
    stack.push({ index: i, value: n })
  }

  for (let i = 0; i < lookup.length; i++) {
    const largestSubarrayLength = lookup[i].next - lookup[i].prev - 1
    if (nums[i] > threshold / largestSubarrayLength) {
      return largestSubarrayLength
    }
  }

  return -1
}

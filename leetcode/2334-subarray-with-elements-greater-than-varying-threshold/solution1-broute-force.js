// Time complexity: O(n^3), where n = nums.length
// Space complexity: O(1)

/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var validSubarraySize = function (nums, threshold) {
  const l = nums.length
  for (let i = 0; i < l; i++) {
    for (let j = i; j < l; j++) {
      const subarraySize = j - i + 1
      const currentThreshold = threshold / subarraySize
      let pass = true
      for (let k = i; k <= j; k++) {
        if (nums[k] <= currentThreshold) {
          pass = false
          break
        }
      }
      if (pass) {
        return subarraySize
      }
    }
  }
  return -1
}

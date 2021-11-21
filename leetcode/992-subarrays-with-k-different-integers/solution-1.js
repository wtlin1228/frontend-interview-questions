/**
 * 992. Subarrays with K Different Integers
 *
 * https://leetcode.com/problems/subarrays-with-k-different-integers/
 *
 *
 * Given an integer array nums and an integer k, return the number of good subarrays of nums.
 *
 * A good array is an array where the number of different integers in that array is exactly k.
 *
 * For example, [1,2,3,1,2] has 3 different integers: 1, 2, and 3.
 * A subarray is a contiguous part of an array.
 *
 *
 *
 * Example 1:
 *
 * Input: nums = [1,2,1,2,3], k = 2
 * Output: 7
 * Explanation: Subarrays formed with exactly 2 different integers: [1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2], [1,2,1,2]
 * Example 2:
 *
 * Input: nums = [1,2,1,3,4], k = 3
 * Output: 3
 * Explanation: Subarrays formed with exactly 3 different integers: [1,2,1,3], [2,1,3], [1,3,4].
 *
 *
 * Constraints:
 *
 * 1 <= nums.length <= 2 * 104
 * 1 <= nums[i], k <= nums.length
 */

// Here is my first solution, which is an O(N^2) algorithm.
const { SizeMap } = require('./sizeMap')
const getSubArrays = ({ map, nums, left, right }) => {
  // console.log(
  //   `start calculating sub array count...   left=${left}, right=${right}`
  // )
  const subMap = new SizeMap()
  let count = 1

  while (true) {
    const currentNum = nums[left]
    subMap.add(currentNum)
    if (map.getValue(currentNum) - subMap.getValue(currentNum) === 0) {
      return count
    }

    left += 1
    count += 1
  }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraysWithKDistinct = function (nums, k) {
  if (nums.length < k || nums.length === 0) {
    return 0
  }

  let result = k === 1 ? 1 : 0
  let left = 0
  let right = 0
  const map = new SizeMap()
  map.add(nums[right])

  while (true) {
    if (map.getSize() > k) {
      // increase left
      map.remove(nums[left])
      left += 1
    } else {
      // increase right
      right += 1

      if (!nums[right]) {
        return result
      }

      map.add(nums[right])
    }

    if (map.getSize() === k) {
      // check sub arrays
      result += getSubArrays({ map, nums, left, right })
    }
  }
}

console.log(subarraysWithKDistinct([1, 2, 1, 2, 3], 2)) // 7

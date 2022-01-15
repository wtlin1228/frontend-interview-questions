/**
 * https://leetcode.com/problems/container-with-most-water/
 *
 * You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).
 *
 * Find two lines that together with the x-axis form a container, such that the container contains the most water.
 *
 * Return the maximum amount of water a container can store.
 *
 * Notice that you may not slant the container.
 *
 *
 * Example 1:
 *
 * Input: height = [1,8,6,2,5,4,8,3,7]
 * Output: 49
 * Explanation:
 * The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7].
 * In this case, the max area of water (blue section) the container can contain is 49.
 *
 *
 * Example 2:
 *
 * Input: height = [1,1]
 * Output: 1
 *
 *
 * Constraints:
 *
 * n == height.length
 * 2 <= n <= 105
 * 0 <= height[i] <= 104
 */

/**
 * Time Complexity: O(n), where n = height.length
 * Space Complexity: O(1)
 *
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let right = height.length - 1
  let left = 0
  let max = Math.min(height[left], height[right]) * (right - left)

  while (left < right) {
    if (height[left] > height[right]) {
      right -= 1
    } else {
      left += 1
    }
    max = Math.max(max, Math.min(height[left], height[right]) * (right - left))
  }

  return max
}

// This is a Two Pointers algorithm
// I can even reduce it to only 1 iteration
//
// Complexity Analysis
// - Time Complexity: O(n), where n = height.length
// - Space Complexity: O(1)

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const size = height.length
  let left = 0
  let right = size - 1
  let leftMax = 0
  let rightMax = 0

  let result = 0
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] > leftMax) {
        leftMax = height[left]
      }
      result += leftMax - height[left]
      left += 1
    } else {
      if (height[right] > rightMax) {
        rightMax = height[right]
      }
      result += rightMax - height[right]
      right -= 1
    }
  }

  return result
}

// 6
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))

// 9
console.log(trap([4, 2, 0, 3, 2, 5]))

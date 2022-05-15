// This is a Brute force algorithm.
// I find the left max and right max in each step.
//
// Complexity Analysis
// - Time Complexity: O(n^2), where n = height.length
// - Space Complexity: O(1)

const findMaxInRange = (arr, range) => {
  const [left, right] = range
  if (left < 0 || right > arr.length - 1 || left > right) {
    return 0
  }

  let max = 0
  for (let i = left; i <= right; i++) {
    if (arr[i] > max) {
      max = arr[i]
    }
  }

  return max
}

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  return height.reduce((acc, curr, currIdx) => {
    const leftMax = findMaxInRange(height, [0, currIdx - 1])
    const rightMax = findMaxInRange(height, [currIdx + 1, height.length - 1])
    const bound = Math.min(leftMax, rightMax)
    if (bound > curr) {
      acc += bound - curr
    }
    return acc
  }, 0)
}

// 6
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]))

// 9
console.log(trap([4, 2, 0, 3, 2, 5]))

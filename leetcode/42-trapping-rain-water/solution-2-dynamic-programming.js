// This is a Dynamic Programming algorithm.
// I calculate the max arrays left bound and right bound depending on the last bound.
//
// Complexity Analysis
// - Time Complexity: O(n), where n = height.length
// - Space Complexity: O(n), where n = height.length

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const size = height.length
  let leftMaxArr = Array.from({ length: size })
  let rightMaxArr = Array.from({ length: size })

  leftMaxArr[0] = height[0]
  rightMaxArr[size - 1] = height[size - 1]
  for (let i = 1; i < size; i++) {
    leftMaxArr[i] = Math.max(leftMaxArr[i - 1], height[i])

    const iRight = size - i - 1
    rightMaxArr[iRight] = Math.max(rightMaxArr[iRight + 1], height[iRight])
  }

  return height.reduce((acc, curr, currIdx) => {
    const bound = Math.min(leftMaxArr[currIdx], rightMaxArr[currIdx])
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

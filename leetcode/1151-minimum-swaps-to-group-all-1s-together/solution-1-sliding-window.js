// Sliding Window Approach:
//   1. calculate the total 1's -> S
//   2. create a window with size S
//   3. slide the window form left to right till the end,
//      and trace the minium number of holes in the window.
//   4. the minium holes is our answer
//
// Complexity Analysis
// - Time Complexity: O(n), where n = data.length
// - Space Complexity: O(1)

/**
 * @param {number[]} data
 * @return {number}
 */
var minSwaps = function (data) {
  let totalOnes = 0
  for (let i = 0; i < data.length; i++) {
    if (data[i] === 1) {
      totalOnes += 1
    }
  }

  let holes = 0
  for (let i = 0; i < totalOnes; i++) {
    if (data[i] === 0) {
      holes += 1
    }
  }

  let min = holes
  for (let i = totalOnes; i < data.length; i++) {
    if (data[i] === 0) {
      holes += 1
    }

    if (data[i - totalOnes] === 0) {
      holes -= 1
    }

    if (holes < min) {
      min = holes
    }
  }

  return min
}

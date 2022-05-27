// Sliding Window Approach:
//   1. get the index array of one's
//   2. create two windows - left and right
//   3. slide the window form left to right until the right window reach the end of one's array
//   4. keep tracking the minium of right window - left window
//
// Complexity Analysis
// - Time Complexity: O(n), where n = nums.length
// - Space Complexity: O(n), where n = nums.length

function sumFrom1ToN(n) {
  return ((1 + n) * n) / 2
}

function rangeSumOfArray(arr, start, end) {
  let result = 0
  for (let i = start; i < end; i++) {
    result += arr[i]
  }
  return result
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minMoves = function (nums, k) {
  const ones = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      ones.push(i)
    }
  }

  const isOdd = k % 2 === 1

  if (isOdd) {
    // k is odd, ex: 3
    // size of left window = size of right window
    const r = (k - 1) / 2
    let leftSum = rangeSumOfArray(ones, 0, r)
    let rightSum = rangeSumOfArray(ones, r + 1, r + 1 + r)
    let minRightMinusLeft = rightSum - leftSum

    for (let i = r + 1; i + r < ones.length; i++) {
      leftSum = leftSum - ones[i - (r + 1)] + ones[i - 1]
      rightSum = rightSum - ones[i] + ones[i + r]

      const temp = rightSum - leftSum
      if (temp < minRightMinusLeft) {
        minRightMinusLeft = temp
      }
    }

    return minRightMinusLeft - sumFrom1ToN(r) * 2
  }

  // k is even, ex: 4
  // ones: [0, 1, 5, 6, 8, 9, 14, 16]
  // in initialization:
  //   the chosen target is [1]
  //   left window  = [0], window size = 1
  //   right window = [5, 6], window size = 2
  const leftR = k / 2 - 1
  const rightR = leftR + 1
  let leftSum = rangeSumOfArray(ones, 0, leftR)
  let rightSum = rangeSumOfArray(ones, leftR + 1, leftR + 1 + rightR)
  // minus additional target since right window is greater than left window
  let minRightMinusLeft = rightSum - leftSum - ones[leftR]

  for (let i = leftR + 1; i + rightR < ones.length; i++) {
    // in the first iteration:
    //   the chosen target is [5]
    //   left window  = [1]
    //   right window = [6, 8]
    leftSum = leftSum - ones[i - (leftR + 1)] + ones[i - 1]
    rightSum = rightSum - ones[i] + ones[i + rightR]

    // minus additional target since right window is greater than left window
    const temp = rightSum - leftSum - ones[i]
    if (temp < minRightMinusLeft) {
      minRightMinusLeft = temp
    }
  }

  return minRightMinusLeft - sumFrom1ToN(leftR) - sumFrom1ToN(rightR)
}

console.log(minMoves([1, 0, 0, 1, 0, 1], 2))
console.log(minMoves([1, 0, 0, 0, 0, 0, 1, 1], 3))
console.log(minMoves([1, 1, 0, 1], 2))

console.log(
  minMoves(
    [
      1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1,
    ],
    9
  )
) // 6

console.log(
  minMoves(
    [
      1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0,
      0, 1, 1,
    ],
    8
  )
) // 4

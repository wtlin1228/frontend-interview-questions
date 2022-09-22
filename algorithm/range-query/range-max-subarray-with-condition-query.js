// Find the max subarray for each index which the index is the biggest/smallest number in the subarray

const getMaxSubarrayRangeWhereIdxHasSmallestValue = (nums) => {
  const ranges = Array.from({ length: nums.length }).map(() => ({
    left: 0,
    right: nums.length - 1,
  }))

  let stack = []

  // find right boundary for each index
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    while (stack.length > 0 && stack[stack.length - 1].value > n) {
      const { index } = stack.pop()
      ranges[index].right = i - 1
    }
    stack.push({ value: n, index: i })
  }

  stack = []

  // find left boundary for each index
  for (let i = nums.length - 1; i >= 0; i--) {
    const n = nums[i]
    while (stack.length > 0 && stack[stack.length - 1].value > n) {
      const { index } = stack.pop()
      ranges[index].left = i + 1
    }
    stack.push({ value: n, index: i })
  }

  return ranges
}

console.log(
  getMaxSubarrayRangeWhereIdxHasSmallestValue([1, 2, 3, 4, 5, 4, 3, 2, 1])
)

const getMaxSubarrayRangeWhereIdxHasLargestValue = (nums) => {
  const ranges = Array.from({ length: nums.length }).map(() => ({
    left: 0,
    right: nums.length - 1,
  }))

  let stack = []

  // find right boundary for each index
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    while (stack.length > 0 && stack[stack.length - 1].value < n) {
      const { index } = stack.pop()
      ranges[index].right = i - 1
    }
    stack.push({ value: n, index: i })
  }

  stack = []

  // find left boundary for each index
  for (let i = nums.length - 1; i >= 0; i--) {
    const n = nums[i]
    while (stack.length > 0 && stack[stack.length - 1].value < n) {
      const { index } = stack.pop()
      ranges[index].left = i + 1
    }
    stack.push({ value: n, index: i })
  }

  return ranges
}

console.log(
  getMaxSubarrayRangeWhereIdxHasLargestValue([1, 2, 3, 4, 5, 4, 3, 2, 1])
)

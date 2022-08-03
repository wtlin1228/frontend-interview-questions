# Two Pointers

Useful in:

1. sorted arrays
2. sorted LinkedLists

## remove duplicates from sorted array

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let replacePtr = 1

  for (let currentPtr = 1; currentPtr < nums.length; currentPtr++) {
    if (nums[replacePtr - 1] !== nums[currentPtr]) {
      nums[replacePtr] = nums[currentPtr]
      replacePtr += 1
    }
  }

  return replacePtr
}
```

## squares of a sorted array

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let leftPtr = 0
  let rightPtr = nums.length - 1

  const result = []
  while (result.length !== nums.length) {
    const leftSquare = nums[leftPtr] * nums[leftPtr]
    const rightSquare = nums[rightPtr] * nums[rightPtr]
    if (leftSquare > rightSquare) {
      result.push(leftSquare)
      leftPtr += 1
    } else {
      result.push(rightSquare)
      rightPtr -= 1
    }
  }

  return result.reverse()
}
```

## triplet sum to zero

```js
const searchPairs = (nums, targetSum, left, triplets) => {
  let right = nums.length - 1
  while (left < right) {
    const currentSum = nums[left] + nums[right]
    if (currentSum === targetSum) {
      // found the triplet
      triplets.push([-targetSum, nums[left], nums[right]])
      left += 1
      right -= 1
      while (left < right && nums[left] === nums[left - 1]) {
        left += 1 // skip same element to avoid duplicate triplets
      }
      while (left < right && nums[right] === nums[right + 1]) {
        right -= 1 // skip same element to avoid duplicate triplets
      }
    } else if (targetSum > currentSum) {
      left += 1 // we need a pair with a bigger sum
    } else {
      right -= 1 // we need a pair with a smaller sum
    }
  }
}

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  nums.sort((a, b) => a - b)
  const triplets = []

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) {
      // skip same element to avoid duplicate triplets
      continue
    }
    searchPairs(nums, -nums[i], i + 1, triplets)
  }

  return triplets
}
```

## triplet sum close to target

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)

  let smallestDifference = Infinity
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const currentSum = nums[i] + nums[left] + nums[right]

      if (Math.abs(target - currentSum) < Math.abs(smallestDifference)) {
        smallestDifference = target - currentSum
      }

      if (currentSum < target) {
        left += 1
      } else {
        right -= 1
      }
    }
  }

  return target - smallestDifference
}
```

## triplets with smaller sum

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumSmaller = function (nums, target) {
  nums.sort((a, b) => a - b)

  let result = 0

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1
    let right = nums.length - 1

    while (left < right) {
      const currentSum = nums[i] + nums[left] + nums[right]

      if (currentSum < target) {
        // ex: [1,2,3,4,5,6], target = 8
        //     1 + 6 = 7 -> smaller than target
        //     [1,2], [1,3], [1,4], [1,5] are also valid pairs
        //     so, we have "right - left" valid pairs
        result += right - left
        left += 1
      } else {
        right -= 1
      }
    }
  }

  return result
}
```

## sub-arrays with product less than a target

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
  if (k <= 1) {
    return 0
  }

  let result = 0
  let left = 0
  let product = 1
  for (let right = 0; right < nums.length; right++) {
    product *= nums[right]

    while (product >= k) {
      product /= nums[left]
      left += 1
    }

    result += right - left + 1
  }

  return result
}
```

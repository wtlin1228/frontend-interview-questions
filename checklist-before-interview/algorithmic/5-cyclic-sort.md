# Cyclic Sort

You are given an unsorted array

- containing n numbers taken from the range 1 to n
- The array can have duplicates,

which means that some numbers will be missing. Find all the missing numbers.

## cyclic sort

Time Complexity: O(n), where n = nums.length
Space Complexity: O(1), in-place

The worst-case will be O(n) + O(n - 1) which is asymptotically equivalent to O(n).

```js
const cyclicSort = function (nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i] - 1
    if (nums[i] !== nums[j]) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]] // swap
    } else {
      i += 1
    }
  }
  return nums
}

console.log(cyclicSort([3, 1, 5, 4, 2]))
console.log(cyclicSort([2, 6, 4, 3, 1, 5]))
console.log(cyclicSort([1, 5, 6, 4, 3, 2]))
```

## find the missing number

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i]
    if (j < nums.length && nums[i] !== nums[j]) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    } else {
      i += 1
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i) {
      return i
    }
  }

  return nums.length
}

console.log(missingNumber([3, 0, 1]))
console.log(missingNumber([0, 1]))
console.log(missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1]))
```

## find all missing numbers

```js
const findMissingNumbers = function (nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i] - 1
    if (nums[i] !== nums[j]) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    } else {
      i += 1
    }
  }

  const missingNumbers = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      missingNumbers.push(i + 1)
    }
  }
  return missingNumbers
}

console.log(findMissingNumbers([2, 3, 1, 8, 2, 3, 5, 1]))
console.log(findMissingNumbers([2, 4, 1, 2]))
console.log(findMissingNumbers([2, 3, 2, 1]))
```

## find the duplicate number

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i] - 1
    if (nums[i] !== nums[j]) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    } else {
      i += 1
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      return nums[i]
    }
  }
}

console.log(findDuplicate([1, 3, 4, 2, 2]))
console.log(findDuplicate([3, 1, 3, 4, 2]))
```

## find all duplicate numbers

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findAllDuplicate = function (nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i] - 1
    if (nums[i] !== nums[j]) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    } else {
      i += 1
    }
  }

  const duplicateNumbers = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      duplicateNumbers.push(nums[i])
    }
  }
  return duplicateNumbers
}

console.log(findAllDuplicate([1, 3, 4, 2, 2]))
console.log(findAllDuplicate([3, 1, 3, 4, 2]))
```

## find the smallest missing positive number

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findFirstSmallestMissingPositive = function (nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i] - 1
    if (nums[i] > 0 && nums[j] !== undefined && nums[i] !== nums[j]) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    } else {
      i += 1
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      return i + 1
    }
  }

  return nums.length + 1
}

console.log(findFirstSmallestMissingPositive([-3, 1, 5, 4, 2]))
console.log(findFirstSmallestMissingPositive([3, -2, 0, 1, 2]))
console.log(findFirstSmallestMissingPositive([3, 2, 5, 1]))
```

## find the first K missing positive numbers

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var findFirstKMissingPositive = function (nums) {
  let i = 0
  while (i < nums.length) {
    const j = nums[i] - 1
    if (nums[i] > 0 && nums[j] !== undefined && nums[i] !== nums[j]) {
      ;[nums[i], nums[j]] = [nums[j], nums[i]]
    } else {
      i += 1
    }
  }

  const missingNumbers = []
  const extraNumbers = new Set()
  for (i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      missingNumbers.push(i + 1)
      extraNumbers.add(nums[i])
    }
    if (missingNumbers.length === k) {
      return missingNumbers
    }
  }

  // add the remaining missing numbers
  i = 1
  while (missingNumbers.length < k) {
    const candidateNumber = i + nums.length
    // ignore if the array contains the candidate number
    if (!extraNumbers.has(candidateNumber)) {
      missingNumbers.push(candidateNumber)
    }
    i += 1
  }
  return missingNumbers
}

console.log(findFirstKMissingPositive([3, -1, 4, 5, 5], 3))
console.log(findFirstKMissingPositive([2, 3, 4], 3))
console.log(findFirstKMissingPositive([-2, -3, 4], 2))
```

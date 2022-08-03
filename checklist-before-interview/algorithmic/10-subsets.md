# Subsets

From a given set of elements

- Find permutations
- Find combinations

## subsets

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = []

  // start by adding the empty subset
  result.push([])

  nums.forEach((n) => {
    // we will take all existing subsets and insert the current number in them to create new subsets
    const size = result.length
    for (let i = 0; i < size; i++) {
      const set = result[i]
      // create a new subset from the existing subset and insert the current element to it
      const newSet = [...set, n]
      result.push(newSet)
    }
  })

  return result
}
```

## subsets with duplicates

```js
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b)

  const result = []

  // start by adding the empty subset
  result.push([])

  let startIndex = 0
  let endIndex = 0

  for (let i = 0; i < nums.length; i++) {
    startIndex = 0
    // if current and the previous elements are same, create new subsets only from the subsets
    // added in the previous step
    if (i > 0 && nums[i] === nums[i - 1]) {
      startIndex = endIndex + 1
    }

    endIndex = result.length - 1
    for (j = startIndex; j < endIndex + 1; j++) {
      // create a new subset from the existing subset and add the current element to it
      const set1 = result[j].slice(0)
      set1.push(nums[i])
      result.push(set1)
    }
  }

  return result
}
```

## permutations

```js

```

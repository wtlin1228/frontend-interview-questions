# Modified Binary Search

find a certain element within a given sorted

- Array
- LinkedList
- Matrix

## binary search

Note: nums must be sorted ascending

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let start = 0
  let end = nums.length - 1
  while (start <= end) {
    // calculate the middle of the current range
    mid = Math.floor(start + (end - start) / 2)

    if (target < nums[mid]) {
      end = mid - 1 // the 'target' can be in the first half
    } else if (target > nums[mid]) {
      start = mid + 1 // the 'target' can be in the second half
    } else {
      // found the target
      return mid
    }
  }

  return -1 // element not found
}
```

## ceiling of a number

Note: nums must be sorted ascending

```js
function searchCeilingOfANumber(nums, target) {
  if (target > nums[nums.length - 1]) {
    // if the 'target' is bigger than the biggest element
    return -1
  }

  let start = 0
  let end = nums.length - 1
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (target < nums[mid]) {
      end = mid - 1
    } else if (target > nums[mid]) {
      start = mid + 1
    } else {
      // found the target
      return mid
    }
  }
  // since the loop is running until 'start <= end', so at the end of the while loop, 'start === end+1'
  // we are not able to find the element in the given array, so the next big number will be nums[start]
  return start
}

console.log(searchCeilingOfANumber([4, 6, 10], 6)) // 1 -> 6
console.log(searchCeilingOfANumber([1, 3, 8, 10, 15], 12)) // 4 -> 15
console.log(searchCeilingOfANumber([4, 6, 10], 17)) // -1 -> undefined
console.log(searchCeilingOfANumber([4, 6, 10], -1)) // 0 -> 4
```

## flooring of a number

Note: nums must be sorted ascending

```js
function searchCeilingOfANumber(nums, target) {
  if (target < nums[0]) {
    // if the 'target' is smaller than the smallest element
    return -1
  }

  let start = 0
  let end = nums.length - 1
  while (start <= end) {
    mid = Math.floor(start + (end - start) / 2)
    if (target < nums[mid]) {
      end = mid - 1
    } else if (target > nums[mid]) {
      start = mid + 1
    } else {
      // found the target
      return mid
    }
  }
  // since the loop is running until 'start <= end', so at the end of the while loop, 'start === end+1'
  // we are not able to find the element in the given array, so the next smaller number will be nums[start] - 1
  return start - 1
}

console.log(searchCeilingOfANumber([4, 6, 10], 6)) // 1 -> 6
console.log(searchCeilingOfANumber([1, 3, 8, 10, 15], 12)) // 3 -> 10
console.log(searchCeilingOfANumber([4, 6, 10], 17)) // 2 -> 10
console.log(searchCeilingOfANumber([4, 6, 10], -1)) // -1 -> undefined
```

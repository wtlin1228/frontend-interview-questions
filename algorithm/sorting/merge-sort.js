/**
 * Merge sort
 *
 * Time Complexity: O(N * lg(N))
 * Space Complexity: O(N), need auxiliary space to store the merged arrays
 */

function mergeSort(arr) {
  function mergeSortRecursive(arr) {
    if (arr.length <= 1) {
      return arr
    }

    const middle = Math.floor(arr.length / 2)
    const leftArr = mergeSortRecursive(arr.slice(0, middle))
    const rightArr = mergeSortRecursive(arr.slice(middle))

    return twoFingerMerge(leftArr, rightArr)
  }

  function twoFingerMerge(leftArr, rightArr) {
    let result = []

    let leftFinger = 0
    let rightFinger = 0

    while (leftFinger < leftArr.length || rightFinger < rightArr.length) {
      const left = leftArr[leftFinger]
      const right = rightArr[rightFinger]

      if (leftFinger === leftArr.length) {
        result.push(right)
        rightFinger += 1
      } else if (rightFinger === rightArr.length) {
        result.push(left)
        leftFinger += 1
      } else {
        if (left < right) {
          result.push(left)
          leftFinger += 1
        } else {
          result.push(right)
          rightFinger += 1
        }
      }
    }

    return result
  }

  return mergeSortRecursive(arr)
}

console.log(mergeSort([1, 5, 4, 2, 3, 6, 7]))
console.log(mergeSort([1, -5, 4, 2, -3, 6, 7]))
console.log(mergeSort([-Infinity, 0, Infinity]))
console.log(mergeSort([Infinity, 0, Infinity]))
console.log(mergeSort([Infinity, -Infinity]))
console.log(mergeSort([]))

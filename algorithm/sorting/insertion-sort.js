/**
 * Insertion sort
 *
 * Time Complexity: O(N^2)
 * Space Complexity: O(1), because it's in-place replacement
 */

function insertionSort(arr) {
  for (let key = 1; key < arr.length; key++) {
    for (let i = key; i > 0; i--) {
      if (arr[i - 1] < arr[i]) {
        break
      }

      ;[arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]
    }
  }

  return arr
}

console.log(insertionSort([1, 5, 4, 2, 3, 6, 7]))
console.log(insertionSort([1, -5, 4, 2, -3, 6, 7]))
console.log(insertionSort([]))

const canPartition = function (numArr) {
  const sum = numArr.reduce((arr, curr) => arr + curr, 0)

  if (sum % 2 !== 0) {
    return false
  }

  function canPartitionRecursive(numArr, capacity, currentIndex) {
    if (capacity === 0) {
      return true
    }

    if (capacity <= 0 || currentIndex >= numArr.length) {
      return false
    }

    if (numArr[currentIndex] <= capacity) {
      if (
        canPartitionRecursive(
          numArr,
          capacity - numArr[currentIndex],
          currentIndex + 1
        )
      ) {
        return true
      }
    }

    return canPartitionRecursive(numArr, capacity, currentIndex + 1)
  }

  return canPartitionRecursive(numArr, sum / 2, 0)
}

console.log(`Can ${[1, 2, 3, 4]} partition? ---> ${canPartition([1, 2, 3, 4])}`)
console.log(
  `Can ${[1, 1, 3, 4, 7]} partition? ---> ${canPartition([1, 1, 3, 4, 7])}`
)
console.log(`Can ${[1, 1, 1]} partition? ---> ${canPartition([1, 1, 1])}`)

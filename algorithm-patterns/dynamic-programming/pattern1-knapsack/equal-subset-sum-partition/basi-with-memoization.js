const canPartition = function (numArr) {
  const dp = Array.from({ length: numArr.length }, () => [])

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

    if (typeof dp[currentIndex][capacity] !== 'undefined') {
      return dp[currentIndex][capacity]
    }

    if (numArr[currentIndex] <= capacity) {
      dp[currentIndex][capacity] = canPartitionRecursive(
        numArr,
        capacity - numArr[currentIndex],
        currentIndex + 1
      )

      if (dp[currentIndex][capacity]) {
        return true
      }
    }

    dp[currentIndex][capacity] = canPartitionRecursive(
      numArr,
      capacity,
      currentIndex + 1
    )
    return dp[currentIndex][capacity]
  }

  return canPartitionRecursive(numArr, sum / 2, 0)
}

console.log(`Can ${[1, 2, 3, 4]} partition? ---> ${canPartition([1, 2, 3, 4])}`)
console.log(
  `Can ${[1, 1, 3, 4, 7]} partition? ---> ${canPartition([1, 1, 3, 4, 7])}`
)
console.log(`Can ${[1, 1, 1]} partition? ---> ${canPartition([1, 1, 1])}`)

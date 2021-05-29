const canPartition = function (numArr, sum) {
  const total = numArr.reduce((arr, curr) => arr + curr, 0)
  if (total < sum) return false

  function canPartitionRecursive(numArr, remaining, currentIndex) {
    if (remaining === 0) return true

    if (remaining < 0 || currentIndex >= numArr.length) return false

    const currentNum = numArr[currentIndex]

    let result1 = false
    if (currentNum <= remaining) {
      result1 = canPartitionRecursive(
        numArr,
        remaining - currentNum,
        currentIndex + 1
      )
    }

    const result2 = canPartitionRecursive(numArr, remaining, currentIndex + 1)

    return result1 || result2
  }

  return canPartitionRecursive(numArr, sum, 0)
}

console.log(
  `Can [1, 2, 3, 4] be partitioning to 6: ---> ${canPartition([1, 2, 3, 4], 6)}`
)
console.log(
  `Can [1, 2, 7, 1, 5] be partitioning to 10: ---> ${canPartition(
    [1, 2, 7, 1, 5],
    10
  )}`
)
console.log(
  `Can [1, 3, 4, 8] be partitioning to 6: ---> ${canPartition([1, 3, 4, 8], 6)}`
)

const canPartition = function (numArr, sum) {
  const total = numArr.reduce((arr, curr) => arr + curr, 0)
  if (total < sum) return false

  const dp = Array.from({ length: numArr.length }, () => [])
  for (let i = 0; i < numArr.length; i++) {
    dp[i][0] = true
  }

  for (let i = 1; i <= sum; i++) {
    dp[0][i] = numArr[0] === i
  }

  for (let i = 1; i < numArr.length; i++) {
    const currentNum = numArr[i]
    for (let j = 1; j <= sum; j++) {
      if (dp[i - 1][j]) {
        dp[i][j] = dp[i - 1][j]
      } else if (currentNum <= j) {
        dp[i][j] = dp[i - 1][j - currentNum]
      } else {
        dp[i][j] = dp[i - 1][j]
      }
    }
  }

  console.table(dp)

  return dp[numArr.length - 1][sum]
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

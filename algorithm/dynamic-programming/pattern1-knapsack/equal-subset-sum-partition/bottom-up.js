const canPartition = function (numArr) {
  const sum = numArr.reduce((arr, curr) => arr + curr, 0)
  if (sum % 2 !== 0) return false

  const target = sum / 2

  const dp = Array.from({ length: numArr.length }, () => [])

  for (let i = 0; i < numArr.length; i++) {
    dp[i][0] = true
  }

  for (let i = 1; i <= target; i++) {
    dp[0][i] = numArr[0] === i
  }

  for (let i = 1; i < numArr.length; i++) {
    const currentNum = numArr[i]
    for (let j = 1; j <= target; j++) {
      dp[i][j] = dp[i - 1][j] || dp[i - 1][j - currentNum]
    }
  }

  return dp[numArr.length - 1][target]
}

console.log(`Can ${[1, 2, 3, 4]} partition? ---> ${canPartition([1, 2, 3, 4])}`)
console.log(
  `Can ${[1, 1, 3, 4, 7]} partition? ---> ${canPartition([1, 1, 3, 4, 7])}`
)
console.log(`Can ${[1, 1, 1]} partition? ---> ${canPartition([1, 1, 1])}`)

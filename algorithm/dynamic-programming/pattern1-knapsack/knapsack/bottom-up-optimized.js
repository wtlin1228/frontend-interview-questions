const solveKnapsack = function (profits, weights, capacity) {
  const n = profits.length

  if (n <= 0 || weights.length <= 0 || capacity <= 0) return 0

  let dp = Array.from({ length: capacity + 1 }, () => 0)
  let previousDp = Array.from({ length: capacity + 1 }, () => 0)

  for (let c = 0; c <= capacity; c++) {
    if (weights[0] <= c) {
      previousDp[c] = profits[0]
    }
  }

  for (let i = 1; i < n; i++) {
    for (let c = 1; c <= capacity; c++) {
      let profit1 = 0
      if (weights[i] <= c) {
        profit1 = profits[i] + previousDp[c - weights[i]]
      }

      const profit2 = previousDp[c]

      dp[c] = Math.max(profit1, profit2)
    }
    previousDp = [...dp]
  }

  return dp[capacity]
}

var profits = [1, 6, 10, 16]
var weights = [1, 2, 3, 5]
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`)
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`)

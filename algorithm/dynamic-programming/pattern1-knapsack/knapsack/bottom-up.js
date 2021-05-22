const solveKnapsack = function (profits, weights, capacity) {
  const n = profits.length

  if (n <= 0 || weights.length <= 0 || capacity <= 0) return 0

  const dp = Array.from({ length: n }, () =>
    Array.from({ length: capacity + 1 }, () => 0)
  )

  for (let i = 0; i < n; i++) {
    dp[i][0] = 0
  }

  for (let c = 0; c <= capacity; c++) {
    if (weights[0] <= c) dp[0][c] = profits[0]
  }

  for (let i = 1; i < n; i++) {
    for (let c = 1; c <= capacity; c++) {
      let profit1 = 0
      if (weights[i] <= c) {
        profit1 = profits[i] + dp[i - 1][c - weights[i]]
      }

      const profit2 = dp[i - 1][c]

      dp[i][c] = Math.max(profit1, profit2)
    }
  }

  // Print the selected items
  let selectedWeights = []
  let totalProfit = dp[weights.length - 1][capacity]
  let remainingCapacity = capacity
  for (let i = weights.length - 1; i > 0; i--) {
    if (totalProfit !== dp[i - 1][remainingCapacity]) {
      selectedWeights.push(weights[i])
      remainingCapacity -= weights[i]
      totalProfit -= profits[i]
    }
  }
  if (totalProfit !== 0) {
    selectedWeights.push(weights[0])
  }
  console.log(selectedWeights)

  return dp[n - 1][capacity]
}

var profits = [1, 6, 10, 16]
var weights = [1, 2, 3, 5]
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`)
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`)

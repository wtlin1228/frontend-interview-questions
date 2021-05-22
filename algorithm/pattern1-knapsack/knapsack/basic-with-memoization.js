const solveKnapsack = function (profits, weights, capacity) {
  const dp = Array.from({ length: profits.length }, () => [])

  function knapsackRecursive(profits, weights, capacity, currentIndex) {
    if (capacity <= 0 || currentIndex >= profits.length) return 0

    if (typeof dp[currentIndex][capacity] !== 'undefined') {
      return dp[currentIndex][capacity]
    }

    let profit1 = 0
    if (weights[currentIndex] <= capacity) {
      profit1 =
        profits[currentIndex] +
        knapsackRecursive(
          profits,
          weights,
          capacity - weights[currentIndex],
          currentIndex + 1
        )
    }

    const profit2 = knapsackRecursive(
      profits,
      weights,
      capacity,
      currentIndex + 1
    )

    dp[currentIndex][capacity] = Math.max(profit1, profit2)
    return dp[currentIndex][capacity]
  }

  return knapsackRecursive(profits, weights, capacity, 0)
}

var profits = [1, 6, 10, 16]
var weights = [1, 2, 3, 5]
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`)
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`)

let solveKnapsack = function (profits, weights, capacity) {
  const sortedIndexArr = profits
    .map((profit, index) => ({
      index,
      unit: profit / weights[index],
    }))
    .sort((a, b) => b.unit - a.unit)
    .map(({ index }) => index)

  let result = 0
  for (let i of sortedIndexArr) {
    while (capacity >= weights[i]) {
      capacity -= weights[i]
      result += profits[i]
    }
  }

  return result
}

var profits = [15, 50, 60, 90]
var weights = [1, 3, 4, 5]
console.log(`Total knapsack profit: ---> ${solveKnapsack(profits, weights, 8)}`)

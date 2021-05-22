# Knapsack

Items: { Apple, Orange, Banana, Melon }
Weights: { 2, 3, 1, 4 }
Profits: { 4, 5, 3, 7 }
Knapsack capacity: 5

A item can only be chosen once. What's the combination that have the highest profit?

## Basic solution

time complexity: `O(2 ^ N)`
space complexity: `O(N)`

## Basic solution with memoization

time complexity: `O(2 ^ N)`
space complexity: `O(N * C)`

## Bottom up

time complexity: `O(N * C)`
space complexity: `O(N * C)`

## Bottom up optimized

time complexity: `O(N * C)`
space complexity: `O(C)`

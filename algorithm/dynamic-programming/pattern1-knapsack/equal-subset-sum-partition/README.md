# Equal Subset Sum Partition

Given a set of positive numbers, find if we can partition it into two subsets such that the sum of elements in both the subsets is equal.

Input: {1, 2, 3, 4}
Output: True
Explanation: The given set can be partitioned into two subsets with equal sum: {1, 4} & {2, 3}

## Basic solution

time complexity: `O(2 ^ N)`
space complexity: `O(N)`

## Basic solution with memoization

time complexity: `O(2 ^ N)`
space complexity: `O(N * C)`

## Bottom up

time complexity: `O(N * C)`
space complexity: `O(N * C)`

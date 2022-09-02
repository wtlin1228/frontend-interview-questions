# 0/1 knapsack

## Partition Equal Subset Sum

https://leetcode.com/problems/partition-equal-subset-sum/

### Approach 1: Brute Force

Time complexity: O(2^n), where n = nums.length
Space complexity: O(n), where n = nums.length, for the call stack

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const dfs = (idx, pack1, pack2) => {
    if (idx === nums.length) {
      return pack1 === pack2
    }

    return (
      dfs(idx + 1, pack1 + nums[idx], pack2) ||
      dfs(idx + 1, pack1, pack2 + nums[idx])
    )
  }

  return dfs(0, 0, 0)
}
```

### Approach 2: Top-Down Dynamic Programming

Time complexity: `O(n * m)`, where n = nums.length, m = sum(nums) / 2
Space complexity: `O(n * m)`, where n = nums.length, m = sum(nums) / 2

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((acc, curr) => acc + curr, 0)

  if (sum % 2 === 1) {
    return false
  }

  const cache = {}
  const dfs = (target, currentIdx) => {
    if (currentIdx === nums.length) {
      return target === 0
    }

    const cacheKey = `${target}-${currentIdx}`
    if (cache[cacheKey]) {
      return cache[cacheKey]
    }

    if (target < 0) {
      cache[cacheKey] = false
      return false
    }

    cache[cacheKey] =
      dfs(target, currentIdx + 1) ||
      dfs(target - nums[currentIdx], currentIdx + 1)

    return cache[cacheKey]
  }

  return dfs(sum / 2, 0)
}
```

### Approach 3: Bottom-Up Dynamic Programming with 2D array

Time complexity: `O(n * m)`, where n = nums.length, m = sum(nums) / 2
Space complexity: `O(n * m)`, where n = nums.length, m = sum(nums) / 2

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((acc, curr) => acc + curr, 0)

  if (sum % 2 === 1) {
    return false
  }

  const n = nums.length
  const target = sum / 2

  // dp[i][j] stands for "can we get sum j from nums[0:i]?"
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(target + 1).fill(false))

  // base case, if subSetSum = 0, we can achieve it by choose nothing
  dp[0][0] = true

  for (let i = 1; i <= n; i++) {
    const curr = nums[i - 1]
    for (let j = 0; j <= target; j++) {
      if (j < curr) {
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - curr]
      }
    }
  }

  return dp[n][target]
}
```

### Approach 4: Bottom-Up Dynamic Programming with 1D array

Time complexity: `O(n * m)`, where n = nums.length, m = sum(nums) / 2
Space complexity: `O(m)`, m = sum(nums) / 2

```js
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  const sum = nums.reduce((acc, curr) => acc + curr, 0)

  if (sum % 2 === 1) {
    return false
  }

  const n = nums.length
  const target = sum / 2

  // dp[j] stands for "can we get sum j from nums[0:i]?"
  let dp = Array(target + 1).fill(false)

  // base case, if subSetSum = 0, we can achieve it by choose nothing
  dp[0] = true

  for (let i = 1; i <= n; i++) {
    const curr = nums[i - 1]
    const nextDp = []
    for (let j = 0; j <= target; j++) {
      if (j < curr) {
        nextDp.push(dp[j])
      } else {
        nextDp.push(dp[j] || dp[j - curr])
      }
    }
    dp = nextDp
  }

  return dp[target]
}
```

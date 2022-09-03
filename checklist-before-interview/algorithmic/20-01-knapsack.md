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

  // dp[j] stands for "can we get sum j from nums[0:i]?", currently i is 0
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

## Ones and Zeroes

https://leetcode.com/problems/ones-and-zeroes/

### Approach 1: Top-Down Dynamic Programming

Time complexity: `O(2^n * l)`, where n = strs.length, l = average length of strs
Space complexity: O(n), where n = strs.length, for the stack call

```js
// O(n), where n = str.length
const getZerosAndOnes = (str) => {
  let zeros = 0
  let ones = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '0') {
      zeros += 1
    } else {
      ones += 1
    }
  }
  return { zeros, ones }
}

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const cache = {}

  const dfs = (strIdx = 0, allowZeros = m, allowOnes = n) => {
    if (strIdx === strs.length) {
      return 0
    }

    const cacheKey = `${strIdx},${allowZeros},${allowOnes}`
    if (cache[cacheKey]) {
      return cache[cacheKey]
    }

    const { zeros, ones } = getZerosAndOnes(strs[strIdx])

    let res
    if (zeros > allowZeros || ones > allowOnes) {
      res = dfs(strIdx + 1, allowZeros, allowOnes)
    } else {
      res = Math.max(
        dfs(strIdx + 1, allowZeros, allowOnes),
        1 + dfs(strIdx + 1, allowZeros - zeros, allowOnes - ones)
      )
    }

    cache[cacheKey] = res
    return cache[cacheKey]
  }

  return dfs()
}
```

### Approach 2: Bottom-Up Dynamic Programming with 3D array

Time complexity: `O(l * m * n)`, where l = strs.length
Space complexity: `O(l * m * n)`, where l = strs.length

```js
// O(n), where n = str.length
const getZerosAndOnes = (str) => {
  let zeros = 0
  let ones = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '0') {
      zeros += 1
    } else {
      ones += 1
    }
  }
  return { zeros, ones }
}

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  // dp[i][j][k] means "how many strings can we have from range strs[0:i] with max zeros j and max ones k"
  const dp = Array(strs.length + 1)
    .fill()
    .map(() =>
      Array(m + 1)
        .fill()
        .map(() => Array(n + 1).fill(0))
    )

  for (let strIdx = 1; strIdx <= strs.length; strIdx++) {
    const { zeros, ones } = getZerosAndOnes(strs[strIdx - 1])
    for (let allowedZeros = 0; allowedZeros <= m; allowedZeros++) {
      for (let allowedOnes = 0; allowedOnes <= n; allowedOnes++) {
        const isCurrentStringAllowed =
          allowedZeros >= zeros && allowedOnes >= ones

        if (isCurrentStringAllowed) {
          dp[strIdx][allowedZeros][allowedOnes] = Math.max(
            1 + dp[strIdx - 1][allowedZeros - zeros][allowedOnes - ones],
            dp[strIdx - 1][allowedZeros][allowedOnes]
          )
        } else {
          dp[strIdx][allowedZeros][allowedOnes] =
            dp[strIdx - 1][allowedZeros][allowedOnes]
        }
      }
    }
  }

  return dp[strs.length][m][n]
}
```

### Approach 2: Bottom-Up Dynamic Programming with two 2D arrays

Time complexity: `O(l * m * n)`, where l = strs.length
Space complexity: `O(m * n)`

```js
// O(n), where n = str.length
const getZerosAndOnes = (str) => {
  let zeros = 0
  let ones = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '0') {
      zeros += 1
    } else {
      ones += 1
    }
  }
  return { zeros, ones }
}

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  let dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0))

  for (let strIdx = 1; strIdx <= strs.length; strIdx++) {
    const nextDp = Array(m + 1)
      .fill()
      .map(() => Array(n + 1).fill(0))

    const { zeros, ones } = getZerosAndOnes(strs[strIdx - 1])

    for (let allowedZeros = 0; allowedZeros <= m; allowedZeros++) {
      for (let allowedOnes = 0; allowedOnes <= n; allowedOnes++) {
        const isCurrentStringAllowed =
          allowedZeros >= zeros && allowedOnes >= ones

        if (isCurrentStringAllowed) {
          nextDp[allowedZeros][allowedOnes] = Math.max(
            1 + dp[allowedZeros - zeros][allowedOnes - ones],
            dp[allowedZeros][allowedOnes]
          )
        } else {
          nextDp[allowedZeros][allowedOnes] = dp[allowedZeros][allowedOnes]
        }
      }
    }

    dp = nextDp
  }

  return dp[m][n]
}
```

### Approach 4: Bottom-Up Dynamic Programming with only one 2D array

Time complexity: `O(l * m * n)`, where l = strs.length
Space complexity: `O(m * n)`

```js
// O(n), where n = str.length
const getZerosAndOnes = (str) => {
  let zeros = 0
  let ones = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '0') {
      zeros += 1
    } else {
      ones += 1
    }
  }
  return { zeros, ones }
}

/**
 * @param {string[]} strs
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var findMaxForm = function (strs, m, n) {
  const dp = Array(m + 1)
    .fill()
    .map(() => Array(n + 1).fill(0))

  for (let strIdx = 1; strIdx <= strs.length; strIdx++) {
    const { zeros, ones } = getZerosAndOnes(strs[strIdx - 1])

    for (let allowedZeros = m; allowedZeros >= zeros; allowedZeros--) {
      for (let allowedOnes = n; allowedOnes >= ones; allowedOnes--) {
        dp[allowedZeros][allowedOnes] = Math.max(
          1 + dp[allowedZeros - zeros][allowedOnes - ones],
          dp[allowedZeros][allowedOnes]
        )
      }
    }
  }

  return dp[m][n]
}
```

## Last Stone Weight II

https://leetcode.com/problems/last-stone-weight-ii/

### Approach 1: Bottom-Up Dynamic Programming with 1D array

Time complexity: `O(n * s)`, where n = stones.length, s = sum of stones
Space complexity: `O(s)`, where s = sum of stones

```js
/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  const totalStoneWeight = stones.reduce((acc, curr) => acc + curr, 0)

  let dp = Array(Math.floor(totalStoneWeight / 2) + 1).fill(false)

  dp[0] = true

  stones.forEach((stone) => {
    const nextDp = []
    for (let i = 0; i < dp.length; i++) {
      if (stone > i) {
        nextDp[i] = dp[i]
      } else {
        nextDp[i] = dp[i] || dp[i - stone]
      }
    }
    dp = nextDp
  })

  for (let i = dp.length - 1; i >= 0; i--) {
    if (dp[i]) {
      return totalStoneWeight - i * 2
    }
  }
}
```

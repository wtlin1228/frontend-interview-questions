# Dynamic Programming

## Where Will the Ball Fall

https://leetcode.com/problems/where-will-the-ball-fall/

1 is "\", can redirect balls

- from top -> right
- from left -> bottom

-1 is "/", can reidrect balls

- from top -> left
- from right -> bottom

```js
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
function findBall(grid) {
  const rowCount = grid.length
  const colCount = grid[0].length

  const dp = build2DArray(rowCount, colCount)

  const result = []

  for (let i = 0; i < colCount; i++) {
    // ball start from the top most position
    let currentPosition = { row: 0, col: i }
    let canThisBallPass = true

    // in order to update the dp
    const path = []

    while (currentPosition.row < rowCount) {
      path.push(currentPosition)

      if (dp[currentPosition.row][currentPosition.col] !== null) {
        canThisBallPass = dp[currentPosition.row][currentPosition.col]
        break
      }

      const [isStuck, nextPosition] = getNextPosition(currentPosition, grid)

      if (isStuck) {
        canThisBallPass = false
        break
      } else {
        currentPosition = nextPosition
      }
    }

    // update dp
    path.forEach((position) => {
      dp[position.row][position.col] = canThisBallPass
    })

    result.push(canThisBallPass ? currentPosition.col : -1)
  }

  return result
}

const build2DArray = (row, col) => {
  return Array(row)
    .fill()
    .map(() => Array(col).fill(null))
}

/**
 * @return {[isStuck, nextPosition]}
 */
const getNextPosition = (currentPosition, grid) => {
  if (grid[currentPosition.row][currentPosition.col] === 1) {
    if (
      currentPosition.col + 1 === grid[0].length || // it's a "\|"
      grid[currentPosition.row][currentPosition.col + 1] === -1 // it's a "\/"
    ) {
      return [true, null]
    }

    return [
      false,
      { row: currentPosition.row + 1, col: currentPosition.col + 1 },
    ]
  }

  if (
    currentPosition.col === 0 || // it's a "|/"
    grid[currentPosition.row][currentPosition.col - 1] === 1 // it's a "\/"
  ) {
    return [true, null]
  }

  return [false, { row: currentPosition.row + 1, col: currentPosition.col - 1 }]
}
```

## Maximum Length of Subarray With Positive Product

https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product/

|          | -1  | 1   | 2   | 3   | -2  | 4   | 5   | -3  |
| -------- | --- | --- | --- | --- | --- | --- | --- | --- |
| positive | 0   | 1   | 2   | 3   | 5   | 6   | 7   | 7   |
| negative | 1   | 2   | 3   | 4   | 4   | 5   | 6   | 8   |

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var getMaxLen = function (nums) {
  let res = 0
  let pos = 0
  let neg = 0
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]

    if (n === 0) {
      // reset
      pos = 0
      neg = 0
    } else if (n > 0) {
      pos += 1
      neg = neg === 0 ? 0 : neg + 1
    } else {
      const temp = neg
      neg = pos + 1
      pos = temp === 0 ? 0 : temp + 1
    }

    res = Math.max(res, pos)
  }

  return res
}
```

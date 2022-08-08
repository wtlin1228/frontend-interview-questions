# Four Boundaries Matrix

## Spiral Matrix

https://leetcode.com/problems/spiral-matrix/

Given an m x n matrix, return all elements of the matrix in spiral order.

```ts
const directions = [
  { row: 0, col: 1 }, // right
  { row: 1, col: 0 }, // bottom
  { row: 0, col: -1 }, // left
  { row: -1, col: 0 }, // top
]

function spiralOrder(matrix: number[][]): number[] {
  const boundary = {
    topRowBound: -1,
    bottomRowBound: matrix.length,
    leftColBound: -1,
    rightColBound: matrix[0].length,
  }

  let currentDir = 0 // start from right direction
  let currentPosition = { row: 0, col: -1 } // start from top-left position

  const result = []
  while (
    boundary.topRowBound !== boundary.bottomRowBound &&
    boundary.leftColBound !== boundary.rightColBound
  ) {
    const nextPosition = getNextPosition(currentPosition, currentDir)

    if (isValidPosition(nextPosition, boundary)) {
      result.push(matrix[nextPosition.row][nextPosition.col])
      currentPosition = nextPosition
    } else {
      // change direction
      currentDir = (currentDir + 1) % 4
      if (currentDir === 0) {
        boundary.leftColBound += 1
      } else if (currentDir === 1) {
        boundary.topRowBound += 1
      } else if (currentDir === 2) {
        boundary.rightColBound -= 1
      } else {
        boundary.bottomRowBound -= 1
      }
    }
  }

  return result
}

const getNextPosition = (currentPosition, direction) => ({
  row: currentPosition.row + directions[direction].row,
  col: currentPosition.col + directions[direction].col,
})

const isValidPosition = (currentPosition, boundary) => {
  if (
    currentPosition.col <= boundary.leftColBound ||
    currentPosition.col >= boundary.rightColBound ||
    currentPosition.row <= boundary.topRowBound ||
    currentPosition.row >= boundary.bottomRowBound
  ) {
    return false
  }
  return true
}
```

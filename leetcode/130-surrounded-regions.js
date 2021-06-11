/**
 * https://leetcode.com/problems/surrounded-regions/
 */

/**
 * O(n ^ 2) time, O(1) space
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function (board) {
  let rows = board.length
  let columns = board[0].length

  if (rows < 2 || columns < 2) {
    return board
  }

  for (let i = 0; i < columns; i++) {
    dfs(board, 0, i) // top
    dfs(board, rows - 1, i) // bottom
  }

  for (let i = 0; i < rows; i++) {
    dfs(board, i, 0) // left
    dfs(board, i, columns - 1) // right: ;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j] === '.') {
        board[i][j] = 'O'
      } else {
        board[i][j] = 'X'
      }
    }
  }
}

function dfs(board, i, j) {
  if (
    i < 0 ||
    i >= board.length ||
    j < 0 ||
    j >= board[0].length ||
    board[i][j] !== 'O'
  ) {
    return
  }

  board[i][j] = '.'
  dfs(board, i - 1, j)
  dfs(board, i + 1, j)
  dfs(board, i, j - 1)
  dfs(board, i, j + 1)
}

const board = [
  ['X', 'X', 'X', 'X'],
  ['X', 'O', 'O', 'X'],
  ['X', 'X', 'O', 'X'],
  ['X', 'O', 'X', 'X'],
]
solve(board)
console.log(board)

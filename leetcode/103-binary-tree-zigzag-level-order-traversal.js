/**
 * https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (!root) {
    return []
  }

  const result = []
  let reverse = false
  let currentLevel = [root]
  while (currentLevel.length !== 0) {
    let nextLevel = []

    for (let node of currentLevel) {
      if (node.left) {
        nextLevel.push(node.left)
      }
      if (node.right) {
        nextLevel.push(node.right)
      }
    }

    if (reverse) {
      result.push(currentLevel.reverse().map(({ val }) => val))
    } else {
      result.push(currentLevel.map(({ val }) => val))
    }

    currentLevel = nextLevel
    reverse = !reverse
  }

  return result
}

const head = new TreeNode(
  3,
  new TreeNode(9),
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
)

console.log(zigzagLevelOrder(head))

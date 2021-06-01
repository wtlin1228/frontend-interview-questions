/**
 * https://leetcode.com/problems/binary-tree-level-order-traversal/
 */

/**
 * First idea:
 *
 * It's just a tree breadth first search question.
 * Time Complexity: O(N), N = total nodes in the tree
 * Space Complexity: O(N), N = total nodes in the tree
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
var levelOrder = function (root) {
  if (root === null) {
    return []
  }

  let result = [[root.val]]
  let currentLayer = [root]

  while (currentLayer.length !== 0) {
    let nextLayer = []

    currentLayer.forEach((node) => {
      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)
    })

    if (nextLayer.length !== 0) {
      result.push(nextLayer.map((x) => x.val))
    }
    currentLayer = nextLayer
  }

  return result
}

console.log(
  levelOrder(
    new TreeNode(
      3,
      new TreeNode(9),
      new TreeNode(20, new TreeNode(15), new TreeNode(7))
    )
  )
)

console.log(levelOrder(new TreeNode(1)))

console.log(levelOrder(null))

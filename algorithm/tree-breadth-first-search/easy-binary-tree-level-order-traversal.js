/**
 * Binary Tree Level Order Traversal (easy)
 *
 * Given a binary tree, populate an array to represent its level-by-level traversal.
 * You should populate the values of all nodes of each level from left to right
 * in separate sub-arrays.
 *
 *
 */

class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
  }
}

/**
 * Time Complexity: O(N), N = total nodes in the tree
 * Space Complexity: O(N), N = total nodes in the tree
 */
function traverse(root) {
  let result = []
  let currentLayer = [root]

  while (currentLayer.length !== 0) {
    let nextLayer = []

    currentLayer.forEach((node) => {
      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)
      result.push(node.val)
    })

    currentLayer = nextLayer
  }

  return result
}

const root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
console.log(`Level order traversal: ${traverse(root)}`)

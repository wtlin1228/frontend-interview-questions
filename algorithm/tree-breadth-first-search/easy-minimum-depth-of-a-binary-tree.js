/**
 * Minimum Depth of a Binary Tree (easy)
 *
 * Find the minimum depth of a binary tree. The minimum depth is the
 * number of nodes along the shortest path from the root node to the
 * nearest leaf node.
 */

class TreeNode {
  constructor(value) {
    this.val = value
    this.left = null
    this.right = null
  }
}

/**
 * Time Complexity: O(N), N = total nodes in the tree
 * Space Complexity: O(N), N = total nodes in the tree
 */
const find_minimum_depth = function (root) {
  if (!root) return 0

  let layers = 1
  let currentLayer = [root]

  while (currentLayer.length !== 0) {
    let nextLayer = []
    for (let node of currentLayer) {
      if (!node.left && !node.right) return layers

      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)
    }

    layers += 1
    currentLayer = nextLayer
  }

  return layers
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
console.log(`Tree Minimum Depth: ${find_minimum_depth(root)}`)
root.left.left = new TreeNode(9)
root.right.left.left = new TreeNode(11)
console.log(`Tree Minimum Depth: ${find_minimum_depth(root)}`)

/**
 * Given a binary tree, find its maximum depth (or height).
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
function find_maximum_depth(root) {
  if (!root) return 0

  let layers = 0
  let currentLayer = [root]

  while (currentLayer.length !== 0) {
    layers += 1
    let nextLayer = []
    currentLayer.forEach((node) => {
      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)
    })

    currentLayer = nextLayer
  }

  return layers
}

const root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
console.log(`Tree Maximum Depth: ${find_maximum_depth(root)}`)
root.left.left = new TreeNode(9)
root.right.left.left = new TreeNode(11)
console.log(`Tree Maximum Depth: ${find_maximum_depth(root)}`)

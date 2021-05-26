/**
 * Zigzag Traversal (medium)
 *
 * Given a binary tree, populate an array to represent its zigzag
 * level order traversal. You should populate the values of all nodes
 * of the first level from left to right, then right to left for the
 * next level and keep alternating in the same manner for the following
 * levels.
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
const traverse = function (root) {
  let result = []
  let currentLayer = [root]
  let reverse = false

  while (currentLayer.length !== 0) {
    // find next layer
    let nextLayer = []
    currentLayer.forEach((node) => {
      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)
    })

    // push node value to result
    currentLayer = reverse ? currentLayer.reverse() : currentLayer
    result = [...result, currentLayer.map((x) => x.val)]

    currentLayer = nextLayer
    reverse = !reverse
  }

  return result
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
root.right.left.left = new TreeNode(20)
root.right.left.right = new TreeNode(17)
console.log(`Zigzag traversal: ${traverse(root)}`)

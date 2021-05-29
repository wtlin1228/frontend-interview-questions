/**
 * Level Averages in a Binary Tree (easy)
 *
 * Given a binary tree, populate an array to represent the averages of all of its levels.
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
const find_level_averages = function (root) {
  let result = []
  let currentLayer = [root]

  while (currentLayer.length !== 0) {
    let nextLayer = []

    currentLayer.forEach((node) => {
      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)
    })

    result.push(
      currentLayer.reduce((acc, curr) => (acc += curr.val), 0) /
        currentLayer.length
    )

    currentLayer = nextLayer
  }

  return result
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.left.right = new TreeNode(2)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)

console.log(`Level averages are: ${find_level_averages(root)}`)

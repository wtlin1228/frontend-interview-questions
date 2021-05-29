/**
 * Level Order Successor (easy)
 *
 * Given a binary tree and a node, find the level order successor
 * of the given node in the tree. The level order successor is the
 * node that appears right after the given node in the level order
 * traversal.
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
const find_successor = function (root, key) {
  if (!root) return null

  let currentLayer = [root]
  let isTargetFound = false

  while (currentLayer.length !== 0) {
    let nextLayer = []
    for (node of currentLayer) {
      if (isTargetFound) {
        return node
      }

      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)

      if (node.val === key) {
        isTargetFound = true
      }
    }

    currentLayer = nextLayer
  }

  return null
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
result = find_successor(root, 12)
if (result != null) console.log(result.val)
result = find_successor(root, 9)
if (result != null) console.log(result.val)

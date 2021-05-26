/**
 * Binary Tree Path Sum (easy)
 *
 * Given a binary tree and a number ‘S’, find if the tree has a path
 * from root-to-leaf such that the sum of all the node values of that
 * path equals ‘S’.
 */

class TreeNode {
  constructor(value) {
    this.val = value
    this.left = null
    this.right = null
  }
}

/**
 * Time Complexity: O(N), N = total number of nodes in the tree
 * Space Complexity: O(N), for recursion stack
 */
const has_path = function (root, sum) {
  if (!root) {
    return false
  }

  if (!root.left && !root.right) {
    return root.val === sum
  }

  return (
    has_path(root.left, sum - root.val) || has_path(root.right, sum - root.val)
  )
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
console.log(`Tree has path: ${has_path(root, 23)}`)
console.log(`Tree has path: ${has_path(root, 16)}`)

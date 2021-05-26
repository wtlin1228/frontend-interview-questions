/**
 * Path With Given Sequence (medium)
 *
 * Given a binary tree and a number sequence, find if the sequence
 * is present as a root-to-leaf path in the given tree.
 */

class TreeNode {
  constructor(value) {
    this.val = value
    this.left = null
    this.right = null
  }
}

/**
 * Time Complexity: O(N), N = total number of nodes in the tree, traverse each node once
 * Space Complexity: O(N), for recursion stack, worse case is LinkedList
 */
const find_path = function (root, sequence) {
  if (root === null) {
    return sequence.length === 0
  }

  function findPathRecursive(currentNode, sequence) {
    if (currentNode === null) {
      return false
    }

    if (currentNode.val !== sequence[0]) {
      return false
    }

    if (sequence.length === 1 && currentNode.val === sequence[0]) {
      return true
    }

    return (
      findPathRecursive(currentNode.left, sequence.slice(1)) ||
      findPathRecursive(currentNode.right, sequence.slice(1))
    )
  }

  return findPathRecursive(root, sequence)
}

var root = new TreeNode(1)
root.left = new TreeNode(0)
root.right = new TreeNode(1)
root.left.left = new TreeNode(1)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(5)

console.log(`Tree has path sequence: ${find_path(root, [1, 0, 7])}`)
console.log(`Tree has path sequence: ${find_path(root, [1, 1, 6])}`)

/**
 * Sum of Path Numbers (medium)
 *
 * Given a binary tree where each node can only have a digit (0-9) value,
 * each root-to-leaf path will represent a number. Find the total sum of
 * all the numbers represented by all paths.
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
const findSumOfPathNumbers = function (root) {
  function findSumRecursive(currentNode, previousSum) {
    if (!currentNode) {
      return 0
    }

    const currentSum = previousSum * 10 + currentNode.val

    if (!currentNode.left && !currentNode.right) {
      return currentSum
    }

    return (
      findSumRecursive(currentNode.left, currentSum) +
      findSumRecursive(currentNode.right, currentSum)
    )
  }

  return findSumRecursive(root, 0)
}

var root = new TreeNode(1)
root.left = new TreeNode(0)
root.right = new TreeNode(1)
root.left.left = new TreeNode(1)
root.right.left = new TreeNode(6)
root.right.right = new TreeNode(5)
console.log(`Total Sum of Path Numbers: ${findSumOfPathNumbers(root)}`)

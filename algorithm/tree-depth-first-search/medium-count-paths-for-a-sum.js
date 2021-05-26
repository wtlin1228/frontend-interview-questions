/**
 * Count Paths for a Sum (medium)
 *
 * Given a binary tree and a number ‘S’, find all paths in the tree
 * such that the sum of all the node values of each path equals ‘S’.
 * Please note that the paths can start or end at any node but all
 * paths must follow direction from parent to child (top to bottom).
 */

class TreeNode {
  constructor(value) {
    this.val = value
    this.left = null
    this.right = null
  }
}

const count_paths = function (root, S) {
  if (root === null) {
    return 0
  }

  return countPathRecursive(root, S, [])
}

function countPathRecursive(currentNode, S, currentPath) {
  if (currentNode === null) {
    return 0
  }

  currentPath.push(currentNode.val)

  let pathSum = 0
  let pathCount = 0

  for (let i = currentPath.length - 1; i >= 0; i--) {
    pathSum += currentPath[i]
    if (pathSum === S) {
      pathCount += 1
    }
  }

  pathCount += countPathRecursive(currentNode.left, S, currentPath)

  pathCount += countPathRecursive(currentNode.right, S, currentPath)

  currentPath.pop()

  return pathCount
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(4)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
console.log(`Tree has paths: ${count_paths(root, 11)}`)

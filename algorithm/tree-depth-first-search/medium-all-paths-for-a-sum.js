/**
 * All Paths for a Sum (medium)
 *
 * Given a binary tree and a number ‘S’, find all paths from
 * root-to-leaf such that the sum of all the node values of
 * each path equals ‘S’.
 */

class TreeNode {
  constructor(value) {
    this.val = value
    this.left = null
    this.right = null
  }
}

/**
 * Time Complexity: O(N * log(N)), N = total number of nodes in the tree
 * Space Complexity: O(N * log(N)), for recursion stack * the max layers
 */
const findSumPaths = function (root, sum) {
  allPaths = []

  function findPathsRecursive(currentNode, sum, currentPath, allPaths) {
    if (!currentNode) {
      return
    }

    currentPath.push(currentNode)

    if (currentNode.val === sum && !currentNode.left && !currentNode.right) {
      allPaths.push([...currentPath]) // O(logN)
    } else {
      findPathsRecursive(
        currentNode.left,
        sum - currentNode.val,
        currentPath,
        allPaths
      )
      findPathsRecursive(
        currentNode.right,
        sum - currentNode.val,
        currentPath,
        allPaths
      )
    }

    currentPath.pop()
  }

  findPathsRecursive(root, sum, [], allPaths)

  return allPaths
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(4)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
const sum = 23
const result = findSumPaths(root, sum)
console.log(
  `\nTree paths with sum: ${sum}: \n${result
    .map((path) => path.map((node) => node.val))
    .map((path) => path.join(' -> '))
    .join('\n')}`
)

/**
 * Similar Problem 1
 *
 * Given a binary tree, return all root-to-leaf paths.
 */

/**
 * Time Complexity: O(N * log(N)), N = total number of nodes in the tree
 * Space Complexity: O(N * log(N)), for recursion stack * the max layers
 */
const findAllPaths = function (root) {
  allPaths = []

  function findPathsRecursive(currentNode, currentPath, allPaths) {
    if (!currentNode) {
      return
    }

    currentPath.push(currentNode)

    if (!currentNode.left && !currentNode.right) {
      allPaths.push([...currentPath]) // O(logN)
    } else {
      findPathsRecursive(currentNode.left, currentPath, allPaths)
      findPathsRecursive(currentNode.right, currentPath, allPaths)
    }

    currentPath.pop()
  }

  findPathsRecursive(root, [], allPaths)

  return allPaths
}

const result2 = findAllPaths(root)
console.log(
  `\nAll Tree paths: ${sum}: \n${result2
    .map((path) => path.map((node) => node.val))
    .map((path) => path.join(' -> '))
    .join('\n')}`
)

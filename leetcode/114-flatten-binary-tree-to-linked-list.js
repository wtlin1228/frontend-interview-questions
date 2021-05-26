// https://leetcode.com/problems/flatten-binary-tree-to-linked-list/

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right

  this.toArray = function () {
    let result = []

    function toArrayRecursive(currentNode) {
      if (currentNode === null) {
        result.push(null)
        return
      }

      result.push(currentNode.val)

      toArrayRecursive(currentNode.left)
      toArrayRecursive(currentNode.right)
    }

    toArrayRecursive(this)

    return result
  }
}

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 *
 * Time Complexity: O(N), N = total number of nodes in the tree, traverse each node once
 * Space Complexity: O(N), for recursion stack, worse case is LinkedList
 */
var flatten = function (root) {
  flattenRecursive(root)

  return root
}

const flattenRecursive = (currentNode) => {
  if (currentNode === null) {
    return null
  }

  if (currentNode.left === null && currentNode.right === null) {
    return currentNode
  }

  let leftEndNode = null
  if (currentNode.left) {
    leftEndNode = flattenRecursive(currentNode.left)
  }

  let rightEndNode = null
  if (currentNode.right) {
    rightEndNode = flattenRecursive(currentNode.right)
  }

  if (leftEndNode) {
    leftEndNode.right = currentNode.right
    currentNode.right = currentNode.left
    currentNode.left = null
  }

  return rightEndNode || leftEndNode
}

const root = new TreeNode(1)
root.left = new TreeNode(2)
root.left.left = new TreeNode(3)
root.left.right = new TreeNode(4)
root.right = new TreeNode(5)
root.right.right = new TreeNode(6)

console.log(flatten(root).toArray())

const root2 = new TreeNode(1)
root2.left = new TreeNode(2)
root2.left.left = new TreeNode(3)

console.log(flatten(root2).toArray())

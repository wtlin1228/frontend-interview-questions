/**
 * https://leetcode.com/problems/binary-tree-right-side-view/
 */

/**
 * First idea:
 *
 * It's just a tree breadth first search question.
 * Time Complexity: O(N), N = total nodes in the tree
 * Space Complexity: O(N), N = total nodes in the tree
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (root === null) {
    return []
  }

  let result = [root.val]
  let currentLayer = [root]

  while (currentLayer.length !== 0) {
    let nextLayer = []

    currentLayer.forEach((node) => {
      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)
    })

    if (nextLayer.length > 0) {
      result.push(nextLayer[nextLayer.length - 1].val)
    }
    currentLayer = nextLayer
  }

  return result
}

console.log(
  rightSideView(
    new TreeNode(
      1,
      new TreeNode(2, null, new TreeNode(5)),
      new TreeNode(3, null, new TreeNode(4))
    )
  )
)

console.log(rightSideView(new TreeNode(1, null, new TreeNode(3))))

console.log(rightSideView(null))

/**
 * https://leetcode.com/problems/validate-binary-search-tree/
 */

// Definition for a binary tree node.
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

/**
 * O(n) time, O(log n) space
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  if (!root) {
    return true
  }

  function dfs(root, min, max) {
    if (root.val <= min || root.val >= max) {
      return false
    }

    if (root.left === null && root.right === null) {
      return true
    }

    let isLeftTreeValid = true
    if (root.left !== null) {
      isLeftTreeValid = dfs(root.left, min, root.val)
    }

    let isRightTreeValid = true
    if (root.right !== null) {
      isRightTreeValid = dfs(root.right, root.val, max)
    }

    return isLeftTreeValid && isRightTreeValid
  }

  return dfs(root, -Infinity, Infinity)
}

const root = new TreeNode(
  2,
  new TreeNode(1, null, null),
  new TreeNode(3, null, null)
)

console.log(isValidBST(root))
console.log(isValidBST(null))

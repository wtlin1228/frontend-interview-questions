/**
 * https://leetcode.com/problems/deepest-leaves-sum/
 *
 * Given the root of a binary tree, return the sum of values of its deepest leaves.
 *
 * Example 1:
 *
 * Input: root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
 * Output: 15
 *
 *
 * Example 2:
 *
 * Input: root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
 * Output: 19
 *
 *
 * Constraints:
 *
 * The number of nodes in the tree is in the range [1, 104].
 * 1 <= Node.val <= 100
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * Time Complexity: O(N), N = total nodes in the tree
 * Space Complexity: O(N), N = total nodes in the tree
 *
 * @param {TreeNode} root
 * @return {number}
 */
var deepestLeavesSum = function (root) {
  let currentLayer = [root]
  let nextLayer = []

  while (true) {
    // traverse the current layer and construct next layer
    currentLayer.forEach(({ left, right }) => {
      if (left) nextLayer.push(left)
      if (right) nextLayer.push(right)
    })

    // if no node in next layer, nodes of current layer are the deepest leaves
    if (nextLayer.length === 0) {
      return currentLayer.reduce((acc, curr) => {
        return acc + curr.val
      }, 0)
    }

    currentLayer = nextLayer
    nextLayer = []
  }
}

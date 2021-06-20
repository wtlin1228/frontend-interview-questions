/**
 * https://leetcode.com/problems/inorder-successor-in-bst/
 *
 * Given a binary search tree and a node in it, find the in-order successor of that node in the BST.
 *
 * The successor of a node p is the node with the smallest key greater than p.val.
 *
 *
 *
 * Example 1:
 *
 *    2
 *  /   \
 * 1     3
 *
 * Input: root = [2,1,3], p = 1
 * Output: 2
 * Explanation: 1's in-order successor node is 2. Note that both p and the return
 * value is of TreeNode type.
 *
 *
 * Example 2:
 *
 *               .5.
 *              /   \
 *             3     6
 *            / \
 *           2   4
 *          /
 *         1
 *
 * Input: root = [5,3,6,2,4,null,null,1], p = 6
 * Output: null
 * Explanation: There is no in-order successor of the current node, so the answer is null.
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

// Time Complexity: O(H), H is height of the given tree
function inorderSuccessor(root, p) {
  // Case 1: Node has right subtree
  // Go deep to leftmost node in right subtree or find min in right subtree
  if (p.right !== null) {
    let pointer = p.right
    while (pointer.left !== null) {
      pointer = pointer.left
    }
    return pointer.val
  }

  // Case 2: Node has no right subtree
  // Go to the nearest ancestor for which given node would be in left subtree
  let rightAncestor = null
  pointer = root
  while (pointer !== p) {
    if (p.val < pointer.val) {
      rightAncestor = pointer
      pointer = pointer.left
    } else {
      pointer = pointer.right
    }
  }

  return rightAncestor ? rightAncestor.val : null
}

const n10 = new TreeNode(10)
const n5 = new TreeNode(5)
const n15 = new TreeNode(15)
const n0 = new TreeNode(0)
const n8 = new TreeNode(8)
const n13 = new TreeNode(13)
const n20 = new TreeNode(20)
const n_5 = new TreeNode(-5)
const n2 = new TreeNode(2)
const n7 = new TreeNode(7)
const n9 = new TreeNode(9)
const n11 = new TreeNode(11)
const n14 = new TreeNode(14)

n10.left = n5
n10.right = n15
n5.left = n0
n5.right = n8
n15.left = n13
n15.right = n20
n0.left = n_5
n0.right = n2
n8.left = n7
n8.right = n9
n13.left = n11
n13.right = n14

console.log(inorderSuccessor(n10, n0) === 2)
console.log(inorderSuccessor(n10, n10) === 11)
console.log(inorderSuccessor(n10, n5) === 7)
console.log(inorderSuccessor(n10, n2) === 5)
console.log(inorderSuccessor(n10, n9) === 10)
console.log(inorderSuccessor(n10, n10) === 11)
console.log(inorderSuccessor(n10, n20) === null)
console.log(inorderSuccessor(n10, n14) === 15)

/**
 * https://leetcode.com/problems/largest-bst-subtree/
 *
 * Given a Binary Tree, write a function that returns the size
 * of the largest subtree which is also a Binary Search Tree (BST).
 * If the complete Binary Tree is BST, then return the size of whole tree.
 *
 *
 * Examples:
 *
 *
 * Input:
 *       5
 *     /  \
 *    2    4
 *  /  \
 * 1    3
 *
 * Output: 3
 * The following subtree is the maximum size BST subtree
 *    2
 *  /  \
 * 1    3
 *
 *
 * Input:
 *        50
 *      /    \
 *   30       60
 *  /  \     /  \
 * 5   20   45   70
 *              /  \
 *            65    80
 * Output: 5
 * The following subtree is the maximum size BST subtree
 *       60
 *      /  \
 *    45    70
 *         /  \
 *       65    80
 */

class Node {
  constructor(val, left = null, right = null) {
    this.val = val
    this.left = left
    this.right = right
  }
}

/**
 * Time Complexity: O(n), n = number of tree nodes
 * Space Complexity: O(n), n = number of tree nodes, due to recursive stacks
 */
function largestBST(root) {
  // return [isValidBST, size, min, max]
  function largestBSTRecursive(root) {
    // console.log(`travel to node(${root.val})`)

    if (root === null) {
      // console.log(`return ${[true, 0]}`)
      return [true, 0, null, null]
    }

    if (root.left === null && root.right === null) {
      // leaf node
      // console.log(`return ${[true, 1]}`)
      return [true, 1, root.val, root.val]
    }

    const [leftValid, leftSize, leftMin, leftMax] = largestBSTRecursive(
      root.left
    )
    const [rightValid, rightSize, rightMin, rightMax] = largestBSTRecursive(
      root.right
    )

    if (!leftValid || !rightValid) {
      // console.log(`return ${[false, Math.max(leftSize, rightSize)]}`)
      return [false, Math.max(leftSize, rightSize), null, null]
    }

    const rootGraterThanLeft = leftMax !== null ? root.val > leftMax : true
    const rootGraterThanRight = rightMin !== null ? root.val < rightMin : true

    if (rootGraterThanLeft && rootGraterThanRight) {
      // console.log(`node(${root.val}) is a valid BST`)
      // console.log(`return ${[true, 1 + leftSize + rightSize]}`)
      return [true, 1 + leftSize + rightSize, leftMin, rightMax]
    } else {
      // console.log(`return ${[false, Math.max(leftSize, rightSize)]}`)
      return [false, Math.max(leftSize, rightSize)]
    }
  }

  const [_, size] = largestBSTRecursive(root)
  return size
}

console.log(
  largestBST(
    new Node(
      50,
      new Node(30, new Node(5), new Node(20)),
      new Node(
        60,
        new Node(45),
        new Node(70, new Node(65, new Node(55)), new Node(80))
      )
    )
  )
)

console.log(
  largestBST(new Node(5, new Node(2, new Node(1), new Node(3)), new Node(4)))
)

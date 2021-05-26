/**
 * Connect Level Order Siblings (medium)
 *
 * Given a binary tree, connect each node with its level order successor.
 * The last node of each level should point to a null node.
 */

class TreeNode {
  constructor(val) {
    this.val = val
    this.left = null
    this.right = null
    this.next = null
  }

  // level order traversal using 'next' pointer
  print_level_order() {
    console.log("Level order traversal using 'next' pointer: ")
    let nextLevelRoot = this
    while (nextLevelRoot !== null) {
      let current = nextLevelRoot
      nextLevelRoot = null
      while (current != null) {
        process.stdout.write(`${current.val} `)
        if (nextLevelRoot === null) {
          if (current.left !== null) {
            nextLevelRoot = current.left
          } else if (current.right !== null) {
            nextLevelRoot = current.right
          }
        }
        current = current.next
      }
      console.log()
    }
  }
}

/**
 * Time Complexity: O(N), N = total nodes in the tree
 * Space Complexity: O(N), N = total nodes in the tree
 */
const connect_level_order_siblings = function (root) {
  let currentLayer = [root]

  while (currentLayer.length !== 0) {
    layers += 1
    let nextLayer = []
    currentLayer.forEach((node) => {
      if (node.left) nextLayer.push(node.left)
      if (node.right) nextLayer.push(node.right)
    })

    for (let i = 0; i < currentLayer.length - 1; i++) {
      currentLayer[i].next = currentLayer[i + 1]
    }

    currentLayer = nextLayer
  }
}

var root = new TreeNode(12)
root.left = new TreeNode(7)
root.right = new TreeNode(1)
root.left.left = new TreeNode(9)
root.right.left = new TreeNode(10)
root.right.right = new TreeNode(5)
connect_level_order_siblings(root)

root.print_level_order()

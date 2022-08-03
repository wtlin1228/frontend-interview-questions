# Tree Breadth First Search

- use a Queue to keep track of all the nodes of a level
- space complexity of the algorithm will be O(W), where ‘W’ is the maximum number of nodes on any level.

## binary tree level order traversal

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  let result = []

  if (root === null) {
    return result
  }

  const queue = new Queue()
  queue.enqueue(root)

  while (queue.size() > 0) {
    const currentLevel = []
    const size = queue.size()
    for (let i = 0; i < size; i++) {
      const node = queue.dequeue()
      currentLevel.push(node.val)
      if (node.left !== null) {
        queue.enqueue(node.left)
      }
      if (node.right !== null) {
        queue.enqueue(node.right)
      }
    }
    if (currentLevel.length > 0) {
      result.push(currentLevel)
    }
  }

  return result
}
```

## zigzag traversal

```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (root === null) {
    return []
  }

  const result = [[root.val]]
  let isReverse = true
  let currentLevel = [root]
  while (currentLevel.length !== 0) {
    const nextLevel = []

    for (let i = 0; i < currentLevel.length; i++) {
      const currentNode = currentLevel[i]

      if (currentNode.left !== null) {
        nextLevel.push(currentNode.left)
      }
      if (currentNode.right !== null) {
        nextLevel.push(currentNode.right)
      }
    }

    currentLevel = nextLevel

    if (nextLevel.length > 0) {
      if (isReverse) {
        const copy = [...currentLevel].reverse()
        result.push(copy.map((x) => x.val))
      } else {
        result.push(currentLevel.map((x) => x.val))
      }
    }

    isReverse = !isReverse
  }

  return result
}
```

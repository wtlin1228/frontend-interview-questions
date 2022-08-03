# Tree Depth First Search

- using recursion
- space complexity of the algorithm will be O(H), where ‘H’ is the maximum height of the tree.

## binary tree path sum

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
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  return dfs(root, targetSum)
}

const dfs = (node, target) => {
  if (node === null) {
    return false
  }

  if (node.left === null && node.right === null && node.val === target) {
    return true
  }

  return dfs(node.left, target - node.val) || dfs(node.right, target - node.val)
}
```

## all paths for a sum

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
 * @param {number} targetSum
 * @return {number[][]}
 */
var pathSum = function (root, targetSum) {
  const allPaths = []
  dfs(root, targetSum, [], allPaths)
  return allPaths
}

const dfs = (node, target, currentPath, allPaths) => {
  if (node === null) {
    return
  }

  currentPath.push(node.val)

  if (node.left === null && node.right === null && node.val === target) {
    allPaths.push([...currentPath])
  } else {
    dfs(node.left, target - node.val, currentPath, allPaths)
    dfs(node.right, target - node.val, currentPath, allPaths)
  }

  currentPath.pop()
}
```

## path with given sequence

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
 * @param {number[]} arr
 * @return {boolean}
 */
var isValidSequence = function (root, arr) {
  if (root === null) {
    return arr.length === 0
  }
  return dfs(root, arr)
}

const dfs = (node, sequence, sequenceIdx = 0) => {
  if (node === null) {
    return false
  }

  if (sequenceIdx >= sequence.length || node.val !== sequence[sequenceIdx]) {
    return false
  }

  if (
    node.left === null &&
    node.right === null &&
    sequenceIdx === sequence.length - 1
  ) {
    return true
  }

  return (
    dfs(node.left, sequence, sequenceIdx + 1) ||
    dfs(node.right, sequence, sequenceIdx + 1)
  )
}
```

## count paths for a sum

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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  return dfs(root, targetSum, targetSum)
}

const dfs = (node, target, initialTarget) => {
  if (node === null) {
    return 0
  }

  let count = 0
  if (node.val === target) {
    count += 1
  }

  return (
    count +
    dfs(node.left, target - node.val, initialTarget) +
    dfs(node.right, target - node.val, initialTarget) +
    dfs(node.left, initialTarget) +
    dfs(node.right, initialTarget)
  )
}
```

## diameter of binary tree

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
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let diameter = 0

  const dfs = (node) => {
    if (node === null) {
      return 0
    }

    const leftHeight = dfs(node.left)
    const rightHeight = dfs(node.right)

    diameter = Math.max(diameter, leftHeight + rightHeight)

    return Math.max(leftHeight, rightHeight) + 1
  }

  dfs(root)

  return diameter
}
```

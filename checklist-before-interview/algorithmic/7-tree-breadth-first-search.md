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

## Word Ladder

https://leetcode.com/problems/word-ladder/

```js
ladderLength('hit', 'cog', ['hot', 'dot', 'dog', 'lot', 'log', 'cog'])
// 5
// "hit" -> "hot" -> "dot" -> "dog" -> cog"
```

```js
/**
 * O(n*n*m), where n = wordList.length, m = beginWord.length
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  // endWord must to be in th wordList
  if (!isWordInWordList(endWord, wordList)) {
    return 0
  }

  // beginWord can reach endWord directly
  if (hasEdge(beginWord, endWord)) {
    return 2
  }

  // Do bi-directional breadth first search.
  const beginQueue = new Queue([beginWord])
  const endQueue = new Queue([endWord])
  const beginVisitedTable = {
    [beginWord]: true,
  }
  const endVisitedTable = {
    [endWord]: true,
  }

  let step = 0

  while (beginQueue.size() !== 0 && endQueue.size() !== 0) {
    step += 1

    const beginQueueSize = beginQueue.size()
    for (let i = 0; i < beginQueueSize; i++) {
      const word = beginQueue.dequeue()
      if (endVisitedTable[word] === true) {
        return step
      }
      const nextWords = getNextWords(word, wordList, beginVisitedTable)
      nextWords.forEach((nextWord) => {
        beginVisitedTable[nextWord] = true
        beginQueue.enqueue(nextWord)
      })
    }

    step += 1

    const endQueueSize = endQueue.size()
    for (let i = 0; i < endQueueSize; i++) {
      const word = endQueue.dequeue()
      if (beginVisitedTable[word] === true) {
        return step
      }
      const nextWords = getNextWords(word, wordList, endVisitedTable)
      nextWords.forEach((nextWord) => {
        endVisitedTable[nextWord] = true
        endQueue.enqueue(nextWord)
      })
    }
  }

  return 0
}

// O(n), where n = wordList.length
const isWordInWordList = (word, wordList) => wordList.includes(word)

// It's a graph, and two node has an edge if only a single letter different.
// O(m), where m = word1.length
const hasEdge = (word1, word2) => {
  let diff = false
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] !== word2[i]) {
      if (diff === true) {
        return false
      }
      diff = true
    }
  }
  return true
}

// O(n*m), where n = wordList.length, m = word.length
const getNextWords = (word, wordList, visitedTable) => {
  const nextWords = []
  for (let i = 0; i < wordList.length; i++) {
    const nextWord = wordList[i]
    if (visitedTable[nextWord] === undefined && hasEdge(word, nextWord)) {
      nextWords.push(nextWord)
    }
  }
  return nextWords
}
```

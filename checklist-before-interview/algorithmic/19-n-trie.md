# N Trie

This is often used in search suggestions.

## Search Suggestions System

https://leetcode.com/problems/search-suggestions-system/

```js
class Node {
  constructor(val, isWordEnd = false) {
    this.val = val
    this.isWordEnd = isWordEnd
    this.next = {}
  }
}

const createSearchTree = (products) => {
  const roots = {}

  products.forEach((product) => {
    const firstChar = product[0]
    if (!roots[firstChar]) {
      roots[firstChar] = new Node(firstChar)
    }

    let node = roots[firstChar]

    for (let i = 1; i < product.length; i++) {
      const char = product[i]

      if (!node.next[char]) {
        node.next[char] = new Node(char)
      }
      node = node.next[char]
    }

    // mark this is the end of one product
    node.isWordEnd = true
  })

  return roots
}

const getCandidates = (node, prefix) => {
  const candidates = []

  const dfs = (n, path) => {
    if (n.isWordEnd) {
      candidates.push(path)
    }

    Object.keys(n.next).forEach((key) => {
      const child = n.next[key]
      dfs(child, path + child.val)
    })
  }

  dfs(node, prefix)

  return candidates
}

/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
  const roots = createSearchTree(products)

  const suggested = []

  let search = ''
  let currentNode
  for (let i = 0; i < searchWord.length; i++) {
    const currentChar = searchWord[i]

    if (i === 0) {
      currentNode = roots[currentChar]
    } else {
      currentNode = currentNode.next[currentChar]
    }

    if (!currentNode) {
      while (i < searchWord.length) {
        i++
        suggested.push([])
      }
      return suggested
    }

    search += currentChar
    const candidates = getCandidates(currentNode, search)

    candidates.sort((a, b) => a.localeCompare(b))
    if (candidates.length > 3) {
      suggested.push(candidates.slice(0, 3))
    } else {
      suggested.push(candidates)
    }
  }

  return suggested
}
```

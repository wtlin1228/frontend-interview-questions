# Topological Sort

## Sentence generator

input:
['I', 'love', 'my', 'dog']
['I', 'love' 'my', 'dog', 'cat']

from 'I', generate a sentence that have 4 words

```js
const input = [
  ['I', 'love', 'my', 'dog'],
  ['I', 'love', 'my', 'dog', 'cat'],
]

class Node {
  constructor(word) {
    this.word = word
    this.nextWords = {}
    this.maxWeightNextWord = null
    this.maxWeight = 0
  }

  addNextWord(nextWordNode) {
    if (this.nextWords[nextWordNode.word] === undefined) {
      this.nextWords[nextWordNode.word] = {
        node: nextWordNode,
        weight: 1,
      }
    } else {
      this.nextWords[nextWordNode.word].weight += 1
    }

    if (this.nextWords[nextWordNode.word].weight > this.maxWeight) {
      this.maxWeight = this.nextWords[nextWordNode.word].weight
      this.maxWeightNextWord = this.nextWords[nextWordNode.word].node
    }
  }
}

// const nodes = {
//   I: Node('I'),
//   love: Node('love'),
//   my: Node('my'),
//   dog: Node('dog'),
//   cat: Node('cat'),
// }

class Generator {
  constructor() {
    this.nodes = {}
  }

  ingest(words) {
    for (let i = 1; i < words.length; i++) {
      const prevWord = words[i - 1]
      const word = words[i]

      if (this.nodes[prevWord] === undefined) {
        this.nodes[prevWord] = new Node(prevWord)
      }

      if (this.nodes[word] === undefined) {
        this.nodes[word] = new Node(word)
      }

      this.nodes[prevWord].addNextWord(this.nodes[word])
    }
  }

  getSentence(startWord, count) {
    const startNode = this.nodes[startWord]
    if (startNode === undefined) {
      return startWord
    }

    let res = startWord
    let node = startNode.maxWeightNextWord
    for (let i = 1; i < count; i++) {
      if (node === null) {
        break
      }
      res += ' ' + node.word
      node = node.maxWeightNextWord
    }

    return res
  }
}

const generator = new Generator()

generator.ingest(['I', 'love', 'my', 'dog'])
generator.ingest(['I', 'love', 'my', 'dog', 'cat'])
generator.ingest(['Una', 'and', 'I', 'are', 'babies'])
generator.ingest(['Una', 'and', 'I', 'are', 'babies'])
generator.ingest(['Una', 'and', 'I', 'are', 'babies'])

// console.log(generator.nodes['I'])

console.log(generator.getSentence('I', 5))

console.log(generator.getSentence('love', 5))
```

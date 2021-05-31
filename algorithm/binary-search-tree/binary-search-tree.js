const genEmpties = (length) => Array(length).fill(' ').join('')

class BSTNode {
  constructor(parent, k) {
    this.key = k
    this.parent = parent
    this.left = null
    this.right = null
  }

  /**
   * Internal method for ASCII art.
   */
  _str() {
    let label = String(this.key)

    let leftLines = []
    let leftPos = 0
    let leftWidth = 0
    if (this.left !== null) {
      const left = this.left._str()
      leftLines = left.lines
      leftPos = left.pos
      leftWidth = left.width
    }

    let rightLines = []
    let rightPos = 0
    let rightWidth = 0
    if (this.right !== null) {
      const right = this.right._str()
      rightLines = right.lines
      rightPos = right.pos
      rightWidth = right.width
    }

    const middle = Math.max(rightPos + leftWidth - leftPos + 1, label.length, 2)

    const pos = Math.floor(leftPos + middle / 2)
    const width = leftPos + middle + rightWidth - rightPos
    while (leftLines.length < rightLines.length) {
      leftLines.push(genEmpties(leftWidth))
    }
    while (rightLines.length < leftLines.length) {
      rightLines.push(genEmpties(rightWidth))
    }

    if (
      (middle - label.length) % 2 === 1 &&
      this.parent !== null &&
      this === this.parent.left &&
      label.length < middle
    ) {
      label += '.'
    }

    label = label
      .padStart(label.length + Math.floor((middle - label.length) / 2), '.')
      .padEnd(middle, '.')

    if (label[0] === '.') {
      label = ' ' + label.slice(1)
    }
    if (label[label.length - 1] === '.') {
      label = label.slice(0, label.length - 1) + ' '
    }

    const lines = [
      genEmpties(leftPos) + label + genEmpties(rightWidth - rightPos),
      genEmpties(leftPos) +
        '/' +
        genEmpties(middle - 2) +
        '\\' +
        genEmpties(rightWidth - rightPos),
    ].concat(
      leftLines.map((leftLine, i) => {
        const rightLine = rightLines[i]
        return leftLine + genEmpties(width - leftWidth - rightWidth) + rightLine
      })
    )

    return { lines, pos, width }
  }

  toString() {
    return '\n' + this._str().lines.join('\n')
  }

  /**
   * Inserts a node into the subtree rooted at this node.
   * @param {BSTNode} node The node to be inserted.
   * @returns
   */
  insert(node) {
    if (node === null) {
      return
    }
    if (node.key < this.key) {
      if (this.left === null) {
        node.parent = this
        this.left = node
      } else {
        this.left.insert(node)
      }
    } else {
      if (this.right === null) {
        node.parent = this
        this.right = node
      } else {
        this.right.insert(node)
      }
    }
  }
}

class BST {
  constructor(klass = BSTNode) {
    this.root = null
    this.klass = klass
  }

  toString() {
    if (this.root === null) {
      return '<empty tree>'
    }
    return this.root.toString()
  }

  /**
   * Inserts a node with key k into the subtree rooted at this node.
   * @param {number} k The key of the node to be inserted.
   * @returns The node inserted.
   */
  insert(k) {
    const node = new this.klass(null, k)
    if (this.root === null) {
      this.root = node
    } else {
      this.root.insert(node)
    }
    return node
  }
}

const tree = new BST()
tree.insert(10)
tree.insert(5)
tree.insert(15)
tree.insert(3)
tree.insert(7)
tree.insert(13)
tree.insert(17)

console.log(tree.toString())

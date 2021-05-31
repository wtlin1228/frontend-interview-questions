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
   * Finds and returns the node with key k from the subtree rooted at this node.
   * @param {number} k The key of the node we want to find.
   * @returns {BSTNode} The node with key k.
   */
  find(k) {
    if (k === this.key) {
      return this
    }

    if (k < this.key) {
      if (this.left === null) {
        return null
      }
      return this.left.find(k)
    }

    if (k > this.key) {
      if (this.right === null) {
        return null
      }
      return this.right.find(k)
    }
  }

  /**
   * Finds the node with the minimum key in the subtree rooted at this node.
   * @returns The node with the minimum key.
   */
  findMin() {
    let current = this
    while (current.left !== null) {
      current = current.left
    }
    return current
  }

  /**
   * Returns the node with the next larger key (the successor) in the BST.
   */
  nextLarger() {
    if (this.right !== null) {
      return this.right.findMin()
    }
    let current = this
    while (current.parent !== null && current === current.parent.right) {
      current = current.parent
    }
    return current.parent
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

  /**
   * Deletes and returns this node from the BST.
   * @returns the node deleted.
   */
  delete() {
    if (this.left === null || this.right === null) {
      if (this === this.parent.left) {
        this.parent.left = this.left || this.right
        if (this.parent.left !== null) {
          this.parent.left.parent = this.parent
        }
      } else {
        this.parent.right = this.left || this.right
        if (this.parent.right !== null) {
          this.parent.right.parent = this.parent
        }
      }
      return this
    } else {
      const s = this.nextLarger()
      ;[this.key, s.key] = [s.key, this.key]
      return s.delete()
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
   * Finds and returns the node with key k from the subtree rooted at this node.
   * @param {number} k The key of the node we want to find.
   * @returns The node with key k or None if the tree is empty.
   */
  find(k) {
    return this.root && this.root.find(k)
  }

  /**
   * @returns The minimum node of this BST.
   */
  findMin() {
    return this.root && this.root.findMin()
  }

  /**
   * Returns the node that contains the next larger (the successor) key in the
   * BST in relation to the node with key k.
   * @param {number} k The key of the node of which the successor is to be found.
   * @returns The successor node.
   */
  nextLarger(k) {
    const node = this.find(k)
    return node && node.nextLarger()
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

  /**
   * Deletes and returns a node with key k if it exists from the BST.
   * @param {number} k The key of the node that we want to delete.
   * @returns The deleted node with key k.
   */
  delete(k) {
    const node = this.find(k)

    if (!node) {
      return null
    }

    if (node !== this.root) {
      return node.delete()
    } else {
      const pseudoRoot = new this.klass(null, 0)
      pseudoRoot.left = this.root
      this.root.parent = pseudoRoot

      const deleted = this.root.delete()

      this.root = pseudoRoot.left
      if (this.root !== null) {
        this.root.parent = null
      }

      return deleted
    }
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

tree.delete(15)
console.log(tree.toString())

tree.delete(10)
console.log(tree.toString())

tree.delete(13)
console.log(tree.toString())

tree.delete(17)
console.log(tree.toString())

tree.delete(3)
console.log(tree.toString())

tree.delete(5)
console.log(tree.toString())

tree.delete(7)
console.log(tree.toString())

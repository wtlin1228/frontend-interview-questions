const Color = {
  Red: 0,
  Black: 1,
}

class Node {
  constructor(parent, k, val) {
    this.key = k
    this.parent = parent
    this.left = null
    this.right = null
    this.color = Color.Red
    this.val = val
  }

  /**
   * Inserts a node into the subtree rooted at this node.
   * @param node The node to be inserted.
   * @returns
   */
  insert(node) {
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
   * Finds and returns the node with key k from the subtree rooted at this node.
   * @param k The key of the node we want to find.
   * @returns The node with key k.
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
    return null
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
   * Finds the node with the maximum key in the subtree rooted at this node.
   * @returns The node with the maximum key.
   */
  findMax() {
    let current = this
    while (current.right !== null) {
      current = current.right
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
   * Returns the node with the next smaller key (the predecessor) in the BST.
   */
  nextSmaller() {
    if (this.left !== null) {
      return this.left.findMax()
    }
    let current = this
    while (current.parent !== null && current === current.parent.left) {
      current = current.parent
    }
    return current.parent
  }
}

class Tree {
  constructor(klass = Node) {
    this.klass = klass
    this.root = null
  }

  leftRotate(x) {
    if (x.right === null) {
      throw new Error("Can't perform left rotate if x.right is null")
    }
    const y = x.right
    x.right = y.left
    if (y.left !== null) {
      y.left.parent = x
    }
    y.parent = x.parent
    if (x.parent === null) {
      this.root = y
    } else if (x === x.parent.left) {
      x.parent.left = y
    } else {
      x.parent.right = y
    }
    y.left = x
    x.parent = y
  }
  rightRotate(x) {
    if (x.left === null) {
      throw new Error("Can't perform left rotate if x.left is null")
    }
    const y = x.left
    x.left = y.right
    if (y.right !== null) {
      y.right.parent = x
    }
    y.parent = x.parent
    if (x.parent === null) {
      this.root = y
    } else if (x === x.parent.left) {
      x.parent.left = y
    } else {
      x.parent.right = y
    }
    y.right = x
    x.parent = y
  }
  getColorOfUncle(x) {
    if (x.parent === null || x.parent.parent === null) {
      throw new Error(
        "Can't get uncle's color since x.parent or x.parent.parent is null"
      )
    }
    const uncle =
      x.parent === x.parent.parent.left
        ? x.parent.parent.right
        : x.parent.parent.left
    if (uncle === null) {
      return Color.Black
    }
    return uncle.color
  }
  insertFixup(z) {
    if (this.root === null) {
      throw new Error("Can't perform insert fixup if there is no root")
    }
    while (
      z.parent !== null &&
      z.parent.parent !== null &&
      z.parent.color === Color.Red
    ) {
      if (z.parent === z.parent.parent.left) {
        //        Node               Node
        //        /                   /
        //      Red        or       Red
        //      /                     \
        //    Red(z)                  Red(z)
        const y = z.parent.parent.right
        if (y !== null && y.color === Color.Red) {
          //        Node                 Node
          //        /  \                 /  \
          //      Red  Red      or     Red  Red
          //      /                      \
          //    Red(z)                  Red(z)
          z.parent.color = Color.Black
          y.color = Color.Black
          z.parent.parent.color = Color.Red
          z = z.parent.parent
          //       Red(z)                  Red(z)
          //       /    \                  /    \
          //    Black  Black     or     Black  Black
          //     /                         \
          //   Red                         Red
        } else {
          //        Node                   Node
          //        /  \                   /  \
          //     Red   Black      or    Red   Black
          //      /                        \
          //    Red(z)                    Red(z)
          if (z === z.parent.right) {
            //        Node
            //        /  \
            //     Red   Black
            //        \
            //       Red(z)
            z = z.parent
            this.leftRotate(z)
            //        Node
            //        /  \
            //     Red   Black
            //      /
            //   Red(z)
          }
          if (z.parent === null || z.parent.parent === null) {
            break
          }
          //        Node
          //        /  \
          //     Red   Black
          //      /
          //   Red(z)
          z.parent.color = Color.Black
          z.parent.parent.color = Color.Red
          this.rightRotate(z.parent.parent)
          //        Black
          //        /   \
          //    Red(z)   Red
          //              \
          //              Black
        }
      } else {
        //   Node               Node
        //      \                  \
        //      Red       or       Red
        //      /                     \
        //    Red(z)                  Red(z)
        const y = z.parent.parent.left
        if (y !== null && y.color === Color.Red) {
          //    Node                 Node
          //    /  \                /   \
          //  Red   Red     or    Red    Red
          //        /                      \
          //      Red(z)                   Red(z)
          z.parent.color = Color.Black
          y.color = Color.Black
          z.parent.parent.color = Color.Red
          z = z.parent.parent
          //       Red(z)                   Red(z)
          //       /   \                    /   \
          //   Black   Black     or     Black   Black
          //           /                           \
          //         Red                           Red
        } else {
          //       Node                      Node
          //       /  \                     /   \
          //   Black   Red       or     Black    Red
          //           /                           \
          //         Red(z)                        Red(z)
          if (z === z.parent.left) {
            //       Node
            //       /  \
            //   Black   Red
            //           /
            //         Red(z)
            z = z.parent
            this.rightRotate(z)
            //        Node
            //       /   \
            //   Black    Red
            //              \
            //              Red(z)
          }
          if (z.parent === null || z.parent.parent === null) {
            break
          }
          //        Node
          //       /   \
          //   Black    Red
          //              \
          //              Red(z)
          z.parent.color = Color.Black
          z.parent.parent.color = Color.Red
          this.leftRotate(z.parent.parent)
          //         Black
          //         /   \
          //       Red   Red(z)
          //       /
          //   Black
        }
      }
    }
    this.root.color = Color.Black
  }

  find(k) {
    return this.root && this.root.find(k)
  }

  insert(k, val) {
    const node = new this.klass(null, k, val)
    if (this.root === null) {
      this.root = node
    } else {
      this.root.insert(node)
    }
    this.insertFixup(node)
    return node
  }

  insertOrReplace(k, val) {
    const node = this.find(k)
    if (node) {
      node.val = val
      return node
    } else {
      return this.insert(k, val)
    }
  }

  /**
   * Returns the node that contains the next larger (the successor) key in the
   * BST in relation to the node with key k.
   * @param k The key of the node of which the successor is to be found.
   * @returns The successor node.
   */
  nextLarger(k) {
    const node = this.find(k)
    return node && node.nextLarger()
  }

  /**
   * Returns the node that contains the next smaller (the predecessor) key in the
   * BST in relation to the node with key k.
   * @param k The key of the node of which the predecessor is to be found.
   * @returns The predecessor node.
   */
  nextSmaller(k) {
    const node = this.find(k)
    return node && node.nextSmaller()
  }
}

module.exports = {
  Tree,
}

/**
 * https://leetcode.com/problems/lru-cache/
 */

class Node {
  constructor(value, previous = null, next = null) {
    this.value = value
    this.previous = previous
    this.next = next
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.length = 0
  this.head = null
  this.tail = null

  // example:
  // this.cache = {
  //   1: {
  //     node: ...,
  //     value: ...,
  //   }
  // }
  this.cache = {}
}

/**
 * O(1)
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  // console.log(`get ${key} from cache`)
  if (!this.cache[key]) {
    return -1
  }

  const cache = this.cache[key]
  this.liftToHead(cache.node)
  return cache.value
}

/**
 * O(1)
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  // console.log(`put [${key}, ${value}] into cache`)
  if (this.cache[key]) {
    this.cache[key].value = value
    this.liftToHead(this.cache[key].node)
    return
  }

  const node = new Node(key)
  this.insertToHead(node)

  if (this.length < this.capacity) {
    this.length += 1
  } else {
    this.cache[this.tail.value] = undefined
    this.removeFromTail()
  }

  this.cache[key] = {
    value,
    node,
  }
}

/**
 * O(1)
 * @return {Node} removed node whose next and previous pointer are set to null
 */
LRUCache.prototype.removeFromTail = function () {
  if (this.tail === null) {
    // node number = 0
    return null
  }

  const lastNode = this.tail

  if (this.tail.previous === null) {
    // node number = 1
    this.head = null
    this.tail = null
  } else {
    // node number > 2
    this.tail = this.tail.previous
    this.tail.next = null
  }

  lastNode.previous = null
  lastNode.next = null

  // console.log(`remove node ${lastNode.value} from tail`)

  return lastNode
}

/**
 * O(1)
 * @param {Node} node this node will be inserted in head of the list
 */
LRUCache.prototype.insertToHead = function (node) {
  // console.log(`insert node ${node.value} to head`)
  if (this.head === null) {
    // node number = 0
    this.head = node
    this.tail = node
    return
  }

  node.next = this.head
  this.head.previous = node
  this.head = node
}

/**
 * O(1)
 * @param {Node} node this node will be lifted to head of the list
 */
LRUCache.prototype.liftToHead = function (node) {
  // console.log(`lift node ${node.value} to head`)
  if (node === this.head) {
    return
  }

  if (node.next === null) {
    this.removeFromTail()
    this.insertToHead(node)
    return
  }

  node.previous.next = node.next
  node.next.previous = node.previous
  this.insertToHead(node)
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

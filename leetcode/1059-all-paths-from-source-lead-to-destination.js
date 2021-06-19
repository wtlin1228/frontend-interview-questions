/**
 * https://leetcode.com/problems/all-paths-from-source-lead-to-destination/
 *
 * Given a directed, acyclic graph of N nodes.  Find all possible
 * paths from node 0 to node N-1, and return them in any order.
 *
 * The graph is given as follows:  the nodes are 0, 1, ..., graph.length - 1.
 * graph[i] is a list of all nodes j for which the edge (i, j) exists.
 *
 * Example:
 * Input: [[1,2], [3], [3], []]
 * Output: [[0,1,3],[0,2,3]]
 * Explanation: The graph looks like this:
 * 0--->1
 * |    |
 * v    v
 * 2--->3
 * There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.
 * Note:
 *
 * The number of nodes in the graph will be in the range [2, 15].
 * You can print different paths in any order, but you should keep the order of nodes inside one path.
 */

class Node {
  constructor(val) {
    this.val = val
    this.nextNodes = []
  }

  add(n) {
    this.nextNodes.push(n)
  }
}

class Graph {
  constructor(root, size) {
    this.root = root
    this.size = size
  }
}

function allPathsSourceTarget(graph) {
  const result = []

  function dfs(currentNode, path) {
    path.push(currentNode.val)

    if (currentNode.val === graph.size - 1) {
      result.push(path)
      return
    }

    for (let node of currentNode.nextNodes) {
      dfs(node, path.slice())
    }
  }

  dfs(graph.root, [])

  return result
}

const n0 = new Node(0)
const n1 = new Node(1)
const n2 = new Node(2)
const n3 = new Node(3)

n0.add(n1)
n0.add(n2)
n1.add(n3)
n2.add(n3)

const graph = new Graph(n0, 4)

console.log(allPathsSourceTarget(graph))

const a0 = new Node(0)
const a1 = new Node(1)
const a2 = new Node(2)
const a3 = new Node(3)
const a4 = new Node(4)
const a5 = new Node(5)
const a6 = new Node(6)
const a7 = new Node(7)

a0.add(a1)
a0.add(a7)

a1.add(a2)
a1.add(a5)

a2.add(a3)

a3.add(a4)

a4.add(a7)

a5.add(a3)
a5.add(a6)

a6.add(a4)
a6.add(a7)

const graph2 = new Graph(a0, 8)

console.log(allPathsSourceTarget(graph2))

console.log(allPathsSourceTarget(new Graph(new Node(0), 1)))

/**
 * https://leetcode.com/problems/graph-valid-tree/
 *
 * Given n nodes labeled from 0 to n-1 and a list of undirected edges
 * (each edge is a pair of nodes), write a function to check whether
 * these edges make up a valid tree.
 *
 *
 * Example 1:
 *
 * Input: n = 5, and edges = [[0,1], [0,2], [0,3], [1,4]]
 * Output: true
 *
 *
 * Example 2:
 *
 * Input: n = 5, and edges = [[0,1], [1,2], [2,3], [1,3], [1,4]]
 * Output: false
 *
 *
 * Note: you can assume that no duplicate edges will appear in edges.
 * Since all edges are undirected, [0,1] is the same as [1,0] and thus
 * will not appear together in edges.
 */

function validTreeBFS(n, edges) {
  if (edges.length !== n - 1) {
    return false
  }

  const lookup = buildLookup(n, edges)

  if (lookup.reduce((acc, curr) => curr && acc.length === 0, false)) {
    return false
  }

  const visited = bfs(lookup)

  return visited.reduce((acc, curr) => acc && curr, true)

  function bfs(lookup) {
    const visited = Array.from({ length: n }, () => false)

    let currentLayer = [0]
    while (currentLayer.length !== 0) {
      const nextLayer = []
      for (let node of currentLayer) {
        visited[node] = true
        for (let linkedNode of lookup[node]) {
          if (!visited[linkedNode]) {
            nextLayer.push(linkedNode)
          }
        }
      }
      currentLayer = nextLayer
    }

    return visited
  }

  function buildLookup(n, edges) {
    const lookup = Array.from({ length: n }, () => [])

    for (let edge of edges) {
      const [n1, n2] = edge
      lookup[n1].push(n2)
      lookup[n2].push(n1)
    }

    return lookup
  }
}

console.log(
  validTreeBFS(5, [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
  ])
)

console.log(
  validTreeBFS(7, [
    [0, 1],
    [0, 2],
    [1, 2],
    [0, 3],
    [2, 4],
    [3, 4],
  ])
)

console.log(
  validTreeBFS(7, [
    [0, 1],
    [0, 2],
    [1, 5],
    [0, 3],
    [2, 4],
    [3, 6],
  ])
)

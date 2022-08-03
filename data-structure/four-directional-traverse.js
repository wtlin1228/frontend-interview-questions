const directions = [
  [0, 1], // right
  [1, 0], // down
  [0, -1], // left
  [-1, 0], // up
]

const getNext = ([a1, b1]) => {
  return directions.map(([a2, b2]) => [a1 + a2, b1 + b2])
}

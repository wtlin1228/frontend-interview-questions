const create2DArray = (rowCount, columnCount, generateInitialValue) => {
  return Array(rowCount)
    .fill()
    .map(() => Array(columnCount).fill().map(generateInitialValue))
}

const create2DArray = (rowCount, columnCount, initialValue) => {
  return Array(rowCount).fill(Array(columnCount).fill(initialValue))
}

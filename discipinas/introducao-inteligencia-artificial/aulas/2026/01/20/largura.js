const WIDTH = 5

const map = [
  [0, 1, 1, 1, 1],
  [0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1],
  [0, 0, 1, 0, 1],
  [0, 0, 1, 0, 0],
]

const begin = [0, 0]
const end = [4, 4]

const findPath = (start, end, map) => {
  const queue = [[start]]
  const visited = new Set([start.toString()])

  while (queue.length > 0) {
    const path = queue.shift()
    const [row, col] = path[path.length - 1]

    if (row === end[0] && col === end[1]) {
      return path
    }

    // Possible moves: up, down, left, right
    const moves = [
      [row - 1, col], // up
      [row + 1, col], // down
      [row, col - 1], // left
      [row, col + 1], // right
    ]

    for (const move of moves) {
      const [nextRow, nextCol] = move

      // Check boundaries
      if (nextRow >= 0 && nextRow < WIDTH && nextCol >= 0 && nextCol < WIDTH) {
        // Check if it's a valid path and not visited
        if (map[nextRow][nextCol] === 0 && !visited.has(move.toString())) {
          visited.add(move.toString())
          const newPath = [...path, move]
          queue.push(newPath)
        }
      }
    }
  }

  return null
}

const way = findPath(begin, end, map)
console.log('way', way)

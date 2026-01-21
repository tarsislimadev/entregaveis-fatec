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

const step = (here, there, map, steps = []) => {
  const [x_here, y_here] = here
  const [x_there, y_there] = there

  // is it final?
  if (x_here == x_there && y_here == y_there) {
    return steps
  }

  // find neighbors
  const neighbors = [
    [x_here - 1, y_here], // up
    [x_here + 1, y_here], // down
    [x_here, y_here - 1], // left
    [x_here, y_here + 1], // right
  ].filter(([x, y]) => x >= 0 && x <= WIDTH && y >= 0 && y <= WIDTH)

  console.log({ neighbors })

  // neighbors.map(([y, x]) => console.log({ x, y, local: map[x][y] }))

  return null
}

const way = step(begin, end, map, [begin])
console.log({ way })

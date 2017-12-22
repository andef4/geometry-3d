export default function perspectiveProjectionMatrix (xIntercept, yIntercept, zIntercept) {
  return [[1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [1 / xIntercept, 1 / yIntercept, 1 / zIntercept, 1]]
}

export function rotationMatrix (a) {
  let radians = a * (Math.PI / 180)
  return [[Math.cos(radians), -Math.sin(radians)],
          [Math.sin(radians), Math.cos(radians)]]
}

export function shearMatrixX (m) {
  return [[1, m],
          [0, 1]]
}

export function shearMatrixY (m) {
  return [[1, 0],
          [m, 1]]
}

export function stretchMatrixX (x) {
  return [[x, 0],
          [0, 1]]
}

export function stretchMatrixY (y) {
  return [[1, 0],
          [0, y]]
}

export function mirrorMatrix (a) {
  return [[Math.cos(2 * a), Math.sin(2 * a)],
          [Math.sin(2 * a), -Math.cos(2 * a)]]
}

export function applyMatrixToVector (matrix, vector) {
  return {
    x: vector.x * matrix[0][0] + vector.y * matrix[0][1],
    y: vector.x * matrix[1][0] + vector.y * matrix[1][1]
  }
}

import cloneDeep from 'lodash.clonedeep'

export function translationMatrix (x, y) {
  return [[1, 0, x],
          [0, 1, y],
          [0, 0, 1]]
}

export function rotationMatrix (a) {
  let radians = a * (Math.PI / 180)
  return [[Math.cos(radians), -Math.sin(radians), 0],
          [Math.sin(radians), Math.cos(radians), 0],
          [0, 0, 1]]
}

export function shearMatrixX (m) {
  return [[1, m, 0],
          [0, 1, 0],
          [0, 0, 1]]
}

export function shearMatrixY (m) {
  return [[1, 0, 0],
          [m, 1, 0],
          [0, 0, 1]]
}

export function stretchMatrixX (x) {
  return [[x, 0, 0],
          [0, 1, 0],
          [0, 0, 1]]
}

export function stretchMatrixY (y) {
  return [[1, 0, 0],
          [0, y, 0],
          [0, 0, 1]]
}

export function mirrorMatrix (a) {
  return [[Math.cos(2 * a), Math.sin(2 * a), 0],
          [Math.sin(2 * a), -Math.cos(2 * a), 0],
          [0, 0, 1]]
}

export function perspectiveProjectionMatrix (xIntercept, yIntercept) {
  return [[1, 0, 0],
          [0, 1, 0],
          [1 / xIntercept, 1 / yIntercept, 1]]
}

export function matricesMultiplication3x3 (matrix1, ...matrices) {
  let newMatrix = cloneDeep(matrix1)
  matrices.forEach((matrix) => {
    let tempMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    // first row
    tempMatrix[0][0] = newMatrix[0][0] * matrix[0][0] + newMatrix[0][1] * matrix[1][0] + newMatrix[0][2] * matrix[2][0]
    tempMatrix[0][1] = newMatrix[0][0] * matrix[0][1] + newMatrix[0][1] * matrix[1][1] + newMatrix[0][2] * matrix[2][1]
    tempMatrix[0][2] = newMatrix[0][0] * matrix[0][2] + newMatrix[0][1] * matrix[1][2] + newMatrix[0][2] * matrix[2][2]
    // second row
    tempMatrix[1][0] = newMatrix[1][0] * matrix[0][0] + newMatrix[1][1] * matrix[1][0] + newMatrix[1][2] * matrix[2][0]
    tempMatrix[1][1] = newMatrix[1][0] * matrix[0][1] + newMatrix[1][1] * matrix[1][1] + newMatrix[1][2] * matrix[2][1]
    tempMatrix[1][2] = newMatrix[1][0] * matrix[0][2] + newMatrix[1][1] * matrix[1][2] + newMatrix[1][2] * matrix[2][2]
    // third row
    tempMatrix[2][0] = newMatrix[2][0] * matrix[0][0] + newMatrix[2][1] * matrix[1][0] + newMatrix[2][2] * matrix[2][0]
    tempMatrix[2][1] = newMatrix[2][0] * matrix[0][1] + newMatrix[2][1] * matrix[1][1] + newMatrix[2][2] * matrix[2][1]
    tempMatrix[2][2] = newMatrix[2][0] * matrix[0][2] + newMatrix[2][1] * matrix[1][2] + newMatrix[2][2] * matrix[2][2]
    newMatrix = tempMatrix
  })
  return newMatrix
}

export function applyMatrixToVector (matrix, vector) {
  let newVector = [0, 0, 0]
  newVector[0] = vector.x * matrix[0][0] + vector.y * matrix[0][1] + matrix[0][2]
  newVector[1] = vector.x * matrix[1][0] + vector.y * matrix[1][1] + matrix[1][2]
  newVector[2] = vector.x * matrix[2][0] + vector.y * matrix[2][1] + matrix[2][2]
  // convert back to non-homogeneous coordinates
  return {
    x: newVector[0] / newVector[2],
    y: newVector[1] / newVector[2]
  }
}

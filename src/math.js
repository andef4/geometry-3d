import cloneDeep from 'lodash.clonedeep'

export function translationMatrix (x, y) {
  return [[1, 0, x],
          [0, 1, y],
          [0, 0, 1]]
}

export function rotationMatrix (a) {
  return [[Math.cos(a), -Math.sin(a), 0],
          [Math.sin(a), Math.cos(a), 0],
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

export function matricesMultiplication3x3 (matrix1, ...matrices) {
  let newMatrix = cloneDeep(matrix1)
  matrices.forEach((matrix) => {
    let tempMatrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
    // first row
    tempMatrix[0][0] = matrix1[0][0] * matrix[0][0] + matrix1[0][1] * matrix[1][0] + matrix1[0][2] * matrix[2][0]
    tempMatrix[0][1] = matrix1[0][0] * matrix[0][1] + matrix1[0][1] * matrix[1][1] + matrix1[0][2] * matrix[2][1]
    tempMatrix[0][2] = matrix1[0][0] * matrix[0][2] + matrix1[0][1] * matrix[1][2] + matrix1[0][2] * matrix[2][2]
    // second row
    tempMatrix[1][0] = matrix1[1][0] * matrix[0][0] + matrix1[1][1] * matrix[1][0] + matrix1[1][2] * matrix[2][0]
    tempMatrix[1][1] = matrix1[1][0] * matrix[0][1] + matrix1[1][1] * matrix[1][1] + matrix1[1][2] * matrix[2][1]
    tempMatrix[1][2] = matrix1[1][0] * matrix[0][2] + matrix1[1][1] * matrix[1][2] + matrix1[1][2] * matrix[2][2]
    // third row
    tempMatrix[2][0] = matrix1[2][0] * matrix[0][0] + matrix1[2][1] * matrix[1][0] + matrix1[2][2] * matrix[2][0]
    tempMatrix[2][1] = matrix1[2][0] * matrix[0][1] + matrix1[2][1] * matrix[1][1] + matrix1[2][2] * matrix[2][1]
    tempMatrix[2][2] = matrix1[2][0] * matrix[0][2] + matrix1[2][1] * matrix[1][2] + matrix1[2][2] * matrix[2][2]
    newMatrix = tempMatrix
  })
  return newMatrix
}

export function applyMatrixToVector (matrix, vector) {
  let newVector = [vector.x, vector.y, 1]
  newVector[0] = newVector[0] * matrix[0][0] + newVector[1] * matrix[0][1] + newVector[2] * matrix[0][2]
  newVector[1] = newVector[0] * matrix[1][0] + newVector[1] * matrix[1][1] + newVector[2] * matrix[1][2]
  newVector[2] = newVector[0] * matrix[2][0] + newVector[1] * matrix[2][1] + newVector[2] * matrix[2][2]
  // convert back to non-homogeneous coordinates
  return {
    x: newVector[0] / newVector[2],
    y: newVector[1] / newVector[2]
  }
}

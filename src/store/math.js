import cloneDeep from 'lodash.clonedeep'

export function translationMatrix (x, y, z) {
  return [[1, 0, 0, x],
          [0, 1, 0, y],
          [0, 0, 1, z],
          [0, 0, 0, 1]]
}

export function stretchMatrixX (x) {
  return [[x, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]]
}

export function stretchMatrixY (y) {
  return [[1, 0, 0, 0],
          [0, y, 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]]
}

export function stretchMatrixZ (z) {
  return [[1, 0, 0, 0],
          [0, 1, 0, 0],
          [0, 0, z, 0],
          [0, 0, 0, 1]]
}

export function shearMatrix (yx, zx, xy, zy, xz, yz) {
  return [[1, yx, zx, 0],
          [xy, 1, zy, 0],
          [xz, yz, 1, 0],
          [0, 0, 0, 1]]
}

// apply matrix to vector (affine)
export function applyMatrixToVector3A (matrix, vector) {
  let newVector = [0, 0, 0]
  newVector[0] = vector.x * matrix[0][0] + vector.y * matrix[0][1] + matrix[0][2] * vector.z
  newVector[1] = vector.x * matrix[1][0] + vector.y * matrix[1][1] + matrix[1][2] * vector.z
  newVector[2] = vector.x * matrix[2][0] + vector.y * matrix[2][1] + matrix[2][2] * vector.z
  return {
    x: newVector[0],
    y: newVector[1],
    z: newVector[2]
  }
}

export function matricesMultiplication3 (matrix1, ...matrices) {
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

export function matricesMultiplication4 (matrix1, ...matrices) {
  let newMatrix = cloneDeep(matrix1)
  matrices.forEach((matrix) => {
    let tempMatrix = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]
    // first row
    tempMatrix[0][0] = newMatrix[0][0] * matrix[0][0] + newMatrix[0][1] * matrix[1][0] + newMatrix[0][2] * matrix[2][0] + newMatrix[0][3] * matrix[3][0]
    tempMatrix[0][1] = newMatrix[0][0] * matrix[0][1] + newMatrix[0][1] * matrix[1][1] + newMatrix[0][2] * matrix[2][1] + newMatrix[0][3] * matrix[3][1]
    tempMatrix[0][2] = newMatrix[0][0] * matrix[0][2] + newMatrix[0][1] * matrix[1][2] + newMatrix[0][2] * matrix[2][2] + newMatrix[0][3] * matrix[3][2]
    tempMatrix[0][3] = newMatrix[0][0] * matrix[0][3] + newMatrix[0][1] * matrix[1][3] + newMatrix[0][2] * matrix[2][3] + newMatrix[0][3] * matrix[3][3]
    // second row
    tempMatrix[1][0] = newMatrix[1][0] * matrix[0][0] + newMatrix[1][1] * matrix[1][0] + newMatrix[1][2] * matrix[2][0] + newMatrix[1][3] * matrix[3][0]
    tempMatrix[1][1] = newMatrix[1][0] * matrix[0][1] + newMatrix[1][1] * matrix[1][1] + newMatrix[1][2] * matrix[2][1] + newMatrix[1][3] * matrix[3][1]
    tempMatrix[1][2] = newMatrix[1][0] * matrix[0][2] + newMatrix[1][1] * matrix[1][2] + newMatrix[1][2] * matrix[2][2] + newMatrix[1][3] * matrix[3][2]
    tempMatrix[1][3] = newMatrix[1][0] * matrix[0][3] + newMatrix[1][1] * matrix[1][3] + newMatrix[1][2] * matrix[2][3] + newMatrix[1][3] * matrix[3][3]
    // third row
    tempMatrix[2][0] = newMatrix[2][0] * matrix[0][0] + newMatrix[2][1] * matrix[1][0] + newMatrix[2][2] * matrix[2][0] + newMatrix[2][3] * matrix[3][0]
    tempMatrix[2][1] = newMatrix[2][0] * matrix[0][1] + newMatrix[2][1] * matrix[1][1] + newMatrix[2][2] * matrix[2][1] + newMatrix[2][3] * matrix[3][1]
    tempMatrix[2][2] = newMatrix[2][0] * matrix[0][2] + newMatrix[2][1] * matrix[1][2] + newMatrix[2][2] * matrix[2][2] + newMatrix[2][3] * matrix[3][2]
    tempMatrix[2][3] = newMatrix[2][0] * matrix[0][3] + newMatrix[2][1] * matrix[1][3] + newMatrix[2][2] * matrix[2][3] + newMatrix[2][3] * matrix[3][3]
    // fourth row
    tempMatrix[3][0] = newMatrix[3][0] * matrix[0][0] + newMatrix[3][1] * matrix[1][0] + newMatrix[3][2] * matrix[2][0] + newMatrix[3][3] * matrix[3][0]
    tempMatrix[3][1] = newMatrix[3][0] * matrix[0][1] + newMatrix[3][1] * matrix[1][1] + newMatrix[3][2] * matrix[2][1] + newMatrix[3][3] * matrix[3][1]
    tempMatrix[3][2] = newMatrix[3][0] * matrix[0][2] + newMatrix[3][1] * matrix[1][2] + newMatrix[3][2] * matrix[2][2] + newMatrix[3][3] * matrix[3][2]
    tempMatrix[3][3] = newMatrix[3][0] * matrix[0][3] + newMatrix[3][1] * matrix[1][3] + newMatrix[3][2] * matrix[2][3] + newMatrix[3][3] * matrix[3][3]

    newMatrix = tempMatrix
  })
  return newMatrix
}

// apply matrix to vector (homogeneous version)
export function applyMatrixToVector4H (matrix, vector) {
  let newVector = [0, 0, 0, 0]
  newVector[0] = vector.x * matrix[0][0] + vector.y * matrix[0][1] + vector.z * matrix[0][2] + matrix[0][3]
  newVector[1] = vector.x * matrix[1][0] + vector.y * matrix[1][1] + vector.z * matrix[1][2] + matrix[1][3]
  newVector[2] = vector.x * matrix[2][0] + vector.y * matrix[2][1] + vector.z * matrix[2][2] + matrix[2][3]
  newVector[3] = vector.x * matrix[3][0] + vector.y * matrix[3][1] + vector.z * matrix[3][2] + matrix[3][3]
  // convert back to non-homogeneous coordinates
  return {
    x: newVector[0] / newVector[3],
    y: newVector[1] / newVector[3],
    z: newVector[2] / newVector[3]
  }
}

export function identityMatrix3 () {
  return [[1, 0, 0],
          [0, 1, 0],
          [0, 0, 1]]
}

export function matrixScalarMultiplication3 (matrix, scalar) {
  return [[matrix[0][0] * scalar, matrix[0][1] * scalar, matrix[0][2] * scalar],
          [matrix[1][0] * scalar, matrix[1][1] * scalar, matrix[1][2] * scalar],
          [matrix[2][0] * scalar, matrix[2][1] * scalar, matrix[2][2] * scalar]]
}

export function matricesAddition3 (matrix1, ...matrices) {
  let newMatrix = cloneDeep(matrix1)
  matrices.forEach((matrix) => {
    newMatrix[0][0] = newMatrix[0][0] + matrix[0][0]
    newMatrix[0][1] = newMatrix[0][1] + matrix[0][1]
    newMatrix[0][2] = newMatrix[0][2] + matrix[0][2]

    newMatrix[1][0] = newMatrix[1][0] + matrix[1][0]
    newMatrix[1][1] = newMatrix[1][1] + matrix[1][1]
    newMatrix[1][2] = newMatrix[1][2] + matrix[1][2]

    newMatrix[2][0] = newMatrix[2][0] + matrix[2][0]
    newMatrix[2][1] = newMatrix[2][1] + matrix[2][1]
    newMatrix[2][2] = newMatrix[2][2] + matrix[2][2]
  })
  return newMatrix
}

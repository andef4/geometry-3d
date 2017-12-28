// import { rotationMatrixX, rotationMatrixY } from './rotation/eulerAffine'
// import { applyMatrixToVector3A } from './math'

export default function ({ state, commit }, { a, b, c, d }) {
  // make unit vector from a b c
  let length = Math.sqrt(a * a + b * b + c * c)
  a /= length
  b /= length
  c /= length

  // let matrix = [[1 - 2 * a * a, -2 * a * b, -2 * a * c, -2 * a * d],
  //          [-2 * a * c, -2 * b * c, 1 - 2 * c * c, -2 * c * d],
  //          [-2 * a * b, 1 - 2 * b * b, -2 * b * c, -2 * b * d],
  //          [0, 0, 0, 1]]
  // commit('applyMatrix4', { matrix })
  let matrix = [[1 - 2 * a * a, -2 * a * b, -2 * a * c],
           [-2 * a * b, 1 - 2 * b * b, -2 * b * c],
           [-2 * a * c, -2 * b * c, 1 - 2 * c * c]]
  commit('applyMatrix3', { matrix })
  // let planeX = -(d / a)
  // let planeY = -(d / b)
  // let planeZ = -(d / c)
  //
  // let xAngle = Math.atan2(planeY, planeZ)
  // let yAngle = Math.atan2(planeX, planeZ)
  //
  // let xRotationMatrix = rotationMatrixX(-xAngle)
  // let xRotationMatrixInverse = rotationMatrixX(xAngle)
  // let yRotationMatrix = rotationMatrixY(-yAngle)
  // let yRotationMatrixInverse = rotationMatrixY(yAngle)
  //
  // for (let i = 0; i < state.coordinates.length; i++) {
  //   let coordinate = state.coordinates[i]
  //   coordinate = applyMatrixToVector3A(xRotationMatrix, coordinate)
  //   coordinate = applyMatrixToVector3A(yRotationMatrix, coordinate)
  //   coordinate.z = -coordinate.z
  //   coordinate = applyMatrixToVector3A(yRotationMatrixInverse, coordinate)
  //   coordinate = applyMatrixToVector3A(xRotationMatrixInverse, coordinate)
  //   commit('updateCoordinate', { index: i, coordinate: coordinate })
  // }
}

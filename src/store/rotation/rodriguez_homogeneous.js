
import { matricesMultiplication3, identityMatrix3, matrixScalarMultiplication3, matricesAddition3 } from '../math'

function rotationMatrixX (a) {
  let radians = a * (Math.PI / 180)
  return rodriguez([1, 0, 0], radians)
}

function rotationMatrixY (a) {
  let radians = a * (Math.PI / 180)
  return rodriguez([0, 1, 0], radians)
}

function rotationMatrixZ (a) {
  let radians = a * (Math.PI / 180)
  return rodriguez([0, 0, 1], radians)
}

/*
n: unit vector describing the rotation axis
a: angle
 */
function rodriguez (n, a) {
  let N = [[0, -n[2], n[1]],
           [n[2], 0, -n[0]],
           [-n[1], n[0], 0]]

  let I = identityMatrix3()
  let sinN = matrixScalarMultiplication3(N, Math.sin(a))
  let cos1Ncubic = matrixScalarMultiplication3(matricesMultiplication3(N, N), 1 - Math.cos(a))

  let matrix3 = matricesAddition3(I, sinN, cos1Ncubic)
  return [[matrix3[0][0], matrix3[0][1], matrix3[0][2], 0],
          [matrix3[1][0], matrix3[1][1], matrix3[1][2], 0],
          [matrix3[2][0], matrix3[2][1], matrix3[2][2], 0],
          [0, 0, 0, 1]]
}

export default {
  rotateOriginClockwiseX ({ commit }) {
    let matrix = rotationMatrixX(15)
    commit('applyMatrix4', { matrix })
  },
  rotateOriginCounterClockwiseX ({ commit }) {
    let matrix = rotationMatrixX(-15)
    commit('applyMatrix4', { matrix })
  },
  rotateOriginClockwiseY ({ commit }) {
    let matrix = rotationMatrixY(15)
    commit('applyMatrix4', { matrix })
  },
  rotateOriginCounterClockwiseY ({ commit }) {
    let matrix = rotationMatrixY(-15)
    commit('applyMatrix4', { matrix })
  },
  rotateOriginClockwiseZ ({ commit }) {
    let matrix = rotationMatrixZ(15)
    commit('applyMatrix4', { matrix })
  },
  rotateOriginCounterClockwiseZ ({ commit }) {
    let matrix = rotationMatrixZ(-15)
    commit('applyMatrix4', { matrix })
  },

  rotateCenterClockwiseX ({ dispatch }) {
    let matrix = rotationMatrixX(15)
    dispatch('applyMatrixCenter4', { matrix })
  },
  rotateCenterCounterClockwiseX ({ dispatch }) {
    let matrix = rotationMatrixX(-15)
    dispatch('applyMatrixCenter4', { matrix })
  },
  rotateCenterClockwiseY ({ dispatch }) {
    let matrix = rotationMatrixY(15)
    dispatch('applyMatrixCenter4', { matrix })
  },
  rotateCenterCounterClockwiseY ({ dispatch }) {
    let matrix = rotationMatrixY(-15)
    dispatch('applyMatrixCenter4', { matrix })
  },
  rotateCenterClockwiseZ ({ dispatch }) {
    let matrix = rotationMatrixZ(15)
    dispatch('applyMatrixCenter4', { matrix })
  },
  rotateCenterCounterClockwiseZ ({ dispatch }) {
    let matrix = rotationMatrixZ(-15)
    dispatch('applyMatrixCenter4', { matrix })
  }
}

import base from './base'

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

export default function () {
  return base(4, rotationMatrixX, rotationMatrixY, rotationMatrixZ)
}

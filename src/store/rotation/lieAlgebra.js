import { identityMatrix3, matricesAddition3, matricesMultiplication3, matrixDivision3 } from '../math'
import base from './base'

/**
 * Generate a so(3) lie algebra and convert it to the associated SO(3) rotation group
 */
function rotation (x, y, z) {
  let so = [[0, z, y],
            [z, 0, -x],
            [-y, x, 0]]
  return expm3(so)
}

function expm3 (matrix) {
  let ret = identityMatrix3()
  for (let k = 1; k < 100; k++) {
    let Xk = powm3(matrix, k)
    let kFact = fact(k)
    let mat = matrixDivision3(Xk, kFact)
    ret = matricesAddition3(ret, mat)
  }
  return ret
}

function powm3 (matrix, exp) {
  let args = []
  for (let i = 0; i < exp; i++) {
    args.push(matrix)
  }
  return matricesMultiplication3.apply(null, args)
}

function fact (num) {
  let ret = 1
  for (let i = 2; i <= num; i++) {
    ret = ret * i
  }
  return ret
}

function rotationMatrixX (a) {
  let radians = a * (Math.PI / 180)
  return rotation(radians, 0, 0)
}

function rotationMatrixY (a) {
  let radians = a * (Math.PI / 180)
  return rotation(0, radians, 0)
}

function rotationMatrixZ (a) {
  let radians = a * (Math.PI / 180)
  return rotation(0, 0, radians)
}

export default function () {
  return base(3, rotationMatrixX, rotationMatrixY, rotationMatrixZ)
}

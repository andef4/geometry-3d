import base from './base'

function rotationMatrixX (a) {
  let radians = a * (Math.PI / 180)
  return [[1, 0, 0, 0],
          [0, Math.cos(radians), Math.sin(radians), 0],
          [0, -Math.sin(radians), Math.cos(radians), 0],
          [0, 0, 0, 1]]
}

function rotationMatrixY (a) {
  let radians = a * (Math.PI / 180)
  return [[Math.cos(radians), 0, -Math.sin(radians), 0],
          [0, 1, 0, 0],
          [Math.sin(radians), 0, Math.cos(radians), 0],
          [0, 0, 0, 1]]
}

function rotationMatrixZ (a) {
  let radians = a * (Math.PI / 180)
  return [[Math.cos(radians), Math.sin(radians), 0, 0],
          [-Math.sin(radians), Math.cos(radians), 0, 0],
          [0, 0, 1, 0],
          [0, 0, 0, 1]]
}

export default function () {
  return base(4, rotationMatrixX, rotationMatrixY, rotationMatrixZ)
}

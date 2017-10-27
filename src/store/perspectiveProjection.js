import {
  translationMatrix, rotationMatrix, applyMatrixToVector, matricesMultiplication3x3
} from '@/store/homogeneous/math'

const focalLength = 300

const projectionMatrix = (yIntercept) => {
  return [[1, 0, 0],
          [0, 1, 0],
          [0, 1 / yIntercept, 0]]
}

export default function (state) {
  let vx = state.uv.vx - state.uv.ux
  let vy = state.uv.vy - state.uv.uy

  let imageWidth = Math.sqrt(vx * vx + vy * vy)
  let angle = Math.acos(vx / imageWidth) * (180 / Math.PI)
  imageWidth = Math.round(imageWidth)

  let translation1 = translationMatrix(-state.uv.ux, -state.uv.uy)
  let translationInverse = translationMatrix(state.uv.ux, state.uv.uy)
  let translation2 = translationMatrix(-imageWidth / 2, focalLength)

  let rotation = rotationMatrix(-angle)
  let rotationInverse = rotationMatrix(angle)

  let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
  let matrixInverse = matricesMultiplication3x3(translationInverse, rotationInverse)

  let coordinates = {
    a: {...applyMatrixToVector(matrix, state.coordinates.a)},
    b: {...applyMatrixToVector(matrix, state.coordinates.b)},
    c: {...applyMatrixToVector(matrix, state.coordinates.c)},
    d: {...applyMatrixToVector(matrix, state.coordinates.d)}
  }

  const COLOR_TRANSPARENT = 0
  const COLOR_RED = 1
  const COLOR_BLACK = 2

  let zBuffer = []
  for (let x = 0; x < imageWidth; x++) {
    zBuffer.push({color: COLOR_TRANSPARENT, distance: 10000})
  }

  let projection = projectionMatrix(focalLength)

  // A => B
  fillZBuffer(zBuffer, projection, imageWidth, COLOR_BLACK, coordinates.a.x, coordinates.a.y,
    coordinates.b.x, coordinates.b.y)
  // B => middle of B/C
  fillZBuffer(zBuffer, projection, imageWidth, COLOR_BLACK, coordinates.b.x, coordinates.b.y,
    (coordinates.b.x + coordinates.c.x) / 2, (coordinates.b.y + coordinates.c.y) / 2)
  // middle of B/C => C
  fillZBuffer(zBuffer, projection, imageWidth, COLOR_RED, (coordinates.b.x + coordinates.c.x) / 2,
    (coordinates.b.y + coordinates.c.y) / 2, coordinates.c.x, coordinates.c.y)
  // C => middle of C/D
  fillZBuffer(zBuffer, projection, imageWidth, COLOR_RED, coordinates.c.x, coordinates.c.y,
    (coordinates.c.x + coordinates.d.x) / 2, (coordinates.c.y + coordinates.d.y) / 2)
  // middle of C/D => D
  fillZBuffer(zBuffer, projection, imageWidth, COLOR_BLACK, (coordinates.c.x + coordinates.c.x) / 2,
    (coordinates.c.y + coordinates.d.y) / 2, coordinates.c.x, coordinates.d.y)
  // D => A
  fillZBuffer(zBuffer, projection, imageWidth, COLOR_BLACK, coordinates.d.x, coordinates.d.y,
    coordinates.a.x, coordinates.a.y)

  let zBufferCoordinates = []
  for (let x = 0; x < zBuffer.length; x++) {
    zBufferCoordinates.push({
      ...applyMatrixToVector(matrixInverse, { x, y: 0 }),
      color: zBuffer[x].color
    })
  }
  return zBufferCoordinates
}

const fillZBuffer = (zBuffer, projection, imageWidth, color, xStart, yStart, xEnd, yEnd) => {
  xStart = Math.round(xStart)
  xEnd = Math.round(xEnd)
  yStart = Math.round(yStart)
  yEnd = Math.round(yEnd)

  if (xStart > xEnd) {
    let tmpX = xStart
    let tmpY = yStart
    xStart = xEnd
    yStart = yEnd
    xEnd = tmpX
    yEnd = tmpY
  }

  xStart = applyMatrixToVector(projection, { x: xStart, y: yStart }).x
  xStart = Math.round(xStart) + imageWidth / 2

  xEnd = applyMatrixToVector(projection, { x: xEnd, y: yEnd }).x
  xEnd = Math.round(xEnd) + imageWidth / 2

  let yStep = (yStart - yEnd) / Math.abs(xStart - xEnd)
  let yValue = yStart

  if (xStart < 0) {
    yValue += yStep * -xStart
    xStart = 0
  }
  if (xEnd >= zBuffer.length) {
    xEnd = zBuffer.length - 1
  }

  for (let x = xStart; x < xEnd; x++, yValue -= yStep) {
    if (zBuffer[x].distance > yValue) {
      zBuffer[x].distance = yValue
      zBuffer[x].color = color
    }
  }
}

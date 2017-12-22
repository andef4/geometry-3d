
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

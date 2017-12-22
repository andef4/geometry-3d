
function rotationMatrixX (a) {
  let radians = a * (Math.PI / 180)
  return [[1, 0, 0],
          [0, Math.cos(radians), -Math.sin(radians)],
          [0, Math.sin(radians), Math.cos(radians)]]
}

function rotationMatrixY (a) {
  let radians = a * (Math.PI / 180)
  return [[Math.cos(radians), 0, -Math.sin(radians)],
          [0, 1, 0],
          [Math.sin(radians), 0, Math.cos(radians)]]
}

function rotationMatrixZ (a) {
  let radians = a * (Math.PI / 180)
  return [[Math.cos(radians), Math.sin(radians), 0],
          [-Math.sin(radians), Math.cos(radians), 0],
          [0, 0, 1]]
}

export default {
  rotateOriginClockwiseX ({ commit }) {
    let matrix = rotationMatrixX(15)
    commit('applyMatrix3', { matrix })
  },
  rotateOriginCounterClockwiseX ({ commit }) {
    let matrix = rotationMatrixX(-15)
    commit('applyMatrix3', { matrix })
  },
  rotateOriginClockwiseY ({ commit }) {
    let matrix = rotationMatrixY(15)
    commit('applyMatrix3', { matrix })
  },
  rotateOriginCounterClockwiseY ({ commit }) {
    let matrix = rotationMatrixY(-15)
    commit('applyMatrix3', { matrix })
  },
  rotateOriginClockwiseZ ({ commit }) {
    let matrix = rotationMatrixZ(15)
    commit('applyMatrix3', { matrix })
  },
  rotateOriginCounterClockwiseZ ({ commit }) {
    let matrix = rotationMatrixZ(-15)
    commit('applyMatrix3', { matrix })
  },

  rotateCenterClockwiseX ({ dispatch }) {
    let matrix = rotationMatrixX(15)
    dispatch('applyMatrixCenter3', { matrix })
  },
  rotateCenterCounterClockwiseX ({ dispatch }) {
    let matrix = rotationMatrixX(-15)
    dispatch('applyMatrixCenter3', { matrix })
  },
  rotateCenterClockwiseY ({ dispatch }) {
    let matrix = rotationMatrixY(15)
    dispatch('applyMatrixCenter3', { matrix })
  },
  rotateCenterCounterClockwiseY ({ dispatch }) {
    let matrix = rotationMatrixY(-15)
    dispatch('applyMatrixCenter3', { matrix })
  },
  rotateCenterClockwiseZ ({ dispatch }) {
    let matrix = rotationMatrixZ(15)
    dispatch('applyMatrixCenter3', { matrix })
  },
  rotateCenterCounterClockwiseZ ({ dispatch }) {
    let matrix = rotationMatrixZ(-15)
    dispatch('applyMatrixCenter3', { matrix })
  }
}

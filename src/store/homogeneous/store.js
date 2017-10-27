import {
  translationMatrix, rotationMatrix, matricesMultiplication3x3, applyMatrixToVector, shearMatrixX, shearMatrixY,
  stretchMatrixX, stretchMatrixY, mirrorMatrix
} from './math'

export let actions = {
  moveUp ({commit}) {
    let matrix = translationMatrix(0, 25)
    commit('applyMatrix', {matrix})
  },
  moveDown ({commit}) {
    let matrix = translationMatrix(0, -25)
    commit('applyMatrix', {matrix})
  },
  moveLeft ({commit}) {
    let matrix = translationMatrix(-25, 0)
    commit('applyMatrix', {matrix})
  },
  moveRight ({commit}) {
    let matrix = translationMatrix(25, 0)
    commit('applyMatrix', {matrix})
  },
  rotateCenterClockwise ({ dispatch }) {
    let matrix = rotationMatrix(-15)
    dispatch('applyMatrixCenter', { matrix })
  },
  rotateCenterCounterClockwise ({ dispatch }) {
    let matrix = rotationMatrix(15)
    dispatch('applyMatrixCenter', { matrix })
  },
  rotateOriginClockwise ({ commit }) {
    let matrix = rotationMatrix(-15)
    commit('applyMatrix', {matrix})
  },
  rotateOriginCounterClockwise ({ commit }) {
    let matrix = rotationMatrix(15)
    commit('applyMatrix', {matrix})
  },
  rotatePointClockwise ({ commit }, { x, y }) {
    let translation1 = translationMatrix(-x, -y)
    let rotation = rotationMatrix(-15)
    let translation2 = translationMatrix(x, y)
    let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
    commit('applyMatrix', {matrix})
  },
  rotatePointCounterClockwise ({ commit }, { x, y }) {
    let translation1 = translationMatrix(-x, -y)
    let rotation = rotationMatrix(15)
    let translation2 = translationMatrix(x, y)
    let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
    commit('applyMatrix', {matrix})
  },
  stretchX ({ dispatch }) {
    let matrix = stretchMatrixX(1.25)
    dispatch('applyMatrixCenter', { matrix })
  },
  contractX ({ dispatch }) {
    let matrix = stretchMatrixX(0.875)
    dispatch('applyMatrixCenter', { matrix })
  },
  stretchY ({ dispatch }) {
    let matrix = stretchMatrixY(1.25)
    dispatch('applyMatrixCenter', { matrix })
  },
  contractY ({ dispatch }) {
    let matrix = stretchMatrixY(0.875)
    dispatch('applyMatrixCenter', { matrix })
  },
  shearTopToRight ({ dispatch }) {
    let matrix = shearMatrixX(0.3)
    dispatch('applyMatrixCenter', { matrix })
  },
  shearTopToLeft ({ dispatch }) {
    let matrix = shearMatrixX(-0.3)
    dispatch('applyMatrixCenter', { matrix })
  },
  shearRightToTop ({ dispatch }) {
    let matrix = shearMatrixY(0.3)
    dispatch('applyMatrixCenter', { matrix })
  },
  shearRightToBottom ({ dispatch }) {
    let matrix = shearMatrixY(-0.3)
    dispatch('applyMatrixCenter', { matrix })
  },
  mirror ({ commit }, { a, b, c }) {
    let aNorm = -(a / b)
    let bNorm = -(c / b)

    let translation1 = translationMatrix(0, -bNorm)
    let mirror = mirrorMatrix(Math.atan(aNorm))
    let translation2 = translationMatrix(0, bNorm)
    let matrix = matricesMultiplication3x3(translation2, mirror, translation1)
    commit('applyMatrix', {matrix})
  },

  applyMatrixCenter ({ commit, getters }, { matrix }) {
    let center = getters.center
    let translation1 = translationMatrix(-center.x, -center.y)
    let translation2 = translationMatrix(center.x, center.y)
    let combinedMatrix = matricesMultiplication3x3(translation2, matrix, translation1)
    commit('applyMatrix', { matrix: combinedMatrix })
  }
}

export let mutations = {
  applyMatrix (state, { matrix }) {
    state.coordinates.a = { ...applyMatrixToVector(matrix, state.coordinates.a) }
    state.coordinates.b = { ...applyMatrixToVector(matrix, state.coordinates.b) }
    state.coordinates.c = { ...applyMatrixToVector(matrix, state.coordinates.c) }
    state.coordinates.d = { ...applyMatrixToVector(matrix, state.coordinates.d) }
  }
}

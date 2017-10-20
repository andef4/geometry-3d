import {
  rotationMatrix, applyMatrixToVector, shearMatrixX, shearMatrixY, mirrorMatrix,
  stretchMatrixX, stretchMatrixY
} from './math'

export let actions = {
  moveUp ({commit}) {
    commit('addVector', { x: 0, y: 25 })
  },
  moveDown ({commit}) {
    commit('addVector', { x: 0, y: -25 })
  },
  moveLeft ({commit}) {
    commit('addVector', { x: -25, y: 0 })
  },
  moveRight ({commit}) {
    commit('addVector', { x: 25, y: 0 })
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
    commit('addVector', {x: -x, y: -y})
    commit('applyMatrix', { matrix: rotationMatrix(-15) })
    commit('addVector', {x: x, y: y})
  },
  rotatePointCounterClockwise ({ commit }, { x, y }) {
    commit('addVector', {x: -x, y: -y})
    commit('applyMatrix', { matrix: rotationMatrix(15) })
    commit('addVector', {x: x, y: y})
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
    commit('addVector', {x: 0, y: -bNorm})
    commit('applyMatrix', { matrix: mirrorMatrix(Math.atan(aNorm)) })
    commit('addVector', {x: 0, y: bNorm})
  },
  applyMatrixCenter ({ commit, getters }, { matrix }) {
    let center = getters.center
    commit('addVector', {x: -center.x, y: -center.y})
    commit('applyMatrix', { matrix })
    commit('addVector', {x: center.x, y: center.y})
  }
}

export let mutations = {
  applyMatrix (state, { matrix }) {
    state.coordinates.a = { ...applyMatrixToVector(matrix, state.coordinates.a) }
    state.coordinates.b = { ...applyMatrixToVector(matrix, state.coordinates.b) }
    state.coordinates.c = { ...applyMatrixToVector(matrix, state.coordinates.c) }
    state.coordinates.d = { ...applyMatrixToVector(matrix, state.coordinates.d) }
  },

  addVector (state, { x, y }) {
    state.coordinates.a = { x: state.coordinates.a.x + x, y: state.coordinates.a.y + y }
    state.coordinates.b = { x: state.coordinates.b.x + x, y: state.coordinates.b.y + y }
    state.coordinates.c = { x: state.coordinates.c.x + x, y: state.coordinates.c.y + y }
    state.coordinates.d = { x: state.coordinates.d.x + x, y: state.coordinates.d.y + y }
  }
}

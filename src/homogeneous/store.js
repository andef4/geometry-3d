import { translationMatrix, rotationMatrix, matricesMultiplication3x3, applyMatrixToVector, shearMatrixX, shearMatrixY,
         stretchMatrixX, stretchMatrixY } from './math'

export let actions = {
  moveUp ({commit}) {
    let matrix = translationMatrix(0, 20)
    commit('applyMatrix', {matrix})
  },
  moveDown ({commit}) {
    let matrix = translationMatrix(0, -20)
    commit('applyMatrix', {matrix})
  },
  moveLeft ({commit}) {
    let matrix = translationMatrix(-20, 0)
    commit('applyMatrix', {matrix})
  },
  moveRight ({commit}) {
    let matrix = translationMatrix(20, 0)
    commit('applyMatrix', {matrix})
  },
  rotateCenterClockwise ({commit, getters}) {
    let center = getters.center
    let translation1 = translationMatrix(-center.x, -center.y)
    let rotation = rotationMatrix(-30)
    let translation2 = translationMatrix(center.x, center.y)
    let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
    commit('applyMatrix', {matrix})
  },
  rotateCenterCounterClockwise ({commit, getters}) {
    let center = getters.center
    let translation1 = translationMatrix(-center.x, -center.y)
    let rotation = rotationMatrix(30)
    let translation2 = translationMatrix(center.x, center.y)
    let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
    commit('applyMatrix', {matrix})
  },
  rotateOriginClockwise ({commit}) {
    let matrix = rotationMatrix(-30)
    commit('applyMatrix', {matrix})
  },
  rotateOriginCounterClockwise ({commit}) {
    let matrix = rotationMatrix(30)
    commit('applyMatrix', {matrix})
  },
  rotatePointClockwise ({commit}, {x, y}) {
    let translation1 = translationMatrix(-x, -y)
    let rotation = rotationMatrix(-30)
    let translation2 = translationMatrix(x, y)
    let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
    commit('applyMatrix', {matrix})
  },
  rotatePointCounterClockwise ({commit}, {x, y}) {
    let translation1 = translationMatrix(-x, -y)
    let rotation = rotationMatrix(30)
    let translation2 = translationMatrix(x, y)
    let matrix = matricesMultiplication3x3(translation2, rotation, translation1)
    commit('applyMatrix', {matrix})
  },
  stretchX ({commit}) {
    let matrix = stretchMatrixX(2)
    commit('applyMatrix', {matrix})
  },
  contractX ({commit}) {
    let matrix = stretchMatrixX(0.5)
    commit('applyMatrix', {matrix})
  },
  stretchY ({commit}) {
    let matrix = stretchMatrixY(2)
    commit('applyMatrix', {matrix})
  },
  contractY ({commit}) {
    let matrix = stretchMatrixY(0.5)
    commit('applyMatrix', {matrix})
  },
  shearTopToRight ({commit}) {
    let matrix = shearMatrixX(0.3)
    commit('applyMatrix', {matrix})
  },
  shearTopToLeft ({commit}) {
    let matrix = shearMatrixX(-0.3)
    commit('applyMatrix', {matrix})
  },
  shearRightToTop ({commit}) {
    let matrix = shearMatrixY(0.3)
    commit('applyMatrix', {matrix})
  },
  shearRightToBottom ({commit}) {
    let matrix = shearMatrixY(-0.3)
    commit('applyMatrix', {matrix})
  },
  mirror (state, {a, b, c}) {
    console.log('not implemented', a, b, c)
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

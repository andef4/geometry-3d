import Vue from 'vue'
import Vuex from 'vuex'

import { translationMatrix, rotationMatrix, matricesMultiplication3x3, applyMatrixToVector, shearMatrixX, shearMatrixY } from './math'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    coordinates: {
      a: {
        x: 100,
        y: 100
      },
      b: {
        x: 200,
        y: 100
      },
      c: {
        x: 200,
        y: 200
      },
      d: {
        x: 100,
        y: 200
      }
    }
  },
  getter: {
    center (state) {
      return {
        x: (state.coordinates.a.x + state.coordinates.c.x) / 2,
        y: (state.coordinates.a.y + state.coordinates.c.y) / 2
      }
    }
  },
  actions: {
    moveUp ({ commit }) {
      let matrix = translationMatrix(0, -10)
      commit('applyMatrix', { matrix })
    },
    moveDown ({ commit }) {
      let matrix = translationMatrix(0, 10)
      commit('applyMatrix', { matrix })
    },
    moveLeft ({ commit }) {
      let matrix = translationMatrix(-10, 0)
      commit('applyMatrix', { matrix })
    },
    moveRight ({ commit }) {
      let matrix = translationMatrix(10, 0)
      commit('applyMatrix', { matrix })
    },
    rotateCenter ({ commit, getters }) {
      let center = getters.center
      let translation1 = translationMatrix(-center.x, -center.y)
      let rotation = rotationMatrix(10)
      let translation2 = translationMatrix(center.x, center.y)
      let matrix = matricesMultiplication3x3(translation1, rotation, translation2)
      commit('applyMatrix', { matrix })
    },
    rotateCenterCounterClockwise ({ commit, getters }) {
      let center = getters.center
      let translation1 = translationMatrix(-center.x, -center.y)
      let rotation = rotationMatrix(-10)
      let translation2 = translationMatrix(center.x, center.y)
      let matrix = matricesMultiplication3x3(translation1, rotation, translation2)
      commit('applyMatrix', { matrix })
    },
    rotateOriginClockwise ({ commit }) {
      let matrix = rotationMatrix(10)
      commit('applyMatrix', { matrix })
    },
    rotateOriginCounterClockwise ({ commit }) {
      let matrix = rotationMatrix(-10)
      commit('applyMatrix', { matrix })
    },
    rotatePointClockwise ({ commit }, { x, y }) {
      let translation1 = translationMatrix(-x, -y)
      let rotation = rotationMatrix(10)
      let translation2 = translationMatrix(x, y)
      let matrix = matricesMultiplication3x3(translation1, rotation, translation2)
      commit('applyMatrix', { matrix })
    },
    rotatePointCounterClockwise ({ commit }, { x, y }) {
      let translation1 = translationMatrix(-x, -y)
      let rotation = rotationMatrix(10)
      let translation2 = translationMatrix(x, y)
      let matrix = matricesMultiplication3x3(translation1, rotation, translation2)
      commit('applyMatrix', { matrix })
    },
    stretch (state) {
      console.log('not implemented')
    },
    contract (state) {
      console.log('not implemented')
    },
    shearTopToRight ({ commit }) {
      let matrix = shearMatrixX(2)
      commit('applyMatrix', { matrix })
    },
    shearTopToLeft ({ commit }) {
      let matrix = shearMatrixX(-2)
      commit('applyMatrix', { matrix })
    },
    shearRightToTop ({ commit }) {
      let matrix = shearMatrixY(2)
      commit('applyMatrix', { matrix })
    },
    shearRightToBottom ({ commit }) {
      let matrix = shearMatrixY(-2)
      commit('applyMatrix', { matrix })
    },
    mirror (state, { a, b, c }) {
      console.log('not implemented', a, b, c)
    }
  },
  mutations: {
    applyMatrix (state, { matrix }) {
      state.coordinates.a = { ...applyMatrixToVector(matrix, state.coordinates.a) }
      state.coordinates.b = { ...applyMatrixToVector(matrix, state.coordinates.b) }
      state.coordinates.c = { ...applyMatrixToVector(matrix, state.coordinates.c) }
      state.coordinates.d = { ...applyMatrixToVector(matrix, state.coordinates.d) }
    }
  },
  strict: debug
})

import Vue from 'vue'
import Vuex from 'vuex'

import {
  translationMatrix, applyMatrixToVector3, applyMatrixToVector4
} from './math'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const initialState = () => {
  return {
    coordinates: {
      a: {
        x: 100,
        y: 200
      },
      b: {
        x: 150,
        y: 200
      },
      c: {
        x: 150,
        y: 150
      },
      d: {
        x: 100,
        y: 150
      }
    }
  }
}

export default new Vuex.Store({
  state: initialState(),
  actions: {
    moveXup ({commit}) {
      let matrix = translationMatrix(25, 0, 0)
      commit('applyMatrix4', {matrix})
    },
    moveXdown ({commit}) {
      let matrix = translationMatrix(-25, 0, 0)
      commit('applyMatrix4', {matrix})
    },
    moveYup ({commit}) {
      let matrix = translationMatrix(0, 25, 0)
      commit('applyMatrix4', {matrix})
    },
    moveYdown ({commit}) {
      let matrix = translationMatrix(0, -25, 0)
      commit('applyMatrix4', {matrix})
    },
    moveZup ({commit}) {
      let matrix = translationMatrix(0, 0, 25)
      commit('applyMatrix4', {matrix})
    },
    moveZdown ({commit}) {
      let matrix = translationMatrix(0, 0, -25)
      commit('applyMatrix4', {matrix})
    }
  },
  mutations: {
    applyMatrix3 (state, { matrix }) {
      state.coordinates.a = { ...applyMatrixToVector3(matrix, state.coordinates.a) }
      state.coordinates.b = { ...applyMatrixToVector3(matrix, state.coordinates.b) }
      state.coordinates.c = { ...applyMatrixToVector3(matrix, state.coordinates.c) }
      state.coordinates.d = { ...applyMatrixToVector3(matrix, state.coordinates.d) }
    },
    applyMatrix4 (state, { matrix }) {
      state.coordinates.a = { ...applyMatrixToVector4(matrix, state.coordinates.a) }
      state.coordinates.b = { ...applyMatrixToVector4(matrix, state.coordinates.b) }
      state.coordinates.c = { ...applyMatrixToVector4(matrix, state.coordinates.c) }
      state.coordinates.d = { ...applyMatrixToVector4(matrix, state.coordinates.d) }
    },
    reset (state) {
      Object.assign(state, initialState())
    }
  },
  strict: debug
})

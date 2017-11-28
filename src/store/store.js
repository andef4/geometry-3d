import Vue from 'vue'
import Vuex from 'vuex'

import {
  translationMatrix, applyMatrixToVector3, applyMatrixToVector4
} from './math'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const initialState = () => {
  return {
    coordinates: [
      { x: 0.5, y: 0.5, z: 0.5 },
      { x: 0.5, y: 0.5, z: -0.5 },
      { x: 0.5, y: -0.5, z: 0.5 },
      { x: 0.5, y: -0.5, z: -0.5 },
      { x: -0.5, y: 0.5, z: -0.5 },
      { x: -0.5, y: 0.5, z: 0.5 },
      { x: -0.5, y: -0.5, z: -0.5 },
      { x: -0.5, y: -0.5, z: 0.5 }
    ]
  }
}

export default new Vuex.Store({
  state: initialState(),
  actions: {
    moveXup ({commit}) {
      let matrix = translationMatrix(1, 0, 0)
      commit('applyMatrix4', {matrix})
    },
    moveXdown ({commit}) {
      let matrix = translationMatrix(-1, 0, 0)
      commit('applyMatrix4', {matrix})
    },
    moveYup ({commit}) {
      let matrix = translationMatrix(0, 1, 0)
      commit('applyMatrix4', {matrix})
    },
    moveYdown ({commit}) {
      let matrix = translationMatrix(0, -1, 0)
      commit('applyMatrix4', {matrix})
    },
    moveZup ({commit}) {
      let matrix = translationMatrix(0, 0, 1)
      commit('applyMatrix4', {matrix})
    },
    moveZdown ({commit}) {
      let matrix = translationMatrix(0, 0, -1)
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
      for (let i = 0; i < state.coordinates.length; i++) {
        Vue.set(state.coordinates, i, applyMatrixToVector4(matrix, state.coordinates[i]))
      }
    },
    reset (state) {
      Object.assign(state, initialState())
    }
  },
  strict: debug
})

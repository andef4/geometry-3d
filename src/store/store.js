import Vue from 'vue'
import Vuex from 'vuex'

import {
  translationMatrix, applyMatrixToVector4, matricesMultiplication4,
  stretchMatrixX, stretchMatrixY, stretchMatrixZ, shearMatrix
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
    moveXup ({ commit }) {
      let matrix = translationMatrix(1, 0, 0)
      commit('applyMatrix4', { matrix })
    },
    moveXdown ({ commit }) {
      let matrix = translationMatrix(-1, 0, 0)
      commit('applyMatrix4', { matrix })
    },
    moveYup ({ commit }) {
      let matrix = translationMatrix(0, 1, 0)
      commit('applyMatrix4', { matrix })
    },
    moveYdown ({ commit }) {
      let matrix = translationMatrix(0, -1, 0)
      commit('applyMatrix4', { matrix })
    },
    moveZup ({ commit }) {
      let matrix = translationMatrix(0, 0, 1)
      commit('applyMatrix4', { matrix })
    },
    moveZdown ({ commit }) {
      let matrix = translationMatrix(0, 0, -1)
      commit('applyMatrix4', { matrix })
    },
    stretchX ({ dispatch }) {
      let matrix = stretchMatrixX(1.25)
      dispatch('applyMatrixCenter4', { matrix })
    },
    contractX ({ dispatch }) {
      let matrix = stretchMatrixX(0.875)
      dispatch('applyMatrixCenter4', { matrix })
    },
    stretchY ({ dispatch }) {
      let matrix = stretchMatrixY(1.25)
      dispatch('applyMatrixCenter4', { matrix })
    },
    contractY ({ dispatch }) {
      let matrix = stretchMatrixY(0.875)
      dispatch('applyMatrixCenter4', { matrix })
    },
    stretchZ ({ dispatch }) {
      let matrix = stretchMatrixZ(1.25)
      dispatch('applyMatrixCenter4', { matrix })
    },
    contractZ ({ dispatch }) {
      let matrix = stretchMatrixZ(0.875)
      dispatch('applyMatrixCenter4', { matrix })
    },

    shearYXup ({ dispatch }) {
      console.log(1)
      let matrix = shearMatrix(0.5, 0, 0, 0, 0, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearYXdown ({ dispatch }) {
      let matrix = shearMatrix(-0.5, 0, 0, 0, 0, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearZXup ({ dispatch }) {
      let matrix = shearMatrix(0, 0.5, 0, 0, 0, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearZXdown ({ dispatch }) {
      let matrix = shearMatrix(0, -0.5, 0, 0, 0, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearXYup ({ dispatch }) {
      let matrix = shearMatrix(0, 0, 0.5, 0, 0, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearXYdown ({ dispatch }) {
      let matrix = shearMatrix(0, 0, -0.5, 0, 0, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearZYup ({ dispatch }) {
      let matrix = shearMatrix(0, 0, 0, 0.5, 0, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearZYdown ({ dispatch }) {
      let matrix = shearMatrix(0, 0, 0, -0.5, 0, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearXZup ({ dispatch }) {
      let matrix = shearMatrix(0, 0, 0, 0, 0.5, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearXZdown ({ dispatch }) {
      let matrix = shearMatrix(0, 0, 0, 0, -0.5, 0)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearYZup ({ dispatch }) {
      let matrix = shearMatrix(0, 0, 0, 0, 0, 0.5)
      dispatch('applyMatrixCenter4', { matrix })
    },
    shearYZdown ({ dispatch }) {
      let matrix = shearMatrix(0, 0, 0, 0, 0, -0.5)
      dispatch('applyMatrixCenter4', { matrix })
    },
     rotateOriginClockwiseX ({ dispatch }) {
      let matrix = ()
      commit('applyMatrix4', { matrix })
    },
     rotateOriginCounterClockwiseX ({ dispatch }) {
      let matrix = ()
      commit('applyMatrix4', { matrix })
    },
     rotateOriginClockwiseY ({ dispatch }) {
      let matrix = ()
      commit('applyMatrix4', { matrix })
    },
     rotateOriginCounterClockwiseY ({ dispatch }) {
      let matrix = ()
      commit('applyMatrix4', { matrix })
    },
     rotateOriginClockwiseZ ({ dispatch }) {
      let matrix = ()
      commit('applyMatrix4', { matrix })
    },
     rotateOriginCounterClockwiseZ ({ dispatch }) {
      let matrix = ()
      commit('applyMatrix4', { matrix })
    },

     rotateCenterClockwiseX ({ dispatch }) {
      let matrix = ()
      commit('applyMatrixCenter4', { matrix })
    },
     rotateCenterCounterClockwiseX ({ dispatch }) {
      let matrix = ()
      commit('applyMatrixCenter4', { matrix })
    },
     rotateCenterClockwiseY ({ dispatch }) {
      let matrix = ()
      commit('applyMatrixCenter4', { matrix })
    },
     rotateCenterCounterClockwiseY ({ dispatch }) {
      let matrix = ()
      commit('applyMatrixCenter4', { matrix })
    },
     rotateCenterClockwiseZ ({ dispatch }) {
      let matrix = ()
      commit('applyMatrixCenter4', { matrix })
    },
     rotateCenterCounterClockwiseZ ({ dispatch }) {
      let matrix = ()
      commit('applyMatrixCenter4', { matrix })
    },

    applyMatrixCenter4 ({ commit, getters }, { matrix }) {
      let center = getters.center
      let translation1 = translationMatrix(-center.x, -center.y, -center.z)
      let translation2 = translationMatrix(center.x, center.y, center.z)
      let combinedMatrix = matricesMultiplication4(translation2, matrix, translation1)
      commit('applyMatrix4', { matrix: combinedMatrix })
    }
  },
  mutations: {
    applyMatrix4 (state, { matrix }) {
      for (let i = 0; i < state.coordinates.length; i++) {
        Vue.set(state.coordinates, i, applyMatrixToVector4(matrix, state.coordinates[i]))
      }
    },

    reset (state) {
      Object.assign(state, initialState())
    }
  },
  getters: {
    center (state) {
      return {
        x: (state.coordinates[0].x + state.coordinates[6].x) / 2,
        y: (state.coordinates[0].y + state.coordinates[6].y) / 2,
        z: (state.coordinates[0].z + state.coordinates[6].z) / 2
      }
    }
  },
  strict: debug
})

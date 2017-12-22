import Vue from 'vue'
import Vuex from 'vuex'

import {
  translationMatrix, applyMatrixToVector3A, applyMatrixToVector4H, matricesMultiplication4,
  stretchMatrixX, stretchMatrixY, stretchMatrixZ, shearMatrix
} from './math'

import { multiplyQuaternionCenter, multiplyQuaternion } from './rotation/quaternion'

// import rotationActions from './rotation/euler_homogeneous'
// import rotationActions from './rotation/euler_affine'
// import rotationActions from './rotation/rodriguez_affine'
// import rotationActions from './rotation/rodriguez_homogeneous'
import rotationActions from './rotation/quaternion'  // eslint-disable-line no-duplicate-imports

import perspectiveProjectionMatrix from './perspective_projection'

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

    perspectiveProjection ({ dispatch }, { xIntercept, yIntercept, zIntercept }) {
      let matrix = perspectiveProjectionMatrix(xIntercept, yIntercept, zIntercept)
      dispatch('applyMatrixCenter4', { matrix })
    },

    // apply affine matrix to coordinates
    applyMatrixCenter3 ({ commit, getters }, { matrix }) {
      let center = getters.center
      commit('addVector', {x: -center.x, y: -center.y, z: -center.y})
      commit('applyMatrix3', { matrix })
      commit('addVector', {x: center.x, y: center.y, z: center.y})
    },

    // apply homogeneous matrix to coordinates
    applyMatrixCenter4 ({ commit, getters }, { matrix }) {
      let center = getters.center
      let translation1 = translationMatrix(-center.x, -center.y, -center.z)
      let translation2 = translationMatrix(center.x, center.y, center.z)
      let combinedMatrix = matricesMultiplication4(translation2, matrix, translation1)
      commit('applyMatrix4', { matrix: combinedMatrix })
    },
    multiplyQuaternionCenter,
    ...rotationActions()
  },
  mutations: {
    applyMatrix3 (state, { matrix }) {
      for (let i = 0; i < state.coordinates.length; i++) {
        Vue.set(state.coordinates, i, applyMatrixToVector3A(matrix, state.coordinates[i]))
      }
    },

    applyMatrix4 (state, { matrix }) {
      for (let i = 0; i < state.coordinates.length; i++) {
        Vue.set(state.coordinates, i, applyMatrixToVector4H(matrix, state.coordinates[i]))
      }
    },

    addVector (state, { x, y, z }) {
      for (let i = 0; i < state.coordinates.length; i++) {
        Vue.set(state.coordinates, i, {
          x: state.coordinates[i].x + x,
          y: state.coordinates[i].y + y,
          z: state.coordinates[i].z + z
        })
      }
    },

    reset (state) {
      Object.assign(state, initialState())
    },

    multiplyQuaternion
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

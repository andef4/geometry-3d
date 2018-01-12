import Vue from 'vue'
import Vuex from 'vuex'

import {
  translationMatrix, applyMatrixToVector3A, applyMatrixToVector4H, matricesMultiplication4,
  stretchMatrixX, stretchMatrixY, stretchMatrixZ, shearMatrix
} from './math'

import { default as quaternionRotation, applyQuaternionCenter, applyQuaternion } from './rotation/quaternion'
import { default as dualQuaternionRotation, applyDualQuaternionCenter, applyDualQuaternion } from './rotation/dualQuaternion'
import { default as cliffordRotation, applyRotor, applyRotorCenter } from './rotation/clifford'

import eulerHomogeneousRotation from './rotation/eulerHomogeneous'
import eulerAffineRotation from './rotation/eulerAffine'
import rodriguezAffineRotation from './rotation/rodriguezAffine'
import rodriguezHomogeneousRotation from './rotation/rodriguezHomogeneous'
import lieAlgebraRotation from './rotation/lieAlgebra'

import mirror from './mirror'
import perspectiveProjectionMatrix from './perspectiveProjection'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const initialState = () => {
  return {
    coordinates: [
      {x: 2.5, y: 2.5, z: 2.5},
      {x: 2.5, y: 2.5, z: 1.5},
      {x: 2.5, y: 1.5, z: 2.5},
      {x: 2.5, y: 1.5, z: 1.5},
      {x: 1.5, y: 2.5, z: 1.5},
      {x: 1.5, y: 2.5, z: 2.5},
      {x: 1.5, y: 1.5, z: 1.5},
      {x: 1.5, y: 1.5, z: 2.5}
    ],
    currentImplementation: 'eulerAffine',
    implementations: [
        { text: 'Euler affine', value: 'eulerAffine' },
        { text: 'Euler homogeneous', value: 'eulerHomogeneous' },
        { text: 'Rodriguez affine', value: 'rodriguezAffine' },
        { text: 'Rodriguez homogeneous', value: 'rodriguezHomogeneous' },
        { text: 'Quaternion', value: 'quaternion' },
        { text: 'Dual quaternion', value: 'dualQuaternion' },
        { text: 'Clifford algebra', value: 'clifford' },
        { text: 'Lie algebra', value: 'lieAlgebra' }
    ]
  }
}

function addPrefix (prefix, obj) {
  const keyValues = Object.keys(obj).map(key => {
    return { [prefix + key]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
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
    applyQuaternionCenter,
    applyDualQuaternion,
    applyDualQuaternionCenter,
    applyRotorCenter,
    mirror,

    // add actions with prefix to store
    ...addPrefix('eulerHomogeneous', eulerHomogeneousRotation()),
    ...addPrefix('eulerAffine', eulerAffineRotation()),
    ...addPrefix('rodriguezAffine', rodriguezAffineRotation()),
    ...addPrefix('rodriguezHomogeneous', rodriguezHomogeneousRotation()),
    ...addPrefix('quaternion', quaternionRotation()),
    ...addPrefix('dualQuaternion', dualQuaternionRotation()),
    ...addPrefix('clifford', cliffordRotation()),
    ...addPrefix('lieAlgebra', lieAlgebraRotation()),

    // dispatch actions to currently selected implementation
    rotateOriginClockwiseX ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateOriginClockwiseX')
    },
    rotateOriginCounterClockwiseX ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateOriginCounterClockwiseX')
    },
    rotateOriginClockwiseY ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateOriginClockwiseY')
    },
    rotateOriginCounterClockwiseY ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateOriginCounterClockwiseY')
    },
    rotateOriginClockwiseZ ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateOriginClockwiseZ')
    },
    rotateOriginCounterClockwiseZ ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateOriginCounterClockwiseZ')
    },

    rotateCenterClockwiseX ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateCenterClockwiseX')
    },
    rotateCenterCounterClockwiseX ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateCenterCounterClockwiseX')
    },
    rotateCenterClockwiseY ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateCenterClockwiseY')
    },
    rotateCenterCounterClockwiseY ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateCenterCounterClockwiseY')
    },
    rotateCenterClockwiseZ ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateCenterClockwiseZ')
    },
    rotateCenterCounterClockwiseZ ({ state, dispatch }) {
      dispatch(state.currentImplementation + 'rotateCenterCounterClockwiseZ')
    }
  },
  mutations: {
    updateCoordinate (state, { index, coordinate }) {
      Vue.set(state.coordinates, index, coordinate)
    },

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
    setImplementation (state, implementation) {
      state.currentImplementation = implementation
    },

    applyQuaternion,
    applyRotor
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

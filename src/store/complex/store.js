import {
  translationMatrix, rotationMatrix, matricesMultiplication3x3
} from '../homogeneous/math'

import {
  mutations as homogeneousMutations,
  actions as homogeneousActions
} from '../homogeneous/store'

import { complexMultiplication, complexRotation } from './math'

export let actions = {
  ...homogeneousActions,
  rotateCenterClockwise ({ dispatch }) {
    let matrix = rotationMatrix(-15)
    dispatch('applyMatrixCenter', { matrix })
  },
  rotateCenterCounterClockwise ({ dispatch }) {
    let matrix = rotationMatrix(15)
    dispatch('applyMatrixCenter', { matrix })
  },
  rotateOriginClockwise ({ commit, state }) {
    let complex = complexRotation(-15)
    commit('applyComplex', { complex })
  },
  rotateOriginCounterClockwise ({ commit }) {
    let complex = complexRotation(15)
    commit('applyComplex', { complex })
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
  }
}

export let mutations = {
  ...homogeneousMutations,

  applyComplex (state, { complex }) {
    let complexA = {re: state.coordinates.a.x, im: state.coordinates.a.y}
    let complexB = {re: state.coordinates.b.x, im: state.coordinates.b.y}
    let complexC = {re: state.coordinates.c.x, im: state.coordinates.c.y}
    let complexD = {re: state.coordinates.d.x, im: state.coordinates.d.y}

    complexA = complexMultiplication(complexA, complex)
    complexB = complexMultiplication(complexB, complex)
    complexC = complexMultiplication(complexC, complex)
    complexD = complexMultiplication(complexD, complex)

    state.coordinates.b = {x: complexB.re, y: complexB.im}
    state.coordinates.a = {x: complexA.re, y: complexA.im}
    state.coordinates.c = {x: complexC.re, y: complexC.im}
    state.coordinates.d = {x: complexD.re, y: complexD.im}
  }
}

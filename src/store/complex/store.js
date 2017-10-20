import {
  translationMatrix, rotationMatrix, matricesMultiplication3x3
} from '../homogeneous/math'

import {
  mutations as homogeneousMutations,
  actions as homogeneousActions
} from '../homogeneous/store'

import { complexMultiplication } from './math'

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
    let complexA = {re: state.coordinates.a.x, im: state.coordinates.a.y}
    let complexB = {re: state.coordinates.b.x, im: state.coordinates.b.y}
    let complexC = {re: state.coordinates.c.x, im: state.coordinates.c.y}
    let complexD = {re: state.coordinates.d.x, im: state.coordinates.d.y}

    let radians = -15 * (Math.PI / 180)
    let complexRotation = {re: Math.cos(radians), im: Math.sin(radians)}
    complexA = complexMultiplication(complexA, complexRotation)
    complexB = complexMultiplication(complexB, complexRotation)
    complexC = complexMultiplication(complexC, complexRotation)
    complexD = complexMultiplication(complexD, complexRotation)

    commit('updateCoordinates', {
      a: {x: complexA.re, y: complexA.im},
      b: {x: complexB.re, y: complexB.im},
      c: {x: complexC.re, y: complexC.im},
      d: {x: complexD.re, y: complexD.im}
    })
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
  }
}

export let mutations = {
  ...homogeneousMutations,
  updateCoordinates (state, {a, b, c, d}) {
    state.coordinates.a = a
    state.coordinates.b = b
    state.coordinates.c = c
    state.coordinates.d = d
  }
}

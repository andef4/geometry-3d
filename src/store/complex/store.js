import {
  mutations as homogeneousMutations,
  actions as homogeneousActions
} from '../homogeneous/store'

import { complexMultiplication, complexRotation } from './math'

export let actions = {
  ...homogeneousActions,
  rotateCenterClockwise ({ commit, getters }) {
    let center = getters.center
    commit('applyTranslation', { x: -center.x, y: -center.y })
    let complex = complexRotation(-15)
    commit('applyComplex', { complex })
    commit('applyTranslation', { x: center.x, y: center.y })
  },
  rotateCenterCounterClockwise ({ commit, getters }) {
    let center = getters.center
    commit('applyTranslation', { x: -center.x, y: -center.y })
    let complex = complexRotation(15)
    commit('applyComplex', { complex })
    commit('applyTranslation', { x: center.x, y: center.y })
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
    commit('applyTranslation', { x: -x, y: -y })
    let complex = complexRotation(-15)
    commit('applyComplex', { complex })
    commit('applyTranslation', { x: x, y: y })
  },
  rotatePointCounterClockwise ({ commit }, { x, y }) {
    commit('applyTranslation', { x: -x, y: -y })
    let complex = complexRotation(15)
    commit('applyComplex', { complex })
    commit('applyTranslation', { x: x, y: y })
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

    state.coordinates.a = {x: complexA.re, y: complexA.im}
    state.coordinates.b = {x: complexB.re, y: complexB.im}
    state.coordinates.c = {x: complexC.re, y: complexC.im}
    state.coordinates.d = {x: complexD.re, y: complexD.im}
  },

  applyTranslation (state, {x, y}) {
    state.coordinates.a = {x: state.coordinates.a.x + x, y: state.coordinates.a.y + y}
    state.coordinates.b = {x: state.coordinates.b.x + x, y: state.coordinates.b.y + y}
    state.coordinates.c = {x: state.coordinates.c.x + x, y: state.coordinates.c.y + y}
    state.coordinates.d = {x: state.coordinates.d.x + x, y: state.coordinates.d.y + y}
  }
}

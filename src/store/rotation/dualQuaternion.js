import Vue from 'vue'

import { Quaternion } from './quaternion'

class DualQuaternion {
  constructor () {
    // rotation
    this.real = new Quaternion()
    this.real.set(0, 0, 0, 1)

    // translation
    this.dual = new Quaternion()
    this.dual.set(0, 0, 0, 0)
  }

  setRotation (axis, angle) {
    this.real.setRotation(axis, angle)
  }

  setTranslation (x, y, z) {
    this.dual.set(x / 2, y / 2, z / 2, 0)
  }

  multiply (otherDualQuaternion) {
    let first = this
    let second = otherDualQuaternion

    let dualQuaternion = new DualQuaternion()
    dualQuaternion.real = second.real.multiply(first.real)
    let dual1 = second.dual.multiply(first.real)
    let dual2 = second.real.multiply(first.dual)
    dualQuaternion.dual = dual1.add(dual2)
    return dualQuaternion
  }
}

export function applyDualQuaternionCenter ({ commit, getters }, { rotationQuaternion }) {
  let center = getters.center
  let dualQuaternion = new DualQuaternion()
  dualQuaternion.setTranslation(-center.x, -center.y, -center.z)
  dualQuaternion.real = rotationQuaternion

  let inverseTranslationDQ = new DualQuaternion()
  inverseTranslationDQ.setTranslation(center.x, center.y, center.z)

  let operation = inverseTranslationDQ.multiply(dualQuaternion)
  commit('applyDualQuaternion', { dualQuaternion: operation })
}

export function applyDualQuaternion (state, { dualQuaternion }) {
  for (let i = 0; i < state.coordinates.length; i++) {
    let coordinate = new DualQuaternion()
    coordinate.setTranslation(state.coordinates[i].x, state.coordinates[i].y, state.coordinates[i].z)
    let newCoordinates = dualQuaternion.multiply(coordinate)
    Vue.set(state.coordinates, i, {
      x: newCoordinates.dual.x * 2.0,
      y: newCoordinates.dual.y * 2.0,
      z: newCoordinates.dual.z * 2.0
    })
  }
}

export default function () {
  return {
    rotateOriginClockwiseX ({ commit }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 1, y: 0, z: 0 }, 15)
      commit('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginCounterClockwiseX ({ commit }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 1, y: 0, z: 0 }, -15)
      commit('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginClockwiseY ({ commit }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 0, y: 1, z: 0 }, 15)
      commit('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginCounterClockwiseY ({ commit }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 0, y: 1, z: 0 }, -15)
      commit('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginClockwiseZ ({ commit }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 0, y: 0, z: 1 }, 15)
      commit('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginCounterClockwiseZ ({ commit }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 0, y: 0, z: 1 }, -15)
      commit('applyDualQuaternion', { dualQuaternion })
    },

    rotateCenterClockwiseX ({ dispatch }) {
      let rotationQuaternion = new Quaternion()
      rotationQuaternion.setRotation({ x: 1, y: 0, z: 0 }, 15)
      dispatch('applyDualQuaternionCenter', { rotationQuaternion })
    },
    rotateCenterCounterClockwiseX ({ dispatch }) {
      let rotationQuaternion = new Quaternion()
      rotationQuaternion.setRotation({ x: 1, y: 0, z: 0 }, -15)
      dispatch('applyDualQuaternionCenter', { rotationQuaternion })
    },
    rotateCenterClockwiseY ({ dispatch }) {
      let rotationQuaternion = new Quaternion()
      rotationQuaternion.setRotation({ x: 0, y: 1, z: 0 }, 15)
      dispatch('applyDualQuaternionCenter', { rotationQuaternion })
    },
    rotateCenterCounterClockwiseY ({ dispatch }) {
      let rotationQuaternion = new Quaternion()
      rotationQuaternion.setRotation({ x: 0, y: 1, z: 0 }, -15)
      dispatch('applyDualQuaternionCenter', { rotationQuaternion })
    },
    rotateCenterClockwiseZ ({ dispatch }) {
      let rotationQuaternion = new Quaternion()
      rotationQuaternion.setRotation({ x: 0, y: 0, z: 1 }, 15)
      dispatch('applyDualQuaternionCenter', { rotationQuaternion })
    },
    rotateCenterCounterClockwiseZ ({ dispatch }) {
      let rotationQuaternion = new Quaternion()
      rotationQuaternion.setRotation({ x: 0, y: 0, z: 1 }, -15)
      dispatch('applyDualQuaternionCenter', { rotationQuaternion })
    }
  }
}

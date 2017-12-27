import Vue from 'vue'

export class Quaternion {
  constructor () {
    this.x = 0
    this.y = 0
    this.z = 0
    this.w = 0
  }

  set (x, y, z, w) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  setRotation (axis, angle) {
    let radians = angle * (Math.PI / 180)
    let s = Math.sin(radians * 0.5)
    this.x = axis.x * s
    this.y = axis.y * s
    this.z = axis.z * s
    this.w = Math.cos(radians * 0.5)
  }

  vectorMultiply (vector) {
    let x = vector.x
    let y = vector.y
    let z = vector.z

    let qx = this.x
    let qy = this.y
    let qz = this.z
    let qw = this.w

    let ix = qw * x + qy * z - qz * y
    let iy = qw * y + qz * x - qx * z
    let iz = qw * z + qx * y - qy * x
    let iw = -qx * x - qy * y - qz * z

    return {
      x: ix * qw + iw * -qx + iy * -qz - iz * -qy,
      y: iy * qw + iw * -qy + iz * -qx - ix * -qz,
      z: iz * qw + iw * -qz + ix * -qy - iy * -qx
    }
  }

  multiply (otherQuaternion) {
    let quaternion = new Quaternion()
    let r = this
    let q = otherQuaternion

    quaternion.set(
      r.w * q.x + r.x * q.w - r.y * q.z + r.z * q.y,
      r.w * q.y + r.x * q.z + r.y * q.w - r.z * q.x,
      r.w * q.z - r.x * q.y + r.y * q.x + r.z * q.w,
      r.w * q.w - r.x * q.x - r.y * q.y - r.z * q.z
    )
    return quaternion
  }

  add (otherQuaternion) {
    let quaternion = new Quaternion()
    let r = this
    let q = otherQuaternion
    quaternion.set(
      r.x + q.x,
      r.y + q.y,
      r.z + q.z,
      r.w + q.w,
    )
    return quaternion
  }
}

export function applyQuaternionCenter ({ commit, getters }, { quaternion }) {
  let center = getters.center
  commit('addVector', {x: -center.x, y: -center.y, z: -center.y})
  commit('applyQuaternion', { quaternion })
  commit('addVector', {x: center.x, y: center.y, z: center.y})
}

export function applyQuaternion (state, { quaternion }) {
  for (let i = 0; i < state.coordinates.length; i++) {
    Vue.set(state.coordinates, i, quaternion.vectorMultiply(state.coordinates[i]))
  }
}

export default function () {
  return {
    rotateOriginClockwiseX ({ commit }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 1, y: 0, z: 0 }, 15)
      commit('applyQuaternion', { quaternion })
    },
    rotateOriginCounterClockwiseX ({ commit }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 1, y: 0, z: 0 }, -15)
      commit('applyQuaternion', { quaternion })
    },
    rotateOriginClockwiseY ({ commit }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 0, y: 1, z: 0 }, 15)
      commit('applyQuaternion', { quaternion })
    },
    rotateOriginCounterClockwiseY ({ commit }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 0, y: 1, z: 0 }, -15)
      commit('applyQuaternion', { quaternion })
    },
    rotateOriginClockwiseZ ({ commit }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 0, y: 0, z: 1 }, 15)
      commit('applyQuaternion', { quaternion })
    },
    rotateOriginCounterClockwiseZ ({ commit }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 0, y: 0, z: 1 }, -15)
      commit('applyQuaternion', { quaternion })
    },

    rotateCenterClockwiseX ({ dispatch }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 1, y: 0, z: 0 }, 15)
      dispatch('applyQuaternionCenter', { quaternion })
    },
    rotateCenterCounterClockwiseX ({ dispatch }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 1, y: 0, z: 0 }, -15)
      dispatch('applyQuaternionCenter', { quaternion })
    },
    rotateCenterClockwiseY ({ dispatch }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 0, y: 1, z: 0 }, 15)
      dispatch('applyQuaternionCenter', { quaternion })
    },
    rotateCenterCounterClockwiseY ({ dispatch }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 0, y: 1, z: 0 }, -15)
      dispatch('applyQuaternionCenter', { quaternion })
    },
    rotateCenterClockwiseZ ({ dispatch }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 0, y: 0, z: 1 }, 15)
      dispatch('applyQuaternionCenter', { quaternion })
    },
    rotateCenterCounterClockwiseZ ({ dispatch }) {
      let quaternion = new Quaternion()
      quaternion.setRotation({ x: 0, y: 0, z: 1 }, -15)
      dispatch('applyQuaternionCenter', { quaternion })
    }
  }
}

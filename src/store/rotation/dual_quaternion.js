
class Quaternion {
  constructor () {
    this.x = 0
    this.y = 0
    this.z = 0
    this.w = 0
  }

  setRotationByAxisAngle (axis, angle) {
    let radians = angle * (Math.PI / 180)
    let s = Math.sin(radians * 0.5)
    this.x = axis.x * s
    this.y = axis.y * s
    this.z = axis.z * s
    this.w = Math.cos(radians * 0.5)
  }

  setTranslation (x, y, z) {
    this.x = x * 0.5
    this.y = y * 0.5
    this.z = z * 0.5
    this.w = 0
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
}

export default function () {
  return {
    rotateOriginClockwiseX ({ commit }) {
      let quaternion = new Quaternion()
      quaternion.setRotationByAxisAngle({ x: 1, y: 0, z: 0 }, 15)
      commit('multiplyQuaternion', { quaternion })
    },
    rotateOriginCounterClockwiseX ({ commit }) {
      let quaternion = new Quaternion({ x: 1, y: 0, z: 0 }, -15)
      commit('multiplyQuaternion', { quaternion })
    },
    rotateOriginClockwiseY ({ commit }) {
      let quaternion = new Quaternion({ x: 0, y: 1, z: 0 }, 15)
      commit('multiplyQuaternion', { quaternion })
    },
    rotateOriginCounterClockwiseY ({ commit }) {
      let quaternion = new Quaternion({ x: 0, y: 1, z: 0 }, -15)
      commit('multiplyQuaternion', { quaternion })
    },
    rotateOriginClockwiseZ ({ commit }) {
      let quaternion = new Quaternion({ x: 0, y: 0, z: 1 }, 15)
      commit('multiplyQuaternion', { quaternion })
    },
    rotateOriginCounterClockwiseZ ({ commit }) {
      let quaternion = new Quaternion({ x: 0, y: 0, z: 1 }, -15)
      commit('multiplyQuaternion', { quaternion })
    },

    rotateCenterClockwiseX ({ dispatch }) {
      let rotation = new Quaternion()
      rotation.setRotationByAxisAngle({ x: 1, y: 0, z: 0 }, 15)

      // v' = v + 2 * (cross(r.xyz,  cross(r.xyz, v) + r.w*v) + r.w*d.xyz - d.w*r.xyz + cross(r.xyz, d.xyz))

      dispatch('multiplyQuaternionCenterDual', { rotation })
    },
    rotateCenterCounterClockwiseX ({ dispatch }) {
      let quaternion = new Quaternion({ x: 1, y: 0, z: 0 }, -15)
      dispatch('multiplyQuaternionCenter', { quaternion })
    },
    rotateCenterClockwiseY ({ dispatch }) {
      let quaternion = new Quaternion({ x: 0, y: 1, z: 0 }, 15)
      dispatch('multiplyQuaternionCenter', { quaternion })
    },
    rotateCenterCounterClockwiseY ({ dispatch }) {
      let quaternion = new Quaternion({ x: 0, y: 1, z: 0 }, -15)
      dispatch('multiplyQuaternionCenter', { quaternion })
    },
    rotateCenterClockwiseZ ({ dispatch }) {
      let quaternion = new Quaternion({ x: 0, y: 0, z: 1 }, 15)
      dispatch('multiplyQuaternionCenter', { quaternion })
    },
    rotateCenterCounterClockwiseZ ({ dispatch }) {
      let quaternion = new Quaternion({ x: 0, y: 0, z: 1 }, -15)
      dispatch('multiplyQuaternionCenter', { quaternion })
    }
  }
}

export function applyDualQuaternion () {
    let translation = new Quaternion()
    translation.setTranslation(x, y, z)
    dispatch('applyDualQuaternion', { rotation, translation })

}

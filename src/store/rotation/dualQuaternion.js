import { Quaternion } from './quaternion'
import { identityMatrix4 } from '../math'

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

  setTranslationOnly (x, y, z) {
    this.dual.set(x / 2, y / 2, z / 2, 0)
    this.real.set(0, 0, 0, 1)
  }

  setTranslation (x, y, z) {
    let translationQuaternion = new Quaternion()
    translationQuaternion.set(x, y, z, 0)
    translationQuaternion = this.real.multiply(translationQuaternion)
    this.dual.set(
      translationQuaternion.x / 2,
      translationQuaternion.y / 2,
      translationQuaternion.z / 2,
      translationQuaternion.w / 2,
    )
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

  getMatrix () {
    let matrix = identityMatrix4()
    let w = this.real.w
    let x = this.real.x
    let y = this.real.y
    let z = this.real.z

    // rotation
    matrix[0][0] = w * w + x * x - y * y - z * z
    matrix[0][1] = 1 * x * y + 2 * w * z
    matrix[0][2] = 2 * x * z - 2 * w * y

    matrix[1][0] = 2 * x * y - 2 * w * z
    matrix[1][1] = w * w + y * y - x * x - z * z
    matrix[1][2] = 2 * y * z + 2 * w * x

    matrix[2][0] = 2 * x * z + 2 * w * y
    matrix[2][1] = 2 * y * z - 2 * w * x
    matrix[2][2] = w * w + z * z - x * x - y * y

    // translation
    let realConjugate = this.real.conjugate()
    let translation = this.dual.multiply(realConjugate)
    matrix[0][3] = translation.x * 2
    matrix[1][3] = translation.y * 2
    matrix[2][3] = translation.z * 2
    return matrix
  }
}

export function applyDualQuaternionCenter ({ dispatch, getters }, { rotationQuaternion }) {
  let center = getters.center

  let dualQuaternion = new DualQuaternion()
  dualQuaternion.real = rotationQuaternion
  dualQuaternion.setTranslation(-center.x, -center.y, -center.z)

  let inverseTranslation = new DualQuaternion()
  inverseTranslation.setTranslationOnly(center.x, center.y, center.z)

  let operation = dualQuaternion.multiply(inverseTranslation)
  dispatch('applyDualQuaternion', { dualQuaternion: operation })
}

export function applyDualQuaternion ({ commit }, { dualQuaternion }) {
  let matrix = dualQuaternion.getMatrix()
  commit('applyMatrix4', { matrix })
}

export default function () {
  return {
    rotateOriginClockwiseX ({ dispatch }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 1, y: 0, z: 0 }, 15)
      dispatch('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginCounterClockwiseX ({ dispatch }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 1, y: 0, z: 0 }, -15)
      dispatch('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginClockwiseY ({ dispatch }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 0, y: 1, z: 0 }, 15)
      dispatch('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginCounterClockwiseY ({ dispatch }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 0, y: 1, z: 0 }, -15)
      dispatch('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginClockwiseZ ({ dispatch }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 0, y: 0, z: 1 }, 15)
      dispatch('applyDualQuaternion', { dualQuaternion })
    },
    rotateOriginCounterClockwiseZ ({ dispatch }) {
      let dualQuaternion = new DualQuaternion()
      dualQuaternion.setRotation({ x: 0, y: 0, z: 1 }, -15)
      dispatch('applyDualQuaternion', { dualQuaternion })
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

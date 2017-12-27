import Vue from 'vue'

import C3 from '../../lib/C3'
import { degreeToRadians } from '../math'

export function applyRotor (state, { rotor }) {
  for (let i = 0; i < state.coordinates.length; i++) {
    let point = C3.Vec3(state.coordinates[i].x, state.coordinates[i].y, state.coordinates[i].z)
    point = point.sp(rotor)
    Vue.set(state.coordinates, i, {
      x: point[0],
      y: point[1],
      z: point[2]
    })
  }
}

export function applyRotorCenter (state, { rotor, center }) {
  for (let i = 0; i < state.coordinates.length; i++) {
    let point = C3.Vec3(state.coordinates[i].x, state.coordinates[i].y, state.coordinates[i].z)
    point = point.add(C3.Vec3(-center.x, -center.y, -center.z))
    point = point.sp(rotor)
    point = point.add(C3.Vec3(center.x, center.y, center.z))
    Vue.set(state.coordinates, i, {
      x: point[0],
      y: point[1],
      z: point[2]
    })
  }
}

export default function () {
  return {
    rotateOriginClockwiseX ({ commit }) {
      commit('applyRotor', { rotor: C3.Gen.rot(C3.Biv3(0, 0, degreeToRadians(15))) })
    },
    rotateOriginCounterClockwiseX ({ commit }) {
      commit('applyRotor', { rotor: C3.Gen.rot(C3.Biv3(0, 0, degreeToRadians(-15))) })
    },
    rotateOriginClockwiseY ({ commit }) {
      commit('applyRotor', { rotor: C3.Gen.rot(C3.Biv3(0, degreeToRadians(15), 0)) })
    },
    rotateOriginCounterClockwiseY ({ commit }) {
      commit('applyRotor', { rotor: C3.Gen.rot(C3.Biv3(0, degreeToRadians(-15), 0)) })
    },
    rotateOriginClockwiseZ ({ commit }) {
      commit('applyRotor', { rotor: C3.Gen.rot(C3.Biv3(degreeToRadians(15), 0, 0)) })
    },
    rotateOriginCounterClockwiseZ ({ commit }) {
      commit('applyRotor', { rotor: C3.Gen.rot(C3.Biv3(degreeToRadians(-15), 0, 0)) })
    },

    rotateCenterClockwiseX ({ commit, getters }) {
      let rotor = C3.Gen.rot(C3.Biv3(0, 0, degreeToRadians(15)))
      commit('applyRotorCenter', { rotor, center: getters.center })
    },
    rotateCenterCounterClockwiseX ({ commit, getters }) {
      let rotor = C3.Gen.rot(C3.Biv3(0, 0, degreeToRadians(-15)))
      commit('applyRotorCenter', { rotor, center: getters.center })
    },
    rotateCenterClockwiseY ({ commit, getters }) {
      let rotor = C3.Gen.rot(C3.Biv3(0, degreeToRadians(15), 0))
      commit('applyRotorCenter', { rotor, center: getters.center })
    },
    rotateCenterCounterClockwiseY ({ commit, getters }) {
      let rotor = C3.Gen.rot(C3.Biv3(0, degreeToRadians(-15), 0))
      commit('applyRotorCenter', { rotor, center: getters.center })
    },
    rotateCenterClockwiseZ ({ commit, getters }) {
      let rotor = C3.Gen.rot(C3.Biv3(degreeToRadians(15), 0, 0))
      commit('applyRotorCenter', { rotor, center: getters.center })
    },
    rotateCenterCounterClockwiseZ ({ commit, getters }) {
      let rotor = C3.Gen.rot(C3.Biv3(degreeToRadians(-15), 0, 0))
      commit('applyRotorCenter', { rotor, center: getters.center })
    }
  }
}

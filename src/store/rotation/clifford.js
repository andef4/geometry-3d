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

export function applyRotorCenter ({ getters, state, commit }, { rotor }) {
  let center = getters.center

  // move point to origin
  let translator1 = C3.Op.trs(-center.x, -center.y, -center.y)

  // move point back at its original position
  let translator2 = C3.Op.trs(center.x, center.y, center.y)

  // a motor combines a rotor and a translator
  let motor = translator2.gp(rotor)

  for (let i = 0; i < state.coordinates.length; i++) {
    let point = C3.Ro.point(state.coordinates[i].x, state.coordinates[i].y, state.coordinates[i].z)
    point = point.sp(translator1)
    point = point.sp(motor)
    commit('updateCoordinate', { index: i, coordinate: { x: point[0], y: point[1], z: point[2] } })
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

    rotateCenterClockwiseX ({ dispatch }) {
      dispatch('applyRotorCenter', { rotor: C3.Gen.rot(C3.Biv3(0, 0, degreeToRadians(15))) })
    },
    rotateCenterCounterClockwiseX ({ dispatch }) {
      dispatch('applyRotorCenter', { rotor: C3.Gen.rot(C3.Biv3(0, 0, degreeToRadians(-15))) })
    },
    rotateCenterClockwiseY ({ dispatch }) {
      dispatch('applyRotorCenter', { rotor: C3.Gen.rot(C3.Biv3(0, degreeToRadians(15), 0)) })
    },
    rotateCenterCounterClockwiseY ({ dispatch }) {
      dispatch('applyRotorCenter', { rotor: C3.Gen.rot(C3.Biv3(0, degreeToRadians(-15), 0)) })
    },
    rotateCenterClockwiseZ ({ dispatch }) {
      dispatch('applyRotorCenter', { rotor: C3.Gen.rot(C3.Biv3(degreeToRadians(15), 0, 0)) })
    },
    rotateCenterCounterClockwiseZ ({ dispatch }) {
      dispatch('applyRotorCenter', { rotor: C3.Gen.rot(C3.Biv3(degreeToRadians(-15), 0, 0)) })
    }
  }
}

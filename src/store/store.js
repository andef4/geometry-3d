import Vue from 'vue'
import Vuex from 'vuex'

import { actions, mutations } from './homogeneous/store'
// import { actions, mutations } from './complex/store'

// attention: perspective projection does not work on affine implementation
// import { actions, mutations } from './affine/store'

import camera, { xyRotationToUV } from './camera'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const initialState = () => {
  return {
    coordinates: {
      a: {
        x: 100,
        y: 200
      },
      b: {
        x: 150,
        y: 200
      },
      c: {
        x: 150,
        y: 150
      },
      d: {
        x: 100,
        y: 150
      }
    },
    camera: {
      x: 270,
      y: -240,
      rotation: 20
    }
  }
}

export default new Vuex.Store({
  state: initialState(),
  getters: {
    center (state) {
      return {
        x: (state.coordinates.a.x + state.coordinates.c.x) / 2,
        y: (state.coordinates.a.y + state.coordinates.c.y) / 2
      }
    },
    cameraImage: camera,
    uv: xyRotationToUV
  },
  actions: actions,
  mutations: {
    ...mutations,
    reset (state) {
      Object.assign(state, initialState())
    },
    updateCamera (state, camera) {
      Object.assign(state.camera, camera)
    }
  },
  strict: debug
})

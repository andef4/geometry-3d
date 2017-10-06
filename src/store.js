import Vue from 'vue'
import Vuex from 'vuex'

import { actions, mutations } from './homogeneous/store'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const initialCoordinates = () => {
  return {
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
  }
}

export default new Vuex.Store({
  state: {
    coordinates: initialCoordinates()
  },
  getters: {
    center (state) {
      return {
        x: (state.coordinates.a.x + state.coordinates.c.x) / 2,
        y: (state.coordinates.a.y + state.coordinates.c.y) / 2
      }
    }
  },
  actions: actions,
  mutations: {
    ...mutations,
    reset (state) {
      state.coordinates = initialCoordinates()
    }
  },
  strict: debug
})

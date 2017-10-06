import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    coordinates: {
      a: {
        x: 1,
        y: 1
      },
      b: {
        x: 1,
        y: 1
      },
      c: {
        x: 1,
        y: 1
      },
      d: {
        x: 1,
        y: 1
      }
    }
  },
  mutations: {
    moveUp (state) {
      console.log('not implemented')
    },
    moveDown (state) {
      console.log('not implemented')
    },
    moveLeft (state) {
      console.log('not implemented')
    },
    moveRight (state) {
      console.log('not implemented')
    }
  },
  strict: debug
})

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
    },
    rotateCenterClockwise (state) {
      console.log('not implemented')
    },
    rotateCenterCounterClockwise (state) {
      console.log('not implemented')
    },
    rotateOriginClockwise (state) {
      console.log('not implemented')
    },
    rotateOriginCounterClockwise (state) {
      console.log('not implemented')
    },
    rotatePointClockwise (state, { x, y }) {
      console.log('not implemented', x, y)
    },
    rotatePointCounterClockwise (state, { x, y }) {
      console.log('not implemented', x, y)
    },
    stretch (state) {
      console.log('not implemented')
    },
    contract (state) {
      console.log('not implemented')
    },
    sheerTopToRight (state) {
      console.log('not implemented')
    },
    sheerTopToLeft (state) {
      console.log('not implemented')
    },
    sheerRightToTop (state) {
      console.log('not implemented')
    },
    sheerRightToBottom (state) {
      console.log('not implemented')
    },
    mirror (state, { a, b, c }) {
      console.log('not implemented', a, b, c)
    }
  },
  strict: debug
})

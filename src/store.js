import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    coordinates: {
      a: {
        x: 100,
        y: 100
      },
      b: {
        x: 200,
        y: 100
      },
      c: {
        x: 200,
        y: 200
      },
      d: {
        x: 100,
        y: 200
      }
    }
  },
  mutations: {
    moveUp (state) {
      state.coordinates.a.y -= 10
      state.coordinates.b.y -= 10
      state.coordinates.c.y -= 10
      state.coordinates.d.y -= 10
    },
    moveDown (state) {
      state.coordinates.a.y += 10
      state.coordinates.b.y += 10
      state.coordinates.c.y += 10
      state.coordinates.d.y += 10
    },
    moveLeft (state) {
      state.coordinates.a.x -= 10
      state.coordinates.b.x -= 10
      state.coordinates.c.x -= 10
      state.coordinates.d.x -= 10
    },
    moveRight (state) {
      state.coordinates.a.x += 10
      state.coordinates.b.x += 10
      state.coordinates.c.x += 10
      state.coordinates.d.x += 10
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

<template>
  <div class="row">
    <div class="col">
      <geometry-canvas
        :m1="m1 === '' ? 0 : m1"
        :m2="m2 === '' ? 0 : m2"
        :a="a === '' ? 0 : a"
        :b="b === '' ? 0 : b"
        :c="c === '' ? 0 : c"
        :ux="ux === '' ? 0 : ux"
        :uy="uy === '' ? 0 : uy"
        :vx="vx === '' ? 0 : vx"
        :vy="vy === '' ? 0 : vy"
        :zBuffer="zBuffer"
      ></geometry-canvas>
    </div>
    <div class="col-4">
      <button class="btn btn-danger w-100 mb-2" @click="resetEverything">Reset</button>
      <div class="row">
        <div class="col-6">
          <div>
            <div class="mb-1 pt-1 font-weight-bold">Move</div>
            <action-button icon="arrow-up" caption="Up" @click="moveUp"></action-button>
            <action-button icon="arrow-down" caption="Down" @click="moveDown"></action-button>
            <action-button icon="arrow-right" caption="Right" @click="moveRight"></action-button>
            <action-button icon="arrow-left" caption="Left" @click="moveLeft"></action-button>
          </div>

          <div>
            <div class="mb-1 pt-1 font-weight-bold">Rotate around rectangle center</div>
            <action-button icon="rotate-right" caption="Clockwise" color="success" @click="rotateCenterClockwise"></action-button>
            <action-button icon="rotate-left" caption="Counterclockwise" color="success" @click="rotateCenterCounterClockwise"></action-button>
          </div>

          <div>
            <div class="mb-1 pt-1 font-weight-bold">Rotate around origin</div>
            <action-button icon="rotate-right" caption="Clockwise" color="danger" @click="rotateOriginClockwise"></action-button>
            <action-button icon="rotate-left" caption="Counterclockwise" color="danger" @click="rotateOriginCounterClockwise"></action-button>
          </div>

          <div>
            <div class="mb-1 pt-1 font-weight-bold">Rotate around point</div>
            <action-button icon="rotate-right" caption="Clockwise" color="warning" @click="rotatePointClockwise"></action-button>
            <action-button icon="rotate-left" caption="Counterclockwise" color="warning" @click="rotatePointCounterClockwise"></action-button>

            <div class="form-group row">
              <label for="m1" class="col-sm-2 col-form-label">m<sub>x</sub>:</label>
              <div class="col-sm-10">
                <input type="number" class="form-control form-control-sm" id="m1" v-model.number="m1">
              </div>
            </div>
            <div class="form-group row">
              <label for="m2" class="col-sm-2 col-form-label">m<sub>y</sub>:</label>
              <div class="col-sm-10">
                <input type="number" class="form-control form-control-sm" id="m2" v-model.number="m2">
              </div>
            </div>
          </div>

          <div>
            <div class="mb-1 pt-1 font-weight-bold">Stretch and contract</div>
            <action-button icon="arrow-left" second-icon="arrow-right" caption="Stretch X" color="secondary" @click="stretchX"></action-button>
            <action-button icon="arrow-right" second-icon="arrow-left" caption="Contract X" color="secondary" @click="contractX"></action-button>
            <action-button icon="arrow-up" second-icon="arrow-down" caption="Stretch Y" color="secondary" @click="stretchY"></action-button>
            <action-button icon="arrow-down" second-icon="arrow-up" caption="Contract Y" color="secondary" @click="contractY"></action-button>
          </div>
        </div>

        <div class="col-6">
          <div>
            <div class="mb-1 pt-1 font-weight-bold">Shear</div>
            <action-button icon="arrow-right" caption="Top to right" color="info" @click="shearTopToRight"></action-button>
            <action-button icon="arrow-left" caption="Top to left" color="info" @click="shearTopToLeft"></action-button>
            <action-button icon="arrow-up" caption="Right to top" color="info" @click="shearRightToTop"></action-button>
            <action-button icon="arrow-down" caption="Right to bottom" color="info" @click="shearRightToBottom"></action-button>
          </div>

          <div>
            <div class="mb-1 pt-1 font-weight-bold">Mirror on line</div>
            <div>a∙x + b∙y + c = 0</div>
            <div class="form-group row">
              <label for="a" class="col-sm-2 col-form-label">a:</label>
              <div class="col-sm-10">
                <input type="number" step="0.1" class="form-control form-control-sm" id="a" v-model.number="a">
              </div>
            </div>
            <div class="form-group row">
              <label for="b" class="col-sm-2 col-form-label">b:</label>
              <div class="col-sm-10">
                <input type="number" step="0.1" class="form-control form-control-sm" id="b" v-model.number="b">
              </div>
            </div>
            <div class="form-group row">
              <label for="c" class="col-sm-2 col-form-label">c:</label>
              <div class="col-sm-10">
                <input type="number" step="10" class="form-control form-control-sm" id="c" v-model.number="c">
              </div>
            </div>
            <action-button icon="arrow-right" caption="Mirror" color="primary" @click="mirror"></action-button>
          </div>

          <div>
            <div class="mb-1 pt-1 font-weight-bold">Perspective projection</div>
            <div class="form-group row">
              <label for="ux" class="col-sm-2 col-form-label">u<sub>x</sub>:</label>
              <div class="col-sm-10">
                <input type="number" step="5" class="form-control form-control-sm" id="ux" v-model.number="ux">
              </div>
            </div>
            <div class="form-group row">
              <label for="uy" class="col-sm-2 col-form-label">u<sub>y</sub>:</label>
              <div class="col-sm-10">
                <input type="number" step="5" class="form-control form-control-sm" id="uy" v-model.number="uy">
              </div>
            </div>
            <div class="form-group row">
              <label for="vx" class="col-sm-2 col-form-label">v<sub>x</sub>:</label>
              <div class="col-sm-10">
                <input type="number" step="5" class="form-control form-control-sm" id="vx" v-model.number="vx">
              </div>
            </div>
            <div class="form-group row">
              <label for="vy" class="col-sm-2 col-form-label">v<sub>y</sub>:</label>
              <div class="col-sm-10">
                <input type="number" step="5" class="form-control form-control-sm" id="vy" v-model.number="vy">
              </div>
            </div>
            <action-button icon="video-camera" caption="Project" color="success" @click="perspectiveProjection"></action-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'vue-awesome/icons/arrow-up'
  import 'vue-awesome/icons/arrow-down'
  import 'vue-awesome/icons/arrow-right'
  import 'vue-awesome/icons/arrow-left'
  import 'vue-awesome/icons/rotate-left'
  import 'vue-awesome/icons/rotate-right'
  import 'vue-awesome/icons/video-camera'

  import ActionButton from './ActionButton'
  import GeometryCanvas from './GeometryCanvas'

  import { mapActions, mapMutations, mapState } from 'vuex'

  import {
    translationMatrix, rotationMatrix, applyMatrixToVector, matricesMultiplication3x3
  } from '@/store/homogeneous/math'

  const initialData = () => {
    return {
      m1: 200,
      m2: 80,
      a: 5,
      b: 3,
      c: 300,
      ux: 210,
      uy: -160,
      vx: 380,
      vy: -75,
      zBuffer: []
    }
  }

  export default {
    data () {
      return initialData()
    },
    components: {
      ActionButton,
      GeometryCanvas
    },
    computed: {
      ...mapState(['coordinates'])
    },
    methods: {
      ...mapActions([
        'moveUp', 'moveDown', 'moveRight', 'moveLeft', 'rotateCenterClockwise',
        'rotateCenterCounterClockwise', 'rotateOriginClockwise', 'rotateOriginCounterClockwise',
        'stretchX', 'contractX', 'stretchY', 'contractY', 'shearTopToRight', 'shearTopToLeft', 'shearRightToTop',
        'shearRightToBottom'
      ]),
      ...mapMutations(['reset']),
      rotatePointClockwise () {
        this.$store.dispatch('rotatePointClockwise', { x: this.m1, y: this.m2 })
      },
      rotatePointCounterClockwise () {
        this.$store.dispatch('rotatePointCounterClockwise', { x: this.m1, y: this.m2 })
      },
      mirror () {
        this.$store.dispatch('mirror', { a: this.a, b: this.b, c: this.c })
      },
      perspectiveProjection () {
        let translation = translationMatrix(-this.ux, -this.uy)
        let vx = this.vx - this.ux
        let vy = this.vy - this.uy

        let length = Math.sqrt(vx * vx + vy * vy)
        let angle = Math.acos(vx / length) * (180 / Math.PI)

        let rotation = rotationMatrix(-angle)
        let v = applyMatrixToVector(rotation, { x: vx, y: vy })
        vx = Math.round(v.x)
        vy = 0

        let matrix = matricesMultiplication3x3(rotation, translation)

        let coordinates = {
          a: { ...applyMatrixToVector(matrix, this.coordinates.a) },
          b: { ...applyMatrixToVector(matrix, this.coordinates.b) },
          c: { ...applyMatrixToVector(matrix, this.coordinates.c) },
          d: { ...applyMatrixToVector(matrix, this.coordinates.d) }
        }

        const COLOR_TRANSPARENT = 0
        const COLOR_RED = 1
        const COLOR_BLACK = 2

        let zBuffer = []
        for (let x = 0; x < vx; x++) {
          zBuffer.push({ color: COLOR_TRANSPARENT, distance: 10000 })
        }

        // A => B
        fillZBuffer(zBuffer, COLOR_BLACK, coordinates.a.x, coordinates.a.y,
          coordinates.b.x, coordinates.b.y)
        // B => middle of B/C
        fillZBuffer(zBuffer, COLOR_BLACK, coordinates.b.x, coordinates.b.y,
          (coordinates.b.x + coordinates.c.x) / 2, (coordinates.b.y + coordinates.c.y) / 2)
        // middle of B/C => C
        fillZBuffer(zBuffer, COLOR_RED, (coordinates.b.x + coordinates.c.x) / 2,
          (coordinates.b.y + coordinates.c.y) / 2, coordinates.c.x, coordinates.c.y)
        // C => middle of C/D
        fillZBuffer(zBuffer, COLOR_RED, coordinates.c.x, coordinates.c.y,
          (coordinates.c.x + coordinates.d.x) / 2, (coordinates.c.y + coordinates.d.y) / 2)
        // middle of C/D => D
        fillZBuffer(zBuffer, COLOR_BLACK, (coordinates.c.x + coordinates.c.x) / 2,
          (coordinates.c.y + coordinates.d.y) / 2, coordinates.c.x, coordinates.d.y)
        // D => A
        fillZBuffer(zBuffer, COLOR_BLACK, coordinates.d.x, coordinates.d.y,
          coordinates.a.x, coordinates.a.y)

        this.zBuffer = zBuffer
      },
      resetEverything () {
        Object.assign(this, initialData())
        this.reset()
      }
    }
  }

  const fillZBuffer = (zbuffer, color, xStart, yStart, xEnd, yEnd) => {
    xStart = Math.round(xStart)
    xEnd = Math.round(xEnd)
    yStart = Math.round(yStart)
    yEnd = Math.round(yEnd)

    if (xStart > xEnd) {
      let tmpX = xStart
      let tmpY = yStart
      xStart = xEnd
      yStart = yEnd
      xEnd = tmpX
      yEnd = tmpY
    }

    let yStep = (yStart - yEnd) / Math.abs(xStart - xEnd)
    let yValue = yStart

    for (let x = xStart; x < xEnd; x++, yValue -= yStep) {
      if (zbuffer[x].distance > yValue) {
        zbuffer[x].distance = yValue
        zbuffer[x].color = color
      }
    }
  }
</script>

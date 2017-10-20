<template>
  <div class="row">
    <div class="col">
      <geometry-canvas
        :m1="m1 === '' ? 0 : m1"
        :m2="m2  === '' ? 0 : m2"
        :a="a  === '' ? 0 : a"
        :b="b  === '' ? 0 : b"
        :c="c  === '' ? 0 : c"
        :u1="u1  === '' ? 0 : u1"
        :u2="u2  === '' ? 0 : u2"
        :v1="v1  === '' ? 0 : v1"
        :v2="v2  === '' ? 0 : v2"
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
              <label for="m1" class="col-sm-2 col-form-label">m<sub>1</sub>:</label>
              <div class="col-sm-10">
                <input type="number" class="form-control form-control-sm" id="m1" v-model.number="m1">
              </div>
            </div>
            <div class="form-group row">
              <label for="m2" class="col-sm-2 col-form-label">m<sub>2</sub>:</label>
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
            <div class="mb-1 pt-1 font-weight-bold">shear</div>
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

          <!--
          <div>
            <div class="mb-1 pt-1 font-weight-bold">Perspective projection</div>
              <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox" value=""  v-model="perspectiveProjection">
                Activate
              </label>
            </div>
            <div class="form-group row">
              <label for="u1" class="col-sm-2 col-form-label">u<sub>1</sub>:</label>
              <div class="col-sm-10">
                <input type="number" class="form-control form-control-sm" id="u1" v-model.number="u1">
              </div>
            </div>
            <div class="form-group row">
              <label for="u2" class="col-sm-2 col-form-label">u<sub>2</sub>:</label>
              <div class="col-sm-10">
                <input type="number" class="form-control form-control-sm" id="u2" v-model.number="u2">
              </div>
            </div>
            <div class="form-group row">
              <label for="v1" class="col-sm-2 col-form-label">v<sub>1</sub>:</label>
              <div class="col-sm-10">
                <input type="number" class="form-control form-control-sm" id="v1" v-model.number="v1">
              </div>
            </div>
            <div class="form-group row">
              <label for="v2" class="col-sm-2 col-form-label">v<sub>2</sub>:</label>
              <div class="col-sm-10">
                <input type="number" class="form-control form-control-sm" id="v2" v-model.number="v2">
              </div>
            </div>
          </div>
          -->
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

  import ActionButton from './ActionButton'
  import GeometryCanvas from './GeometryCanvas'

  import { mapActions, mapMutations } from 'vuex'

  const initialData = () => {
    return {
      m1: 200,
      m2: 80,
      a: 5,
      b: 3,
      c: 300,
      u1: 0,
      u2: 0,
      v1: 0,
      v2: 0,
      perspectiveProjection: false
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
      resetEverything () {
        Object.assign(this, initialData())
      }
    }
  }
</script>

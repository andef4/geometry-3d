<template>
  <div class="row">
    <div class="col">
      <geometry-canvas
        :xIntercept="xIntercept === '' ? 0 : xIntercept"
        :yIntercept="yIntercept === '' ? 0 : yIntercept"
        :zIntercept="zIntercept === '' ? 0 : zIntercept"
        :a="a === '' ? 0 : a"
        :b="b === '' ? 0 : b"
        :c="c === '' ? 0 : c"
        :d="d === '' ? 0 : d">
      </geometry-canvas>
    </div>
    <div class="col-3">
      <button class="btn btn-danger w-100 mb-2" @click="reset">Reset</button>

      <b-tabs>
        <b-tab title="Move" class="mt-2">
          <div class="d-flex">
            <action-button icon="plus" caption="x" @click="moveXup" color="danger" class="mr-2"></action-button>
            <action-button icon="minus" caption="x" @click="moveXdown" color="danger"></action-button>
          </div>
          <div class="d-flex">
            <action-button icon="plus" caption="y" @click="moveYup" color="success" class="mr-2"></action-button>
            <action-button icon="minus" caption="y" @click="moveYdown" color="success"></action-button>
          </div>
          <div class="d-flex">
            <action-button icon="plus" caption="z" @click="moveZup" class="mr-2"></action-button>
            <action-button icon="minus" caption="z" @click="moveZdown"></action-button>
          </div>
        </b-tab>

        <b-tab title="Rotate">
          <b-form-group label="Implementations:">
            <b-form-radio-group :checked="currentImplementation"
                                @input="setImplementation"
                                :options="implementations"
                                stacked>
            </b-form-radio-group>
          </b-form-group>

          <div>
            <div class="mb-1 pt-1 font-weight-bold">Rotate around axis</div>
            <div class="d-flex">
              <action-button icon="rotate-right" caption="x" @click="rotateOriginClockwiseX" color="danger" class="mr-2"></action-button>
              <action-button icon="rotate-left" caption="x" @click="rotateOriginCounterClockwiseX" color="danger"></action-button>
            </div>
            <div class="d-flex">
              <action-button icon="rotate-right" caption="y" @click="rotateOriginClockwiseY" color="success" class="mr-2"></action-button>
              <action-button icon="rotate-left" caption="y" @click="rotateOriginCounterClockwiseY" color="success"></action-button>
            </div>
            <div class="d-flex">
              <action-button icon="rotate-right" caption="z" @click="rotateOriginClockwiseZ" class="mr-2"></action-button>
              <action-button icon="rotate-left" caption="z" @click="rotateOriginCounterClockwiseZ"></action-button>
            </div>
          </div>

          <div>
            <div class="mb-1 pt-1 font-weight-bold">Rotate around center</div>
            <div class="d-flex">
              <action-button icon="rotate-right" caption="x" @click="rotateCenterClockwiseX" color="danger" class="mr-2"></action-button>
              <action-button icon="rotate-left" caption="x" @click="rotateCenterCounterClockwiseX" color="danger"></action-button>
            </div>
            <div class="d-flex">
              <action-button icon="rotate-right" caption="y" @click="rotateCenterClockwiseY" color="success" class="mr-2"></action-button>
              <action-button icon="rotate-left" caption="y" @click="rotateCenterCounterClockwiseY" color="success"></action-button>
            </div>
            <div class="d-flex">
              <action-button icon="rotate-right" caption="z" @click="rotateCenterClockwiseZ" class="mr-2"></action-button>
              <action-button icon="rotate-left" caption="z" @click="rotateCenterCounterClockwiseZ"></action-button>
            </div>
          </div>
        </b-tab>

        <b-tab title="Stretch & Shear">
          <div class="mb-1 pt-1 font-weight-bold">Stretch</div>
          <div class="d-flex">
            <action-button icon="plus" caption="x" @click="stretchX" color="danger" class="mr-2"></action-button>
            <action-button icon="minus" caption="x" @click="contractX" color="danger"></action-button>
          </div>
          <div class="d-flex">
            <action-button icon="plus" caption="y" @click="stretchY" color="success" class="mr-2"></action-button>
            <action-button icon="minus" caption="y" @click="contractY" color="success"></action-button>
          </div>
          <div class="d-flex">
            <action-button icon="plus" caption="z" @click="stretchZ" class="mr-2"></action-button>
            <action-button icon="minus" caption="z" @click="contractZ"></action-button>
          </div>

          <div class="mb-1 pt-1 font-weight-bold">Shear</div>
          <div class="d-flex">
            <action-button icon="plus" caption="Y ⮕ X" @click="shearYXup" color="danger" class="mr-2"></action-button>
            <action-button icon="minus" caption="Y ⮕ X" @click="shearYXdown" color="danger"></action-button>
          </div>
          <div class="d-flex">
            <action-button icon="plus" caption="Z ⮕ X" @click="shearZXup" color="danger" class="mr-2"></action-button>
            <action-button icon="minus" caption="Z ⮕ X" @click="shearZXdown" color="danger"></action-button>
          </div>

          <div class="d-flex">
            <action-button icon="plus" caption="X ⮕ Y" @click="shearXYup" color="success" class="mr-2"></action-button>
            <action-button icon="minus" caption="X ⮕ Y" @click="shearXYdown" color="success"></action-button>
          </div>
          <div class="d-flex">
            <action-button icon="plus" caption="Z ⮕ Y" @click="shearZYup" color="success" class="mr-2"></action-button>
            <action-button icon="minus" caption="Z ⮕ Y" @click="shearZYdown" color="success"></action-button>
          </div>

          <div class="d-flex">
            <action-button icon="plus" caption="X ⮕ Z" @click="shearXZup" class="mr-2"></action-button>
            <action-button icon="minus" caption="X ⮕ Z" @click="shearXZdown"></action-button>
          </div>
          <div class="d-flex">
            <action-button icon="plus" caption="Y ⮕ Z" @click="shearYZup" class="mr-2"></action-button>
            <action-button icon="minus" caption="Y ⮕ Z" @click="shearYZdown"></action-button>
          </div>
        </b-tab>

        <b-tab title="Plane">
            <div class="mb-1 pt-1 font-weight-bold">ax+by+cz+d=0</div>
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
                <input type="number" step="0.1" class="form-control form-control-sm" id="c" v-model.number="c">
              </div>
            </div>
            <div class="form-group row">
              <label for="d" class="col-sm-2 col-form-label">d:</label>
              <div class="col-sm-10">
                <input type="number" step="1" class="form-control form-control-sm" id="d" v-model.number="d">
              </div>
            </div>
            <action-button icon="arrow-right" caption="Mirror" color="primary" @click="mirror"></action-button>
        </b-tab>

        <b-tab title="Perspective projection" class="mt-2">
            <label for="xIntercept">x intercept:</label>
            <input type="number" step="1" class="form-control form-control-sm" id="xIntercept" v-model.number="xIntercept">
            <label for="yIntercept">y intercept:</label>
            <input type="number" step="1" class="form-control form-control-sm" id="yIntercept" v-model.number="yIntercept">
            <label for="yIntercept">z intercept:</label>
            <input type="number" step="1" class="form-control form-control-sm" id="zIntercept" v-model.number="zIntercept">
            <action-button class="mt-3" icon="video-camera" caption="Project" color="danger" @click="perspectiveProjection"></action-button>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>

<script>
  import 'vue-awesome/icons/arrow-up'
  import 'vue-awesome/icons/arrow-down'
  import 'vue-awesome/icons/arrow-right'
  import 'vue-awesome/icons/arrow-left'
  import 'vue-awesome/icons/plus'
  import 'vue-awesome/icons/minus'
  import 'vue-awesome/icons/rotate-right'
  import 'vue-awesome/icons/rotate-left'
  import 'vue-awesome/icons/video-camera'

  import ActionButton from './ActionButton'
  import GeometryCanvas from './GeometryCanvas'

  import { mapActions, mapMutations, mapState } from 'vuex'

  const initialData = () => {
    return {
      a: -3,
      b: 2,
      c: -3,
      d: -5,
      xIntercept: 6,
      yIntercept: 6,
      zIntercept: 6
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
      ...mapState(['coordinates', 'implementations', 'currentImplementation'])
    },
    methods: {
      perspectiveProjection () {
        this.$store.dispatch('perspectiveProjection', {
          xIntercept: this.xIntercept,
          yIntercept: this.yIntercept,
          zIntercept: this.zIntercept
        })
      },
      mirror () {
        this.$store.dispatch('mirror', {
          a: this.a,
          b: this.b,
          c: this.c,
          d: this.d
        })
      },
      ...mapActions([
        'moveXup', 'moveXdown', 'moveYup', 'moveYdown', 'moveZup', 'moveZdown',
        'stretchX', 'contractX', 'stretchY', 'contractY', 'stretchZ', 'contractZ',

        // yx, zx, xy, zy, xz, yz
        'shearYXup', 'shearYXdown', 'shearZXup', 'shearZXdown', 'shearXYup', 'shearXYdown',
        'shearZYup', 'shearZYdown', 'shearXZup', 'shearXZdown', 'shearYZup', 'shearYZdown',

        'rotateOriginClockwiseX', 'rotateOriginCounterClockwiseX', 'rotateOriginClockwiseY',
        'rotateOriginCounterClockwiseY', 'rotateOriginClockwiseZ', 'rotateOriginCounterClockwiseZ',
        'rotateCenterClockwiseX', 'rotateCenterCounterClockwiseX', 'rotateCenterClockwiseY',
        'rotateCenterCounterClockwiseY', 'rotateCenterClockwiseZ', 'rotateCenterCounterClockwiseZ'
      ]),
      ...mapMutations(['reset', 'setImplementation'])
    }
  }

</script>

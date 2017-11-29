<template>
  <div class="row">
    <div class="col">
      <geometry-canvas></geometry-canvas>
    </div>
    <div class="col-4">
      <button class="btn btn-danger w-100 mb-2" @click="reset">Reset</button>
      <div class="row">
        <div class="col-6">
          <div>
            <div class="mb-1 pt-1 font-weight-bold">Move</div>
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
          </div>

          <div>
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
          </div>

          <div>
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
          </div>
        </div>
        <div class="col-6">
          <div>
            <div class="mb-1 pt-1 font-weight-bold">Rotate around origin</div>
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
  import 'vue-awesome/icons/plus'
  import 'vue-awesome/icons/minus'
  import 'vue-awesome/icons/rotate-right'
  import 'vue-awesome/icons/rotate-left'

  import ActionButton from './ActionButton'
  import GeometryCanvas from './GeometryCanvas'

  import { mapActions, mapMutations, mapState } from 'vuex'

  const initialData = () => {
    return {}
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
      ...mapState(['coordinates', 'camera'])
    },
    methods: {
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
      ...mapMutations(['reset'])
    }
  }

</script>

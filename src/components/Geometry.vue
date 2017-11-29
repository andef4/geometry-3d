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
        'stretchX', 'contractX', 'stretchY', 'contractY', 'stretchZ', 'contractZ'
      ]),
      ...mapMutations(['reset'])
    }
  }

</script>

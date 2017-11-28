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
            <action-button icon="arrow-up" caption="x up" @click="moveXup" color="danger"></action-button>
            <action-button icon="arrow-down" caption="x down" @click="moveXdown" color="danger"></action-button>
            <action-button icon="arrow-up" caption="y up" @click="moveYup" color="success"></action-button>
            <action-button icon="arrow-down" caption="y down" @click="moveYdown"color="success"></action-button>
            <action-button icon="arrow-up" caption="z up" @click="moveZup"></action-button>
            <action-button icon="arrow-down" caption="z down" @click="moveZdown"></action-button>
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
        'moveXup', 'moveXdown', 'moveYup', 'moveYdown', 'moveZup', 'moveZdown'
      ]),
      ...mapMutations(['reset'])
    }
  }

</script>

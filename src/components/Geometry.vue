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
            <action-button icon="arrow-up" caption="Up" @click="moveUp"></action-button>
            <action-button icon="arrow-down" caption="Down" @click="moveDown"></action-button>
            <action-button icon="arrow-right" caption="Right" @click="moveRight"></action-button>
            <action-button icon="arrow-left" caption="Left" @click="moveLeft"></action-button>
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
        'moveUp', 'moveDown', 'moveRight', 'moveLeft'
      ]),
      ...mapMutations(['reset'])
    }
  }

</script>

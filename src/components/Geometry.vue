<template>
  <div class="row">
    <div class="col">canvas</div>
    <div class="col-3">

      <p class="h5">Move</p>
      <action-button icon="arrow-up" caption="Up" @click="moveUp"></action-button>
      <action-button icon="arrow-down" caption="Down" @click="moveDown"></action-button>
      <action-button icon="arrow-right" caption="Right" @click="moveRight"></action-button>
      <action-button icon="arrow-left" caption="Left" @click="moveLeft"></action-button>

      <p class="h5 mt-3">Rotate around center</p>
      <action-button icon="rotate-right" caption="Clockwise" @click="rotateClockwiseCenter" color="success"></action-button>
      <action-button icon="rotate-left" caption="Counterclockwise" @click="rotateCounterclockwiseCenter" color="success"></action-button>

      <p class="h5 mt-3">Rotate around origin</p>
      <action-button icon="rotate-right" caption="Clockwise" @click="rotateClockwiseOrigin" color="danger"></action-button>
      <action-button icon="rotate-left" caption="Counterclockwise" @click="rotateCounterclockwiseOrigin" color="danger"></action-button>

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

  export default {
    components: {
      ActionButton
    }
  }
</script>

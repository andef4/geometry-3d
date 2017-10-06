<template>
  <div class="row">
    <div class="col">canvas</div>
    <div class="col-2">

      <span class="font-weight-bold">Move</span>
      <action-button icon="arrow-up" caption="Up" @click="moveUp"></action-button>
      <action-button icon="arrow-down" caption="Down" @click="moveDown"></action-button>
      <action-button icon="arrow-right" caption="Right" @click="moveRight"></action-button>
      <action-button icon="arrow-left" caption="Left" @click="moveLeft"></action-button>

      <span class="font-weight-bold">Rotate around center</span>
      <action-button icon="rotate-right" caption="Clockwise" @click="rotateClockwiseCenter" color="success"></action-button>
      <action-button icon="rotate-left" caption="Counterclockwise" @click="rotateCounterclockwiseCenter" color="success"></action-button>

      <span class="font-weight-bold">Rotate around origin</span>
      <action-button icon="rotate-right" caption="Clockwise" @click="rotateClockwiseOrigin" color="danger"></action-button>
      <action-button icon="rotate-left" caption="Counterclockwise" @click="rotateCounterclockwiseOrigin" color="danger"></action-button>

    </div>

    <div class="col-2">

      <span class="font-weight-bold">Stretch and contract</span>
      <action-button icon="arrow-left" second-icon="arrow-right" caption="Stretch" @click="moveDown" color="warning"></action-button>
      <action-button icon="arrow-right" second-icon="arrow-left" caption="Contract" @click="moveUp" color="warning"></action-button>

      <span class="font-weight-bold">Sheer</span>
      <action-button icon="arrow-right" caption="Top to right" @click="moveDown" color="info"></action-button>
      <action-button icon="arrow-left" caption="Top to left" @click="moveUp" color="info"></action-button>
      <action-button icon="arrow-up" caption="Right to top" @click="moveDown" color="info"></action-button>
      <action-button icon="arrow-down" caption="Right to bottom" @click="moveUp" color="info"></action-button>

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

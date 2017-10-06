<template>
  <div class="row">
    <div class="col" style="background-color: black">canvas</div>
    <div class="col-2">

      <div class="mb-1 pt-1 font-weight-bold">Move</div>
      <action-button icon="arrow-up" caption="Up" @click="moveUp"></action-button>
      <action-button icon="arrow-down" caption="Down" @click="moveDown"></action-button>
      <action-button icon="arrow-right" caption="Right" @click="moveRight"></action-button>
      <action-button icon="arrow-left" caption="Left" @click="moveLeft"></action-button>


      <div class="mb-1 pt-1 font-weight-bold">Rotate around rectangle center</div>
      <action-button icon="rotate-right" caption="Clockwise" @click="rotateClockwiseCenter" color="success"></action-button>
      <action-button icon="rotate-left" caption="Counterclockwise" @click="rotateCounterclockwiseCenter" color="success"></action-button>


      <div class="mb-1 pt-1 font-weight-bold">Rotate around origin</div>
      <action-button icon="rotate-right" caption="Clockwise" @click="rotateClockwiseOrigin" color="danger"></action-button>
      <action-button icon="rotate-left" caption="Counterclockwise" @click="rotateCounterclockwiseOrigin" color="danger"></action-button>

      <div class="mb-1 pt-1 font-weight-bold">Rotate around point</div>
      <div class="form-group row">
        <label for="m1" class="col-sm-2 col-form-label">m<sub>1</sub>:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-control-sm" id="m1">
        </div>
      </div>
      <div class="form-group row">
        <label for="m2" class="col-sm-2 col-form-label">m<sub>2</sub>:</label>
        <div class="col-sm-10">
          <input type="text" class="form-control form-control-sm" id="m2">
        </div>
      </div>

      <action-button icon="rotate-right" caption="Clockwise" @click="rotateClockwiseOrigin" color="danger"></action-button>
      <action-button icon="rotate-left" caption="Counterclockwise" @click="rotateCounterclockwiseOrigin" color="danger"></action-button>


      <div class="mb-1 pt-1 font-weight-bold">Stretch and contract</div>
      <action-button icon="arrow-left" second-icon="arrow-right" caption="Stretch" @click="moveDown" color="warning"></action-button>
      <action-button icon="arrow-right" second-icon="arrow-left" caption="Contract" @click="moveUp" color="warning"></action-button>


    </div>

    <div class="col-2">

      <div class="mb-1 pt-1 font-weight-bold">Sheer</div>
      <action-button icon="arrow-right" caption="Top to right" @click="moveDown" color="info"></action-button>
      <action-button icon="arrow-left" caption="Top to left" @click="moveUp" color="info"></action-button>
      <action-button icon="arrow-up" caption="Right to top" @click="moveDown" color="info"></action-button>
      <action-button icon="arrow-down" caption="Right to bottom" @click="moveUp" color="info"></action-button>

      <div>
        <div class="mb-1 pt-1 font-weight-bold">Mirror on line</div>

        <div>a∙x + b∙y + c = 0</div>

        <div class="form-group row">
          <label for="a" class="col-sm-2 col-form-label">a:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="a">
          </div>
        </div>
        <div class="form-group row">
          <label for="b" class="col-sm-2 col-form-label">b:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="b">
          </div>
        </div>
        <div class="form-group row">
          <label for="c" class="col-sm-2 col-form-label">c:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="c">
          </div>
        </div>

        <action-button icon="arrow-right" caption="Mirror" @click="moveDown" color="primary"></action-button>
      </div>

      <div>
        <div class="mb-1 pt-1 font-weight-bold">Perspective projection</div>
          <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" value="">
            Activate
          </label>
        </div>
        <div class="form-group row">
          <label for="u1" class="col-sm-2 col-form-label">u<sub>1</sub>:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="u1">
          </div>
        </div>
        <div class="form-group row">
          <label for="u2" class="col-sm-2 col-form-label">u<sub>2</sub>:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="u2">
          </div>
        </div>
        <div class="form-group row">
          <label for="v1" class="col-sm-2 col-form-label">v<sub>1</sub>:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="v1">
          </div>
        </div>
        <div class="form-group row">
          <label for="v2" class="col-sm-2 col-form-label">v<sub>2</sub>:</label>
          <div class="col-sm-10">
            <input type="text" class="form-control form-control-sm" id="v2">
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

  import ActionButton from './ActionButton'

  export default {
    components: {
      ActionButton
    }
  }
</script>

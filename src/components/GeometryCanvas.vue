<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: {
      m1: Number,
      m2: Number,
      a: Number,
      b: Number,
      c: Number,
      u1: Number,
      u2: Number,
      v1: Number,
      v2: Number,
      perspectiveProjection: Boolean
    },
    methods: {
      draw () {
        console.log('draw call')
      }
    },
    computed: {
      ...mapState(['coordinates'])
    },
    watch: {
      m1 () { this.draw() },
      m2 () { this.draw() },
      a () { this.draw() },
      b () { this.draw() },
      c () { this.draw() },
      u1 () { this.draw() },
      u2 () { this.draw() },
      v1 () { this.draw() },
      v2 () { this.draw() },
      perspectiveProjection () { this.draw() },
      coordinates () { this.draw() }
    }
  }
</script>

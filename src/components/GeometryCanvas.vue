<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
  import { mapState } from 'vuex'

  let mathToDisplayX = x => {
    return x + 500
  }
  let mathToDisplayY = y => {
    return -y + 500
  }

  export default {
    props: {
      m1: Number,
      m2: Number,
      a: Number,
      b: Number,
      u1: Number,
      u2: Number,
      v1: Number,
      v2: Number
    },
    methods: {
      draw () {
        let ctx = this.$refs.canvas.getContext('2d')
        // clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.strokeStyle = 'grey'
        ctx.lineWidth = 1

        /***********
         * outline *
         ***********/
        ctx.beginPath()
        ctx.moveTo(500, 0)
        ctx.lineTo(500, 1000)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, 500)
        ctx.lineTo(1000, 500)
        ctx.stroke()

        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'red'
        ctx.lineWidth = 3

        /**********
         * square *
         **********/

        // red rectangle
        ctx.beginPath()
        // center
        ctx.moveTo((this.coordinates.a.x + this.coordinates.c.x) / 2,
                   (this.coordinates.a.y + this.coordinates.c.y) / 2)
        // point between b and c
        ctx.lineTo((this.coordinates.b.x + this.coordinates.c.x) / 2,
                   (this.coordinates.b.y + this.coordinates.c.y) / 2)
        // bottom right corner (c)
        ctx.lineTo(this.coordinates.c.x, this.coordinates.c.y)
        // point between d and c
        ctx.lineTo((this.coordinates.d.x + this.coordinates.c.x) / 2,
                   (this.coordinates.d.y + this.coordinates.c.y) / 2)
        ctx.fill()

        // outer rectangle
        ctx.beginPath()
        ctx.moveTo(this.coordinates.a.x, this.coordinates.a.y)
        ctx.lineTo(this.coordinates.b.x, this.coordinates.b.y)
        ctx.lineTo(this.coordinates.c.x, this.coordinates.c.y)
        ctx.lineTo(this.coordinates.d.x, this.coordinates.d.y)
        ctx.closePath()
        ctx.stroke()

        // line from top to bottom
        ctx.beginPath()
        ctx.moveTo((this.coordinates.a.x + this.coordinates.b.x) / 2,
                   (this.coordinates.a.y + this.coordinates.b.y) / 2)
        ctx.lineTo((this.coordinates.d.x + this.coordinates.c.x) / 2,
                   (this.coordinates.d.y + this.coordinates.c.y) / 2)
        ctx.stroke()

        // line from left to right
        ctx.beginPath()
        ctx.moveTo((this.coordinates.a.x + this.coordinates.d.x) / 2,
                   (this.coordinates.a.y + this.coordinates.d.y) / 2)
        ctx.lineTo((this.coordinates.b.x + this.coordinates.c.x) / 2,
                   (this.coordinates.b.y + this.coordinates.c.y) / 2)
        ctx.stroke()

        /**********
         * points *
         **********/
        ctx.fillStyle = 'black'
        ctx.font = '20px sans-serif'

        ctx.beginPath()
        ctx.arc(mathToDisplayX(this.m1) - 2, mathToDisplayY(this.m2) + 2, 4, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.fillText('m', mathToDisplayX(this.m1) + 8, mathToDisplayY(this.m2) + 8)

        /********
         * line *
         ********/
        ctx.beginPath()
        ctx.moveTo(mathToDisplayX(500), mathToDisplayY(this.a * 500 + this.b))
        ctx.lineTo(mathToDisplayX(-500), mathToDisplayY(this.a * -500 + this.b))
        ctx.stroke()
      }
    },
    mounted () {
      // make canvas a square
      this.$refs.canvas.style.height = `${this.$refs.canvas.offsetWidth}px`
      // set internal resolution of the canvas
      this.$refs.canvas.height = 1000
      this.$refs.canvas.width = 1000
      this.draw()
    },
    computed: {
      ...mapState({
        originalCoordinates: 'coordinates'
      }),
      coordinates () {
        return {
          a: { x: mathToDisplayX(this.originalCoordinates.a.x), y: mathToDisplayY(this.originalCoordinates.a.y) },
          b: { x: mathToDisplayX(this.originalCoordinates.b.x), y: mathToDisplayY(this.originalCoordinates.b.y) },
          c: { x: mathToDisplayX(this.originalCoordinates.c.x), y: mathToDisplayY(this.originalCoordinates.c.y) },
          d: { x: mathToDisplayX(this.originalCoordinates.d.x), y: mathToDisplayY(this.originalCoordinates.d.y) }
        }
      }
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
      coordinates: {
        handler () { this.draw() },
        deep: true
      }
    }
  }
</script>

<style lang="sass" scoped>
  canvas
    width: 100%
</style>

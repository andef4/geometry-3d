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
      ux: Number,
      uy: Number,
      vx: Number,
      vy: Number
    },
    data () {
      return {
        pixelRation: 0
      }
    },
    mounted () {
      // make canvas a square
      this.$refs.canvas.style.height = `${this.$refs.canvas.offsetWidth}px`
      // set internal resolution of the canvas
      this.$refs.canvas.height = this.$refs.canvas.offsetWidth
      this.$refs.canvas.width = this.$refs.canvas.offsetWidth

      this.pixelRation = this.$refs.canvas.offsetWidth / 1000
      this.draw()
    },
    methods: {
      mathToDisplayX (x) {
        return Math.round((x + 500) * this.pixelRation) + 0.5
      },
      mathToDisplayY (y) {
        return Math.round((-y + 500) * this.pixelRation) + 0.5
      },
      draw () {
        let ctx = this.$refs.canvas.getContext('2d')
        // clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.strokeStyle = 'grey'
        ctx.lineWidth = 1 * this.pixelRation

        /***********
         * outline *
         ***********/
        ctx.beginPath()
        ctx.moveTo(this.mathToDisplayX(0), this.mathToDisplayY(-500))
        ctx.lineTo(this.mathToDisplayX(0), this.mathToDisplayY(500))
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(this.mathToDisplayX(-500), this.mathToDisplayY(0))
        ctx.lineTo(this.mathToDisplayX(500), this.mathToDisplayY(0))
        ctx.stroke()

        /**********
         * square *
         **********/
        ctx.strokeStyle = 'black'
        ctx.fillStyle = 'red'
        ctx.lineWidth = 3 * this.pixelRation

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

        // labels
        ctx.fillStyle = 'black'
        ctx.font = `${this.pixelRation * 20}px sans-serif`
        ctx.fillText('x: 500', this.mathToDisplayX(430), this.mathToDisplayY(10))
        ctx.fillText('x: -500', this.mathToDisplayX(-500), this.mathToDisplayY(10))
        ctx.fillText('y: -500', this.mathToDisplayX(5), this.mathToDisplayY(-490))
        ctx.fillText('y: 500', this.mathToDisplayX(5), this.mathToDisplayY(485))

        /**********
         * points *
         **********/
        ctx.beginPath()
        ctx.arc(this.mathToDisplayX(this.m1) - 2, this.mathToDisplayY(this.m2) + 2, 4 * this.pixelRation, 0, Math.PI * 2, true)
        ctx.fill()
        ctx.fillText('m', this.mathToDisplayX(this.m1) + 8, this.mathToDisplayY(this.m2) + 8)

        /********
         * line *
         ********/
        let a = -(this.a / this.b)
        let b = -(this.c / this.b)
        ctx.beginPath()
        ctx.moveTo(this.mathToDisplayX(500), this.mathToDisplayY(a * 500 + b))
        ctx.lineTo(this.mathToDisplayX(-500), this.mathToDisplayY(a * -500 + b))
        ctx.stroke()

        /**************************
         * perspective projection *
         **************************/
        ctx.lineWidth = 3 * this.pixelRation
        ctx.strokeStyle = '#218838'
        ctx.beginPath()
        ctx.moveTo(this.mathToDisplayX(this.ux), this.mathToDisplayY(this.uy))
        ctx.lineTo(this.mathToDisplayX(this.vx), this.mathToDisplayY(this.vy))
        ctx.stroke()
      }
    },
    computed: {
      ...mapState({
        originalCoordinates: 'coordinates'
      }),
      coordinates () {
        return {
          a: { x: this.mathToDisplayX(this.originalCoordinates.a.x), y: this.mathToDisplayY(this.originalCoordinates.a.y) },
          b: { x: this.mathToDisplayX(this.originalCoordinates.b.x), y: this.mathToDisplayY(this.originalCoordinates.b.y) },
          c: { x: this.mathToDisplayX(this.originalCoordinates.c.x), y: this.mathToDisplayY(this.originalCoordinates.c.y) },
          d: { x: this.mathToDisplayX(this.originalCoordinates.d.x), y: this.mathToDisplayY(this.originalCoordinates.d.y) }
        }
      }
    },
    watch: {
      m1 () { this.draw() },
      m2 () { this.draw() },
      a () { this.draw() },
      b () { this.draw() },
      c () { this.draw() },
      ux () { this.draw() },
      uy () { this.draw() },
      vx () { this.draw() },
      vy () { this.draw() },
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

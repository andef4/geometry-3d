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
      v2: Number
    },
    methods: {
      draw () {
        let ctx = this.$refs.canvas.getContext('2d')
        // clear canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

        ctx.fillStyle = 'red'
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 3

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

<template>
  <div ref="canvas"></div>
</template>

<script>
  import { mapState } from 'vuex'

  import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, MeshBasicMaterial, BoxGeometry } from 'three/build/three.module'
  import OrbitControls from './OrbitalControls'

  export default {
    mounted () {
      // make canvas a square
      this.$refs.canvas.style.height = `${this.$refs.canvas.offsetWidth}px`
      // set internal resolution of the canvas
      this.$refs.canvas.height = this.$refs.canvas.offsetWidth
      this.$refs.canvas.width = this.$refs.canvas.offsetWidth

      let scene = new Scene()

      let renderer = new WebGLRenderer()
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(this.$refs.canvas.offsetWidth, this.$refs.canvas.offsetWidth)
      this.$refs.canvas.appendChild(renderer.domElement)

      let camera = new PerspectiveCamera(75, 1, 0.1, 1000)
      camera.position.z = 3

      let controls = new OrbitControls(camera, renderer.domElement)
      controls.addEventListener('change', render)

      let cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({color: 0xFFFFFF}))
      scene.add(cube)

      const render = () => {
        renderer.render(scene, camera)
        requestAnimationFrame(render)
      }
      render()
    },
    computed: {
      ...mapState(['coordinates'])
    },
    watch: {
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

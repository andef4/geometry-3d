<template>
  <div ref="canvas"></div>
</template>

<script>
  import { mapState } from 'vuex'

  import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, BoxGeometry, TextureLoader, MeshBasicMaterial, Color } from 'three/build/three.module'
  import OrbitControls from './OrbitalControls'

  export default {
    mounted () {
      // make canvas a square
      this.$refs.canvas.style.height = `${this.$refs.canvas.offsetWidth}px`
      // set internal resolution of the canvas
      this.$refs.canvas.height = this.$refs.canvas.offsetWidth
      this.$refs.canvas.width = this.$refs.canvas.offsetWidth

      // renderer setup
      let renderer = new WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(this.$refs.canvas.offsetWidth, this.$refs.canvas.offsetWidth)
      this.$refs.canvas.appendChild(renderer.domElement)

      // camera and controls setup
      let camera = new PerspectiveCamera(75, 1, 0.1, 1000)
      camera.position.z = 3

      let controls = new OrbitControls(camera, renderer.domElement)
      controls.addEventListener('change', render)

      // scene setup
      let scene = new Scene()
      scene.background = new Color(0xFFFFFF)

      let textureLoader = new TextureLoader()
      let blankTexture = textureLoader.load('/static/blank.png')
      let redRightBottomTexture = textureLoader.load('/static/red_rb.png')
      let redRightTopTexture = textureLoader.load('/static/red_rt.png')
      let redLeftBottomTexture = textureLoader.load('/static/red_lb.png')

      let materials = [
        new MeshBasicMaterial({ map: redLeftBottomTexture }),
        new MeshBasicMaterial({ map: blankTexture }),
        new MeshBasicMaterial({ map: blankTexture }),
        new MeshBasicMaterial({ map: redRightTopTexture }),
        new MeshBasicMaterial({ map: redRightBottomTexture }),
        new MeshBasicMaterial({ map: blankTexture })
      ]

      let cube = new Mesh(new BoxGeometry(1, 1, 1), materials)
      scene.add(cube)

      // rendering
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

<template>
  <div ref="canvas"></div>
</template>

<script>
  import { mapState } from 'vuex'

  import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, BoxGeometry, TextureLoader, MeshBasicMaterial,
    Color, AxesHelper }
  from 'three/build/three.module'

  import OrbitControls from './OrbitalControls'

  let geometry = new BoxGeometry(1, 1, 1)

  export default {
    data () {
      return {
        geometry: null
      }
    },
    mounted () {
      // make canvas a square
      this.$refs.canvas.style.height = `${this.$refs.canvas.offsetWidth}px`
      // set internal resolution of the canvas
      this.$refs.canvas.height = this.$refs.canvas.offsetWidth
      this.$refs.canvas.width = this.$refs.canvas.offsetWidth

      // renderer setup
      let renderer = new WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(this.$refs.canvas.offsetWidth - 1, this.$refs.canvas.offsetWidth - 1)
      this.$refs.canvas.appendChild(renderer.domElement)

      // camera and controls setup
      let camera = new PerspectiveCamera(75, 1, 0.1, 1000)
      camera.position.x = 6.5
      camera.position.y = 4
      camera.position.z = 8.5

      let controls = new OrbitControls(camera, renderer.domElement)
      controls.addEventListener('change', render)

      // scene setup
      let scene = new Scene()
      scene.background = new Color(0xFFFFFF)

      let textureLoader = new TextureLoader()
      let blankTexture = textureLoader.load('./static/blank.png')
      let redRightBottomTexture = textureLoader.load('./static/red_rb.png')
      let redRightTopTexture = textureLoader.load('./static/red_rt.png')
      let redLeftBottomTexture = textureLoader.load('./static/red_lb.png')

      let materials = [
        new MeshBasicMaterial({ map: redLeftBottomTexture }),
        new MeshBasicMaterial({ map: blankTexture }),
        new MeshBasicMaterial({ map: blankTexture }),
        new MeshBasicMaterial({ map: redRightTopTexture }),
        new MeshBasicMaterial({ map: redRightBottomTexture }),
        new MeshBasicMaterial({ map: blankTexture })
      ]

      // this.geometry = new BoxGeometry(1, 1, 1)
      let cube = new Mesh(geometry, materials)
      geometry.vertices = Object.assign({}, this.coordinates)

      scene.add(cube)

      let axesHelper = new AxesHelper(100)
      scene.add(axesHelper)

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
        handler (value) {
          for (let i = 0; i < value.length; i++) {
            geometry.vertices[i].x = value[i].x
            geometry.vertices[i].y = value[i].y
            geometry.vertices[i].z = value[i].z
          }
          geometry.verticesNeedUpdate = true
        },
        deep: true
      }
    }
  }
</script>

<style lang="sass" scoped>
  canvas
    width: 100%
</style>

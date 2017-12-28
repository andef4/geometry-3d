<template>
  <div ref="canvas"></div>
</template>

<script>
  import { mapState } from 'vuex'

  import { Scene, WebGLRenderer, PerspectiveCamera, Mesh, BoxGeometry, TextureLoader, MeshBasicMaterial,
    Color, AxesHelper, SphereGeometry, PlaneGeometry, DoubleSide, Plane, Vector3 }
  from 'three/build/three.module'

  import OrbitControls from './OrbitalControls'

  let geometry = new BoxGeometry(1, 1, 1)
  let xInterceptSphere = null
  let yInterceptSphere = null
  let zInterceptSphere = null
  let planeGeometry = null
  let plane = null

  export default {
    props: {
      a: Number,
      b: Number,
      c: Number,
      d: Number,
      xIntercept: Number,
      yIntercept: Number,
      zIntercept: Number
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

      // add cube to scene
      let textureLoader = new TextureLoader()
      let blankTexture = textureLoader.load('./static/blank.png')
      let redRightBottomTexture = textureLoader.load('./static/red_rb.png')
      let redRightTopTexture = textureLoader.load('./static/red_rt.png')
      let redLeftBottomTexture = textureLoader.load('./static/red_lb.png')

      let materials = [
        new MeshBasicMaterial({ map: redLeftBottomTexture, side: DoubleSide }),
        new MeshBasicMaterial({ map: blankTexture, side: DoubleSide }),
        new MeshBasicMaterial({ map: blankTexture, side: DoubleSide }),
        new MeshBasicMaterial({ map: redRightTopTexture, side: DoubleSide }),
        new MeshBasicMaterial({ map: redRightBottomTexture, side: DoubleSide }),
        new MeshBasicMaterial({ map: blankTexture, side: DoubleSide })
      ]

      let cube = new Mesh(geometry, materials)
      geometry.vertices = Object.assign({}, this.coordinates)
      scene.add(cube)

      // add x/y/z intercept for perspective projection
      xInterceptSphere = createInterceptSphere(this.xIntercept, 0, 0)
      yInterceptSphere = createInterceptSphere(0, this.yIntercept, 0)
      zInterceptSphere = createInterceptSphere(0, 0, this.zIntercept)
      scene.add(xInterceptSphere)
      scene.add(yInterceptSphere)
      scene.add(zInterceptSphere)

      // show red/green/blue axis
      let axesHelper = new AxesHelper(100)
      scene.add(axesHelper)

      planeGeometry = new PlaneGeometry(100, 100)
      let planeMaterial = new MeshBasicMaterial({ color: 0x0069d9, transparent: true, opacity: 0.5, side: DoubleSide })
      plane = new Mesh(planeGeometry, planeMaterial)
      scene.add(plane)
      calculatePlanePosition(this.a, this.b, this.c, this.d)

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
      },
      xIntercept (value) {
        xInterceptSphere.position.x = value
      },
      yIntercept (value) {
        yInterceptSphere.position.y = value
      },
      zIntercept (value) {
        zInterceptSphere.position.z = value
      },
      a () {
        calculatePlanePosition(this.a, this.b, this.c, this.d)
      },
      b () {
        calculatePlanePosition(this.a, this.b, this.c, this.d)
      },
      c () {
        calculatePlanePosition(this.a, this.b, this.c, this.d)
      },
      d () {
        calculatePlanePosition(this.a, this.b, this.c, this.d)
      }
    }
  }

  const createInterceptSphere = (x, y, z) => {
    let geometry = new SphereGeometry(0.06, 32, 32)
    let material = new MeshBasicMaterial({ color: 0x000000 })
    let sphere = new Mesh(geometry, material)
    sphere.position.x = x
    sphere.position.y = y
    sphere.position.z = z
    return sphere
  }

  const calculatePlanePosition = (a, b, c, d) => {
    let planeX = -(d / a)
    let planeY = -(d / b)
    let planeZ = -(d / c)
    let planeMath = new Plane()
    planeMath.setFromCoplanarPoints(new Vector3(planeX, 0, 0), new Vector3(0, planeY, 0), new Vector3(0, 0, planeZ))
    let coplanarPoint = planeMath.coplanarPoint()
    let focalPoint = new Vector3().copy(coplanarPoint).add(planeMath.normal)
    planeGeometry = new PlaneGeometry(100, 100)
    planeGeometry.lookAt(focalPoint)
    planeGeometry.translate(coplanarPoint.x, coplanarPoint.y, coplanarPoint.z)
    plane.geometry = planeGeometry
  }

</script>

<style lang="sass" scoped>
  canvas
    width: 100%
</style>

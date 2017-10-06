<template>
  <div>
    <nav class="navbar navbar-dark bg-dark">
      <span class="navbar-brand">Geometry 2D</span>
    </nav>
    <div class="container">
      <geometry></geometry>
    </div>
  </div>
</template>

<script>
import Geometry from './components/Geometry'

export default {
  name: 'app',
  components: {
    Geometry
  }
}
</script>

<style lang="sass" scoped>
  .container
    margin-top: 10px
</style>

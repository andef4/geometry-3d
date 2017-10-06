<template>
    <button class="btn btn-sm d-flex justify-content-between align-items-center" :class="'btn-' + color" @click="click">
      <icon :name="icon"></icon>
      <span class="font-weight-bold">{{ caption }}</span>
      <div class="right"></div>
    </button>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        required: true
      },
      caption: {
        type: String,
        required: true
      },
      color: {
        type: String,
        default: 'primary'
      }
    },
    methods: {
      click () {
        this.$emit('click')
      }
    }
  }
</script>

<style lang="sass" scoped>
  button
    width: 100%
    margin-bottom: 10px
  .right
    width: 15px
</style>

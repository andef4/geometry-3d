<template>
    <button class="btn btn-sm d-flex justify-content-between" :class="'btn-' + color" @click="click">
      <div class="d-flex align-items-center mr-1">
        <icon :name="icon"></icon>
        <icon :name="secondIcon" v-if="secondIcon" class="second-icon"></icon>
      </div>
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
      secondIcon: {
        type: String
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
  .second-icon
    margin-left: 1px
</style>

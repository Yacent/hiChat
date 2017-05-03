<template>
  <div class="container">
    <slot name="tips"></slot>
    <slot name="show-list"></slot>
    <slot name="nothing"></slot>
    <slot name="content"></slot>
  </div>
</template>

<script>
export default {
  name: 'container',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.container {
  /*position: relative;*/
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding-top: 5px;
}

p {
  margin: 0;
  padding: 0;
}
</style>

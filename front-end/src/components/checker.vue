<template>
  <div class="checker">
    <icon type="info"></icon>
    <slot></slot>
  </div>
</template>

<script>
import { Icon } from 'vux'

export default {
  name: 'checker',
  data () {
    return {
      msg: 'asd'
    }
  },
  components: {
    Icon
  }
}
</script>

<style scoped>
.checker {
  position: absolute;
  top: 0;
  left: 0;
  height: 50px;
  width: 100%;
  line-height: 50px;
  text-align: left;
  font-size: 20px;
  padding-left: 10px;
  background-color: #fff;

  box-shadow: 0 1px 10px #c0c0c0;
  -moz-box-shadow: 0 1px 10px #c0c0c0;

  transition: all .5s;
}
</style>

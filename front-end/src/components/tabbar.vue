<template>
  <div class="tabbar">
    <router-link class="left" :class="{isFocus: focusA}" to="/home">
      <icon name="comment"></icon>
      <span class="modify">最近</span>
      <badge :text="15"></badge>
    </router-link>
    <router-link class="right" :class="{isFocus: !focusA}" to="/contacts">
      <icon name="address-book-o"></icon>
      <span class="modify">联系人</span>
    </router-link>
  </div>
</template>

<script>
import { Badge } from 'vux'

export default {
  name: 'tabbar',
  props: ['focusA'],
  data () {
    return {
      msg: ''
    }
  },
  components: {
    Badge
  }
}
</script>

<style scoped>
.tabbar {
  width: 100%;
  height: 50px;
  background-color: rgb(249, 249, 249);

  position: absolute;
  bottom: 0;

  box-shadow: 0 -1px 1px #e0e0e0;
  -moz-box-shadow: 0 -1px 1px #e0e0e0;
}

.left, .right {
  text-align: center;
  float: left;
  height: 100%;
  width: 50%;

  position: relative;
  color: rgb(99, 107, 117);
}

svg {
  width: 24px;
  height: 24px;

  padding-top: 5px;
}

.modify {
  position: absolute;
  bottom: 3px;
  left: 50%;
  font-size: 5px;

  transform: translate(-50%);
}

.isFocus {
  color: rgb(6, 181, 224);
}

.vux-badge {
  display: inline-block;
  position: absolute;
  top: 3px;
  left: 52%;
  width: auto;
}
</style>

<template>
  <div class="nothing" v-show="isNothing">
    <div v-show="isHome">
      <icon name="hand-peace-o"></icon>
      <span>最近的对话将在此显示</span>
    </div>
    <div v-show="isContact">
      <icon name="frown-o"></icon>
      <span>暂时还没有联系人</span>
    </div>
    <div v-show="isNoNews">
      <icon name="child"></icon>
      <span>暂时还没有聊天消息</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nothing',
  props: ['isHome', 'isNothing', 'isContact', 'isNoNews'],
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.nothing {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  text-align: center;
}

.nothing svg {
  width: 100px;
  height: 100px;
  color: rgb(198, 213, 232);
}

.nothing span {
  display: block;
  color: rgb(99, 107, 117);
  margin-top: 10px;
}
</style>

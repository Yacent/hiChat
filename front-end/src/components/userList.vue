<template>
  <router-link class="user-list" :to="item.links">
    <div class="avatar" :style="{ backgroundColor: selectColor }">{{ avatar }}</div>
    <div class="right">
      <span class="nickname">{{ item.nickname }}</span>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'user-list',
  props: ['item'],
  data () {
    return {
      color: ['#e475c1', '#84beec', '#f495bf', '#85d8f8', '#ff8b8c', '#62d6d6', '#b3dbf4', '#ff6766']
    }
  },
  computed: {
    avatar () {
      return this.item.nickname.slice(0, 1).toUpperCase()
    },
    selectColor () {
      return this.color[Math.floor(Math.random() * 8)]
    }
  }
}
</script>

<style scoped>
.user-list {
  display: block;
  box-sizing: border-box;
  padding-left: 64px;
  width: 100%;
  height: 55px;
  line-height: 55px;
  position: relative;
  font-family: 'Arial, Helvetica, sans-serif';
  overflow: hidden;
}

.avatar {
  background-color: rgb(133, 216, 248);
  display: inline-block;
  text-align: center;
  font-size: 30px;
  color: rgb(221, 240, 252);
  width: 44px;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  float: left;
  margin: 6px 0 0 -55px;
  z-index: 999;
}

.right {
  display: inline-block;
  width: 100%;
  height: 55px;
  overflow: hidden;
  padding-left: -64px;
}

span.nickname {
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  height: 55px;
  line-height: 55px;
  width: 100%;
  margin-left: -64px;
  padding-left: 80px;
  font-size: 18px;
  color: #000;
}
</style>

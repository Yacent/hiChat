<template>
  <router-link class="news-list" :to="item.links" v-if="!item.type">
    <div class="avatar" :style="{ backgroundColor: selectColor }">{{ avatar }}</div>
    <div class="right">
      <span class="nickname">{{ item.receiverUser }}</span>
      <span class="last-sentence">{{ item.content }}</span>
      <span class="time">{{ item.times.time }}</span>
      <badge :text="item.counts" v-if="item.counts"></badge>
    </div>
  </router-link>
  <router-link class="news-list" :to="item.links" v-else>
    <div class="avatar" :style="{ backgroundColor: selectColor }">G</div>
    <div class="right">
      <span class="nickname">Group Chat</span>
      <span class="last-sentence">
        <span class="last-user">{{ item.times.user }} : </span>{{ item.content }}
      </span>
      <span class="time">{{ item.times.time }}</span>
      <badge :text="item.counts" v-if="item.counts"></badge>
    </div>
  </router-link>
</template>

<script>
// 该组件是用于显示最新聊天的列表
import { Badge } from 'vux'

export default {
  name: 'news-list',
  props: ['item'],
  data () {
    return {
      color: ['#e475c1', '#84beec', '#f495bf', '#85d8f8', '#ff8b8c', '#62d6d6', '#b3dbf4', '#ff6766']
    }
  },
  computed: {
    avatar () {
      return this.item.receiverUser.slice(0, 1).toUpperCase()
    },
    selectColor () {
      return this.color[Math.floor(Math.random() * 8)]
    }
  },
  components: {
    Badge
  }
}
</script>

<style scoped>
.news-list {
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

span.nickname, span.last-sentence {
  box-sizing: border-box;
  display: inline-block;
  position: absolute;
  height: 24px;
  line-height: 24px;
  width: 100%;
  margin-left: -64px;
  padding-left: 64px;
  padding-right: 45px;
}

.nickname {
  top: 7px;
  font-size: 17px;
  color: #000;
  font-weight: bold;
}

.last-user {
  color: #000;
}

.last-sentence {
  bottom: 3px;
  font-size: 12px;
  color: #707070;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}

.time {
  color: #707070;
  position: absolute;
  top: 10px;
  right: 8px;
  font-size: 12px;
  line-height: 12px;
}

.vux-badge {
  position: absolute;
  bottom: 11px;
  right: 9px;
}
</style>

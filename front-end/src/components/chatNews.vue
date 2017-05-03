<template>
  <div class="chat-news">
    <divider>{{ item.time }}</divider>
    <div class="single-news-left" v-if="notGroup">
      <span>{{ item.news }}</span>
      <div class="triangle"></div>
    </div>
    <div class="news-left" v-if="groupButNotSelf">
      <div class="avatar" :style="{ backgroundColor: selectColor }">{{ groupAvatar }}</div>
      <span class="span-nick">{{ item.nickname }}</span>
      <span class="span-news">{{ item.news }}</span>
      <div class="triangle"></div>
    </div>
    <div class="news-right" v-if="selfInfo === item.username">
      <span>{{ item.news }}</span>
      <div class="triangle"></div>
    </div>
  </div>
</template>

<script>
import { Divider } from 'vux'

export default {
  name: 'chat-news',
  props: ['item', 'selfInfo'],
  data () {
    return {
      color: ['#e475c1', '#84beec', '#f495bf', '#85d8f8', '#ff8b8c', '#62d6d6', '#b3dbf4', '#ff6766'],
      alreadySelect: false
    }
  },
  computed: {
    selectColor () {
      if (!this.alreadySelect) {
        this.alreadySelect = true
        return this.color[Math.floor(Math.random() * 8)]
      } else {
        return
      }
    },
    notGroup () {
      return (this.selfInfo !== this.item.username) && !this.item.isGroup
    },
    groupButNotSelf () {
      return (this.selfInfo !== this.item.username) && this.item.isGroup
    },
    groupAvatar () {
      return this.item.nickname.slice(0, 1).toUpperCase()
    }
  },
  components: {
    Divider
  }
}
</script>

<style scoped>
.chat-news {
  box-sizing: border-box;
  width: 100%;
  text-align: center;
  padding: 0 20px;
}

.news-right, .news-left, .single-news-left {
  position: relative;
  padding: 3px 0;
}

.news-left, .single-news-left {
  text-align: left;
}

.news-right {
  text-align: right;
}

span {
  display: inline-block;
  padding: 8px 10px;
  background-color: #ddf3ff;
  border-radius: 8px;
  vertical-align: top;
  max-width: 70%;
  color: #202020;
}

.triangle {
  width: 0;
  height: 0;
  position: absolute;
  top: 13px;
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
}

.news-left .avatar {
  vertical-align: top;
  display: inline-block;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #f096be;
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 36px;

  position: absolute;
  top: 3px;
  left: 0;
}

.news-left {
  padding-top: 20px;
}

.news-left .span-news {
  margin-left: 49px;
}

.news-left .span-nick {
  padding: 0;
  margin: 0;
  color: #606060;
  background: none;
  border: none;
  font-size: 12px;
  position: absolute;
  top: 0;
  left: 51px;
}

.single-news-left span {
  margin-left: 8px;
}

.single-news-left span {
  max-width: 81%;
}

.news-right span {
  background-color: #85d8f8;
  margin-right: 8px;
}

.news-left .triangle {
  border-right: 8px solid #ddf3ff;
  border-left: 8px solid transparent;
  top: 28px;
  left: 34px;
}

.single-news-left .triangle {
  border-right: 8px solid #ddf3ff;
  border-left: 8px solid transparent;
  left: -8px;
}

.news-right .triangle {
  border-right: 8px solid transparent;
  border-left: 8px solid #85d8f8;
  right: -8px;
}

</style>

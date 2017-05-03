<template>
  <div class="chat-room">
    <m-header :options="options" :userInfoId="initNewsObj.receiverUsername" :selfInfo="initNewsObj.user.username" :chatRoomNum="this.$route.params.roomNum">
      <span slot="content">{{ initNewsObj.receiverUser }}</span>
    </m-header>
    <div ref="container" class="chat-container">
      <container>
        <nothing :isNoNews="true" :isNothing="withoutNews" slot="nothing"></nothing>
        <chat-news v-for="item in initNews" slot="content" :item="item" :key="item.id" :selfInfo="initNewsObj.user.username"></chat-news>
        <div slot="tips" class="join-tips">
          <span>{{ joinList.slice(0, 1).join('、') }}</span>
          <span v-if="joinList.length >= 2"> 等 {{ joinList.length - 1 }} 人</span>
          <span>加入</span>
        </div>
      </container>
    </div>
    <chat-bar :selfInfo="initNewsObj.user"></chat-bar>
  </div>
</template>

<script>
import MHeader from './header.vue'
import Container from './container.vue'
import Nothing from './nothing.vue'
import ChatBar from './chatBar.vue'
import ChatNews from './chatNews.vue'

import { mapGetters } from 'vuex'

import { updateUnRead } from '../api'

export default {
  name: 'chatRoom',
  data () {
    return {
      msg: '',
      showJoin: false,
      options: {
        isReturn: true,
        isRecently: true,
        isCreateRoom: false
      }
    }
  },
  created () {
    this.$store.dispatch('fetchInitMsg', {
      roomNum: this.$route.params.roomNum
    })
    this.$socket.emit('joinRoom', {
      roomNum: this.$route.params.roomNum
    })
    // 加入房间之后，home主页不再主动请求数据，而是在返回之后，请求数据
    // this.$store.commit('changeHomePage', 'chatRoom')
  },
  mounted () {
    this.scrollToEnd()
  },
  methods: {
    scrollToEnd () {
      let div = this.$refs.container
      let container = div.getElementsByClassName('container')[0]
      container.scrollTop = container.scrollHeight
    }
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    updateUnRead({ room: this.$route.params.roomNum, currentLength: this.initNews.length })
    .then(response => {
      next()
    })
  },
  sockets: {
    connect () {
      console.log('socket connect')
    },
    chatMessageClient (payload) {
      let timeNow = new Date()
      //  只有发送的人才会更新到数据库当中，其他人响应的不更新数据库，而只是更新一下
      if (this.initNewsObj.user.username === payload.postMan) {
        this.$store.dispatch('pushInitNews', {
          msg: payload.msg,
          time: timeNow,
          roomNum: this.$route.params.roomNum,
          postMan: payload.postMan
        })
      } else {
        let pushNews = {
          username: payload.postMan,
          nickname: payload.postManNick,
          type: 0,
          isSelf: true,
          news: payload.msg,
          time: timeNow.getHours() + ':' + timeNow.getMinutes(),
          isGroup: this.initNewsObj.isGroup
        }
        this.$store.commit('updateInitNews', pushNews)
      }
      this.$socket.emit('updateHome')
    }
    // updateNewsInHome (roomNum) {
    //   if (this.$store.state.inHomePage === 'chatRoom') {
    //     this.$store.dispatch('fetchNewslist', { roomNum })
    //   }
    // }
  },
  computed: {
    withoutNews () {
      return this.initNews.length <= 0
    },
    ...mapGetters({
      initNewsObj: 'getInitMsg',
      initNews: 'getInitNews'
    }),
    joinList () {
      let tmpArr = []
      this.initNewsObj.userlist.forEach(item => {
        if (item !== this.initNewsObj.user.nickname) {
          tmpArr.push(item)
        }
      })
      this.showJoin = true
      return tmpArr
    }
  },
  components: {
    MHeader,
    Container,
    Nothing,
    ChatBar,
    ChatNews
  }
}
</script>

<style scoped>
.chat-room {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.container {
  height: auto;
  max-height: 96%;
  overflow: auto;
}

.content span {
  color: rgb(6, 181, 224);
  font-size: 16px;
}

.join-tips {
  text-align: center;
  padding: 6px 0;
  color: #a0a0a0;
}

.chat-container {
  height: 84%;
}
</style>

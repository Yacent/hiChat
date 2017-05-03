<template>
  <div class="header">
    <checker v-show="ifCheck">{{ checkInfo }}</checker>
    <div class="left" v-show="options.isReturn" @click="goBack">
      <icon name="arrow-left"></icon>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="right">
      <div v-if="!options.isCreateRoom">
        <router-link to="/addUser" v-if="!options.isRecently">
          <icon name="user-plus"></icon>
        </router-link>
        <router-link :to="infoUrl" v-if="options.isRecently">
          <icon name="user"></icon>
        </router-link>
      </div>
      <div v-else>
        <span :class="{ 'not-satisfy': permit }" @click="createRoom">
          <icon name="check"></icon>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { createRoom } from '../api'
import Checker from './checker.vue'

export default {
  name: 'mHeader',
  props: ['options', 'permit', 'userArr', 'userInfoId', 'selfInfo', 'chatRoomNum'],
  data () {
    return {
      roomNum: '',
      ifCheck: false,
      checkInfo: ''
    }
  },
  sockets: {
    connect () {
      console.log('header socket connected')
    },
    subscribe (room) {
      this.roomNum = room
    }
  },
  computed: {
    infoUrl () {
      return '/userInfo/' + this.userInfoId
    }
  },
  methods: {
    goBack () {
      // 返回到上一个路由
      this.$router.go(-1)
    },
    createRoom () {
      if (!this.permit) {
        let payload = {
          roomNum: this.roomNum,
          userlist: this.userArr
        }
        createRoom(payload).then(response => {
          if (response.data.flag) {
            // this.$socket.emit('joinRoom', {
            //   roomNum: this.roomNum,
            //   userlist: this.userArr
            // })
            this.$router.push({ path: '/chatRoom/' + this.roomNum })
          } else {
            this.checkInfo = response.data.msg
            this.ifCheck = true
            setTimeout(() => { this.ifCheck = false }, 2000)
          }
        })
      }
    }
  },
  components: {
    Checker
  }
}
</script>

<style scoped>
.header {
  position: relative;
  text-align: center;
  background-color: rgb(249, 249, 249);
  height: 50px;
  line-height: 50px;
  width: 100%;
  box-shadow: 0 1px 5px #e0e0e0;
  -moz-box-shadow: 0 1px 5px #e0e0e0;
}

svg {
  vertical-align: 3px;
  color: rgb(6, 181, 224);
}

span {
  vertical-align: top;
}


.left, .content, .right {
  font-size: 30px;
  display: inline-block;
}

.content span {
  font-size: 10px;
  font-family: 'mono';
  font-weight: bold;
  font-family: 'Verdana, Geneva, sans-serif';
}

.left {
  position: absolute;
  left: 15px;
  color: rgb(6, 181, 224);
}

.right {
  position: absolute;
  right: 0;
  font-weight: bold;
  color: rgb(6, 181, 224);
  width: 45px;
}

.not-satisfy svg {
  color: #a0a0a0;
}
</style>

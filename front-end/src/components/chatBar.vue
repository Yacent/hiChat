<template>
  <div class="chat-bar">
    <div class="chat-input">
      <input type="text" v-model="inputMsg" placeholder="在此处输入信息">
      <span @click="clickButton"><icon :name="iconName"></icon></span>
    </div>
    <chat-extra></chat-extra>
  </div>
</template>

<script>
import ChatExtra from './chatExtra.vue'
// import { updateMsg } from '@/api'

export default {
  name: 'chat-bar',
  props: ['selfInfo'],
  data () {
    return {
      inputMsg: ''
    }
  },
  computed: {
    iconName () {
      return this.inputMsg === '' ? 'send-o' : 'send'
    }
  },
  methods: {
    clickButton () {
      this.$socket.emit('chatMessage', {
        msg: this.inputMsg,
        postMan: this.selfInfo.username,
        postManNick: this.selfInfo.nickname
      }, this.$route.params.roomNum)
      this.inputMsg = ''
    }
  },
  components: {
    ChatExtra
  }
}
</script>

<style scoped>
.chat-bar {
  background-color: rgb(249, 249, 249);
  width: 100%;
  height: 70px;
  position: absolute;
  bottom: 0;
  overflow: hidden;
}

.chat-input {
  box-sizing: border-box;
  position: relative;
  text-align: center;
  width: 100%;
  padding: 0 3%;
  overflow: hidden;
}

.chat-input input {
  display: inline-block;
  border: none;
  background-color: rgb(249, 249, 249);
  border-top: 1px solid #e0e0e0;
  height: 38px;
  box-sizing: border-box;
  padding: 7px 70px 7px 0;
  width: 100%;
  outline: none;
}

svg {
  color: rgb(6, 181, 224);
  width: 20px;
  height: 20px;

  position: absolute;
  top: 9px;
  right: 25px;
}
</style>

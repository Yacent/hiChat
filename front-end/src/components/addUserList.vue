<template>
  <div class="add-user-list">
    <m-header :options="options" :permit="isPermitCreate" :userArr="mapArr">
      <span slot="content">创建房间</span>
    </m-header>
    <container>
      <div class="show-list" slot="show-list">
        <div class="title">聊天对象：</div>
        <div class="name" v-if="mapArr.length > 0">
          <span class="name-left">{{ mapArr[0].nickname }}</span>
          <span class="name-right" v-if="mapArr.length > 1">等其他 {{ mapArr.length - 1 }} 人</span>
        </div>
      </div>
      <nothing :isContact="true" :isNothing="withoutUser" slot="nothing"></nothing>
      <add-list v-for="item in items" :key="item.id" slot="content" :item="item" @countUser="showUser"></add-list>
    </container>
  </div>
</template>

<script>
import MHeader from './header.vue'
import Container from './container.vue'
import Nothing from './nothing.vue'
import AddList from './addList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'add-user-list',
  data () {
    return {
      msg: '13',
      mapArr: [],
      options: {
        isReturn: true,
        isRecently: false,
        isCreateRoom: true
      }
    }
  },
  created () {
    // 在这里 subscribe 之后，在 header.vue当中监听，获取socket的id号
    this.$socket.emit('subscribe')
    this.$store.dispatch('fetchCreateUserList')
    this.$store.commit('changeHomePage', 'addUserList')
  },
  sockets: {
    connect () {
      console.log('socket connect')
    },
    updateNewsInHome () {
      if (this.$store.state.inHomePage === 'addUserList') {
        this.$store.dispatch('fetchNewslist')
      }
    }
  },
  computed: {
    withoutUser () {
      return false
    },
    isPermitCreate () {
      return this.mapArr.length <= 0
    },
    ...mapGetters({
      items: 'getCreateUserList'
    })
  },
  methods: {
    showUser (payload) {
      if (payload.flag) {
        this.mapArr.push({
          username: payload.username,
          nickname: payload.nickname
        })
      } else {
        let index = this.mapArr.findIndex((el) => {
          return el.username === payload.username
        })
        this.mapArr.splice(index, 1)
      }
    }
  },
  components: {
    MHeader,
    Container,
    Nothing,
    AddList
  }
}
</script>

<style scoped>
.add-user-list {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

svg {
  color: rgb(6, 181, 224);
  width: 24px;
  height: 24px;
  position: relative;
  top: 10px;
  left: 10px;
}

.show-list {
  box-sizing: border-box;
  width: 90%;
  margin-left: 5%;
  border-bottom: 1px solid #d0d0d0;
  padding: 13px 0;
}

.show-list .title {
  display: inline-block;
  color: #707070;
  padding-left: 3px;
}

.show-list .name {
  display: inline-block;
  color: #06B5E0;
}

.name .name-right {
  padding-left: 5px;
  font-weight: bold;
}

</style>

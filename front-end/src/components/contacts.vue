<template>
  <div class="contacts">
    <m-header :options="options" :userInfoId="items.user.username">
      <span slot="content">联系人</span>
    </m-header>
    <container>
      <nothing :isContact="true" :isNothing="withoutUser" slot="nothing"></nothing>
      <user-list v-for="item in items.userlist" slot="content" :key="item.id" :item="item" v-if="!withoutUser"></user-list>
    </container>
    <tabbar :focusA="false"></tabbar>
  </div>
</template>

<script>
import MHeader from './header.vue'
import Tabbar from './tabbar.vue'
import Container from './container.vue'
import Nothing from './nothing.vue'
import UserList from './userList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'contacts',
  data () {
    return {
      msg: '',
      options: {
        isReturn: false,
        isRecently: true,
        isCreateRoom: false
      }
    }
  },
  sockets: {
    connect () {
      console.log('socket connect')
    },
    updateNewsInHome () {
      if (this.$store.state.inHomePage === 'contacts') {
        this.$store.dispatch('fetchNewslist')
      }
    }
  },
  computed: {
    withoutUser () {
      return this.items === undefined
    },
    ...mapGetters({
      items: 'getUserList'
    })
  },
  created () {
    this.$store.dispatch('fetchUserList')
    this.$store.commit('changeHomePage', 'contacts')
  },
  components: {
    MHeader,
    Tabbar,
    Container,
    Nothing,
    UserList
  }
}
</script>

<style scoped>
.contacts {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

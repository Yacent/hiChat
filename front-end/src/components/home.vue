<template>
  <div class="home">
    <m-header :options="options">
      <span slot="content">place logo here!</span>
    </m-header>
    <container>
      <nothing :isHome="true" :isNothing="withoutMsg" slot="nothing"></nothing>
      <news-list v-for="item in items" slot="content" :key="item.id" :item="item" v-if="!withoutMsg"></news-list>
    </container>
    <tabbar :focusA="true"></tabbar>
  </div>
</template>

<script>
import { Icon } from 'vux'
import MHeader from './header.vue'
import Tabbar from './tabbar.vue'
import Container from './container.vue'
import Nothing from './nothing.vue'
import NewsList from './newsList.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'home',
  data () {
    return {
      msg: '',
      options: {
        isReturn: false,
        isRecently: false,
        isCreateRoom: false
      }
    }
  },
  sockets: {
    connect () {
      console.log('socket connect')
    },
    updateNewsInHome () {
      if (this.$store.state.inHomePage === 'home') {
        this.$store.dispatch('fetchNewslist')
      }
    }
  },
  computed: {
    withoutMsg () {
      return this.items.length <= 0
    },
    ...mapGetters({
      items: 'getNews'
    })
  },
  created () {
    this.$store.dispatch('fetchNewslist')
    this.$store.commit('changeHomePage', 'home')
  },
  components: {
    MHeader,
    Icon,
    Tabbar,
    Container,
    Nothing,
    NewsList
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>

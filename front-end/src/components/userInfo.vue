<template>
  <div class="user-info">
    <span @click="closeInfo"><icon name="times"></icon></span>
    <div class="content">
      <span class="avatar" :style="{ backgroundColor: selectColor }">{{ info.slice(0, 1).toUpperCase() }}</span>
      <span class="nickname">{{ info }}</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'userInfo',
  data () {
    return {
      color: ['#e475c1', '#84beec', '#f495bf', '#85d8f8', '#ff8b8c', '#62d6d6', '#b3dbf4', '#ff6766']
    }
  },
  sockets: {
    connect () {
      console.log('socket connect')
    },
    updateNewsInHome () {
      if (this.$store.state.inHomePage === 'userInfo') {
        this.$store.dispatch('fetchNewslist')
      }
    }
  },
  created () {
    this.$store.dispatch('fetchUserInfo', {
      username: this.$route.params.username
    })
    this.$store.commit('changeHomePage', 'userInfo')
  },
  computed: {
    selectColor () {
      return this.color[Math.floor(Math.random() * 8)]
    },
    ...mapGetters({
      info: 'getInfo'
    })
  },
  methods: {
    closeInfo () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.user-info {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgb(236, 237, 241);
}

svg {
  color: rgb(6, 181, 224);
  width: 24px;
  height: 24px;
  position: relative;
  top: 10px;
  left: 10px;
}

.avatar {
  display: inline-block;
  width: 150px;
  height: 150px;
  border-radius: 75px;
  text-align: center;
  line-height: 150px;
  font-size: 100px;
  background-color: #e475c1;
  color: #fff;

  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, 0);
}

.nickname {
  position:absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, 0);
  font-size: 22px;
}
</style>

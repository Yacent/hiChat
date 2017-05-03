<template>
  <div class="add-list" @click="selectUser" :data-user="item.username">
    <div class="left">
      <span class="select-area" v-show="!isSelect"></span>
      <icon name="check-circle" v-show="isSelect"></icon>
    </div>
    <div class="right">
      <span class="avatar" :style="{ backgroundColor: selectColor }">{{ avatar }}</span>
      <span class="nickname" :style="changeText">{{ item.nickname }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'add-list',
  props: ['item'],
  data () {
    return {
      color: ['#e475c1', '#84beec', '#f495bf', '#85d8f8', '#ff8b8c', '#62d6d6', '#b3dbf4', '#ff6766'],
      isSelect: false
    }
  },
  computed: {
    avatar () {
      return this.item.nickname.slice(0, 1).toUpperCase()
    },
    selectColor () {
      return this.color[Math.floor(Math.random() * 8)]
    },
    changeText () {
      if (this.isSelect) {
        return {
          color: '#06B5E0'
        }
      } else {
        return {
          color: '#000'
        }
      }
    }
  },
  methods: {
    selectUser () {
      this.isSelect = !this.isSelect
      this.countUser(this.isSelect)
    },
    countUser (flagBit) {
      this.$emit('countUser', {
        username: this.item.username,
        nickname: this.item.nickname,
        flag: flagBit
      })
    }
  }
}
</script>

<style scoped>
.add-list {
  width: 100%;
  height: 50px;
  line-height: 50px;
}

.select-area {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid #06B5E0;
  border-radius: 7px;
  vertical-align: middle;
}

.left {
  display: inline-block;
  padding: 0 10px 0 25px;
  line-height: 50px;
}

.left svg {
  color: #06B5E0;
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.right {
  display: inline-block;
}

.right .avatar {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  text-align: center;
  line-height: 30px;
  vertical-align: middle;
  color: #fff;
}

.right .nickname {
  vertical-align: middle;
  display: inline-block;
  padding-left: 10px;
  font-size: 18px;
}
</style>

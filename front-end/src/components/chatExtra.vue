<template>
  <div class="chat-extra">
    <span class="image" @click="showPhotoChoice"><icon name="picture-o"></icon></span>
    <span class="file"><icon name="file-text-o"></icon></span>
  </div>
</template>

<script>

export default {
  name: 'chat-extra',
  data () {
    return {
      msg: '',
      show1: false,
      menus: {
        menu1: '拍照',
        menu2: '从相册选择'
      }
    }
  },
  methods: {
    showPhotoChoice () {
      this.show1 = true
    }
  }
}
</script>

<style scoped>
.chat-extra {
  box-sizing: border-box;
  width: 100%;
  padding: 1px 5%;
}

svg {
  width: 20px;
  height: 20px;
  color: #a7bed0;
}

span {
  margin-right: 18px;
}
</style>

<template>
  <div class="user-login">
    <checker v-show="ifCheck">{{ checkInfo }}</checker>
    <div class="avatar">
      <span class="big">{{ nickname }}</span>
    </div>
    <form action="">
      <group>
        <x-input
          title="账号"
          v-model="username"
          placeholder="请输入用户名"
          :min="6"
          :max="20">
        </x-input>
        <x-input
          title="密码"
          v-model="password"
          type="password"
          placeholder="请输入密码"
          :min="6"
          :max="20">
        </x-input>
      </group>
      <x-button @click.native.prevent="userLogin" :showLoading="showLoad" :disabled="ifCheck">登录</x-button>
    </form>
    <router-link class="register" to="/register">新用户注册</router-link>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import isValid from '../mixins/valid'
import Checker from './checker'

import { login } from '../api'

export default {
  name: 'login',
  mixins: [isValid],
  data () {
    return {
      showLoad: false,
      username: '',
      password: '',
      nickname: 'H',
      checkInfo: '',
      ifCheck: false
    }
  },
  methods: {
    userLogin () {
      /*
       * 提交前表单验证
       */
      if (this.isValid(this.username).valid && this.isValid(this.password).valid) {
        // 验证正确
        // 发送登陆请求
        this.showLoad = true
        login(this.username, this.password)
          .then(response => {
            if (response.data.flag) {
              this.$router.push({ path: '/home' })
            } else {
              this.checkInfo = response.data.msg
              this.ifCheck = true
              setTimeout(() => {
                this.ifCheck = false
                this.showLoad = false
              }, 2000)
            }
          })
      } else {
        // 验证错误
        if (!this.isValid(this.username).valid) {
          this.checkInfo = this.isValid(this.username, '请输入账号').msg
        } else {
          this.checkInfo = this.isValid(this.password, '请输入密码').msg
        }
        this.ifCheck = true
        setTimeout(() => { this.ifCheck = false }, 2000)
      }
    }
  },
  components: {
    Group,
    XInput,
    XButton,
    Checker
  }
}
</script>

<style scoped>
.user-login {
  text-align: center;
  background-color: rgb(236, 237, 241);
  width: 100%;
  height: 100%;
}

.avatar {
  color: #fff;
  background-color: #B03060;
  width: 90px;
  height: 90px;
  text-align: center;
  line-height: 90px;
  font-size: 45px;
  border-radius: 45px;
  display: inline-block;
  margin-top: 30px;
  margin-bottom: -10px;
}

.weui-btn {
  color: #fff;
  font-size: 17px;
  background-color: rgb(0, 172, 238);
  width: 94%;
  margin-top: 15px;
  margin-bottom: 10px;
}

.register {
  font-size: 12px;
  color: rgb(41, 156, 201);
  position: absolute;
  right: 0;
  padding-right: 3%;
  text-decoration: none;
}
</style>

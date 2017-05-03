<template>
  <div class="user-register">
    <checker v-show="ifCheck">{{ checkInfo }}</checker>
    <div class="avatar">
      <span class="big">{{ nick }}</span>
    </div>
    <form action="">
      <group>
        <x-input
        title="账号"
        v-model="username"
        placeholder="请输入用户名(6-20 位)"
        :min="6"
        :max="20">
        </x-input>
        <x-input
          title="密码"
          v-model="password"
          type="password"
          placeholder="请输入密码(6-20 位)"
          :min="6"
          :max="20">
        </x-input>
        <x-input
          title="昵称"
          v-model="nickname"
          placeholder="请输入用户昵称(6-20 位)"
          :min="6"
          :max="20">
        </x-input>
      </group>
    </form>
    <x-button @click.native.prevent="userRegister" :showLoading="showLoad" :disabled="ifCheck">注册</x-button>
    <router-link class="login" to="/">已有账号，登录</router-link>
  </div>
</template>

<script>
import { Group, XInput, XButton } from 'vux'
import isValid from '../mixins/valid'
import Checker from './checker'

import { register } from '../api'

export default {
  name: 'register',
  mixins: [isValid],
  data () {
    return {
      showLoad: false,
      username: '',
      password: '',
      nickname: '',
      checkInfo: '',
      ifCheck: false
    }
  },
  computed: {
    nick () {
      if (this.nickname !== '') {
        return this.nickname.slice(0, 1).toUpperCase()
      } else {
        return 'H'
      }
    }
  },
  methods: {
    userRegister () {
      // 验证是否可以正确注册
      if (this.isValid(this.username).valid && this.isValid(this.password).valid && this.isValid(this.nickname).valid) {
        this.showLoad = true
        register(this.username, this.password, this.nickname)
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
        console.log(this.username + this.password + this.nickname)
      } else {
        if (!this.isValid(this.username).valid) {
          this.checkInfo = this.isValid(this.username, '请输入账号').msg
        } else if (!this.isValid(this.password).valid) {
          this.checkInfo = this.isValid(this.password, '请输入密码').msg
        } else {
          this.checkInfo = this.isValid(this.nickname, '请输入昵称').msg
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
.user-register {
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

.login {
  font-size: 12px;
  color: rgb(41, 156, 201);
  position: absolute;
  right: 0;
  padding-right: 3%;
  text-decoration: none;
  cursor: pointer;
}
</style>

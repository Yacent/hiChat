import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login'
import Register from '@/components/register'
import Home from '@/components/home'
import Contact from '@/components/contacts'
import UserInfo from '@/components/userInfo'
import ChatRoom from '@/components/ChatRoom'
import AddUserList from '@/components/addUserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/contacts',
      name: 'contract',
      component: Contact
    },
    {
      path: '/userInfo/:username',
      name: 'userInfo',
      component: UserInfo
    },
    {
      path: '/chatRoom/:roomNum',
      name: 'chatRoom',
      component: ChatRoom
    },
    {
      path: '/addUser',
      name: 'addUser',
      component: AddUserList
    }
  ]
})

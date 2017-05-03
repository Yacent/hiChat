import { contacts, addUser, userInfo } from '@/api'

const state = {
  userlistObj: {
    user: {},
    userlist: []
  },
  createUserList: [],
  userInfo: ''
}

const getters = {
  getUserList: state => state.userlistObj,
  getCreateUserList: state => state.createUserList,
  getInfo: state => state.userInfo
}

const actions = {
  fetchUserList ({ commit, state }) {
    contacts().then(response => {
      if (response.data.flag) {
        commit('getUsers', {
          userlist: response.data.msg.userlist,
          user: response.data.msg.user
        })
      } else {
        state.userlistObj = {
          user: {},
          userlist: []
        }
      }
    })
  },
  fetchCreateUserList ({ commit, state }) {
    addUser().then(response => {
      if (response.data.flag) {
        commit('getCreateUsers', {
          userlist: response.data.msg
        })
      } else {
        state.createUserList = []
      }
    })
  },
  fetchUserInfo ({ commit, state }, payload) {
    userInfo(payload.username).then(response => {
      if (response.data.flag) {
        commit('getUserInfomation', {
          userInfo: response.data.msg
        })
      } else {
        state.userInfo = ''
      }
    })
  }
}

const mutations = {
  getUsers (state, payload) {
    state.userlistObj = {}
    state.userlistObj.user = payload.user
    state.userlistObj.userlist = []
    payload.userlist.forEach(item => {
      state.userlistObj.userlist.push({
        username: item.username,
        nickname: item.nickname,
        links: '/user/id' // links还有待考量是什么形式
      })
    })
  },
  getCreateUsers (state, payload) {
    state.createUserList = []
    payload.userlist.forEach(item => {
      state.createUserList.push({
        username: item.username,
        nickname: item.nickname
      })
    })
  },
  getUserInfomation (state, payload) {
    state.userInfo = payload.userInfo
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

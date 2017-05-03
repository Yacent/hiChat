import { home, getInitMsg, pushMsg } from '@/api'
import { timeProcess } from '@/timeProcess'

const state = {
  newslist: [], // newslist 是在主页当中获取最近的聊天记录
  initNews: [],
  initNewsObj: {
    user: {},
    receiverUser: '',
    receiverUsername: '',
    isGroup: false,
    userlist: []
  }
}

const getters = {
  getNews: state => state.newslist,
  getInitMsg: state => state.initNewsObj,
  getInitNews: state => state.initNews
}

const actions = {
  fetchNewslist ({ commit }, payload) {
    home().then(response => {
      if (response.data.flag) {
        commit('getNews', {
          msglist: response.data.msg.posts,
          user: response.data.msg.user
        })
      }
    })
  },
  fetchInitMsg ({ commit }, payload) {
    getInitMsg(payload.roomNum).then(response => {
      if (response.data.flag) {
        commit('getInitMsg', {
          roomInfo: response.data.msg.room,
          user: response.data.msg.user
        })
      }
    })
  },
  pushInitNews ({ commit }, payload) {
    let timeNow = payload.time

    let pushNews = {
      username: state.initNewsObj.user.username,
      nickname: state.initNewsObj.user.nickname,
      type: 0,
      isSelf: true,
      news: payload.msg,
      time: timeNow,
      isGroup: state.initNewsObj.isGroup,
      postMan: payload.postMan
    }

    pushMsg(payload.roomNum, pushNews).then(response => {
      if (response.data.flag) {
        pushNews.time = timeProcess(timeNow)
        commit('updateInitNews', pushNews)
      }
    })
  }
}

const mutations = {
  getNews (state, payload) {
    // roomNum的作用就是看是哪个房间发过来的
    state.newslist = []

    payload.msglist.forEach(item => {
      let lastRead = 0
      payload.user.roomlist.forEach(unreadRoom => {
        if (unreadRoom.room === item.room) {
          lastRead = unreadRoom.unReadNews
        }
      })

      let unread = item.newslist.length - lastRead

      if (item.newslist.length !== 0) {
        let msg = item.newslist[item.newslist.length - 1]
        let handleTime = new Date(msg.time)
        state.newslist.push({
          receiverUser: msg.username, // receiverUser是指当前聊天的对象，而不是接受信息的对象
          nickname: msg.nickname,
          content: msg.news,
          links: '/chatRoom/' + item.room,
          times: {
            time: timeProcess(handleTime),
            user: msg.nickname
          },
          counts: unread,
          type: item.type
        })
      }
    })
  },
  getInitMsg (state, payload) {
    state.initNews = []

    state.initNewsObj = {
      user: {},
      receiverUser: '',
      receiverUsername: '',
      isGroup: false,
      userlist: []
    }
    state.initNewsObj.user = payload.user
    state.initNewsObj.receiverUsername = payload.roomInfo.userlist[1].username
    // 获取聊天对象的nickname
    if (payload.roomInfo.userlist.length > 2) {
      state.initNewsObj.receiverUser = 'Group Chat'
      state.initNewsObj.isGroup = true
    } else {
      state.initNewsObj.receiverUser = payload.roomInfo.userlist[1].nickname
      state.initNewsObj.isGroup = false
    }

    payload.roomInfo.userlist.forEach(item => {
      state.initNewsObj.userlist.push(item.nickname)
    })
    if (payload.roomInfo.newslist.length) {
      payload.roomInfo.newslist.forEach(item => {
        let handleTime = new Date(item.time)
        state.initNews.push({
          username: item.username,
          nickname: item.nickname,
          type: 0,
          isSelf: false,
          news: item.news,
          time: timeProcess(handleTime),
          isGroup: state.initNewsObj.isGroup
        })
      })
    }
  },
  updateInitNews (state, upload) {
    state.initNews.push(upload)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

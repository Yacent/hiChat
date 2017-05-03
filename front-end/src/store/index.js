import Vue from 'vue'
import Vuex from 'vuex'
// import * as getters from './getters'
import message from './modules/message'
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    inHomePage: true
  },
  mutations: {
    changeHomePage (state, params) {
      state.inHomePage = params
    }
  },
  modules: {
    message,
    user
  },
  strict: debug
})

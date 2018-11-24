import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import common from './common.js'

export default new Vuex.Store({
  modules: {
    common: common
  }
})

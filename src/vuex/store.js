import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import menu from './menu.js'

export default new Vuex.Store({
  modules: {
    menu: menu
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import monitor from './monitor.js'

export default new Vuex.Store({
  modules: {
    monitor: monitor
  }
})

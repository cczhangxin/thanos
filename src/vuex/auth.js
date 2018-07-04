export default {
  state: {
    isLogin: true,
    activeMonitorName:'电收尘',
  },
  mutations: {
    login (state) {
      state.isLogin = !state.isLogin
    }
  }
}

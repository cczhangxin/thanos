export default {
  state: {
    is_login: true,
    isCollapse: false, //是否水平折叠收起菜单
  },
  mutations: {
    collapse (state) {
      state.isCollapse = state.isCollapse ? false : true
    },
    login (state) {
      state.is_login = state.is_login ? false : true
    }
  }
}

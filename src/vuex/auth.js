export default {
  state: {
    is_login: true,
    isCollapse: false,
  },
  mutations: {
    increment (state) {
     state.isCollapse= state.isCollapse ? false : true
    }
  }
}
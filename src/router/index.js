import Vue from 'vue'
import Router from 'vue-router'
import monitorPage from '../components/v3/monitorPage.vue'
import test from '../components/v3/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: monitorPage
    },
    {
      path: '/test',
      component: test
    }
  ]
})

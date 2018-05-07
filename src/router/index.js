import Vue from 'vue'
import Router from 'vue-router'
import test from '../components/v3/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: test
    }
  ]
})

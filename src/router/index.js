import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
import login from '../components/v1/login.vue'
import home from '../components/v1/home.vue'
import monitorPage from '../components/v3/monitorPage.vue'
import test from '../components/v3/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: home,
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: '/monitorPage',
          component: monitorPage
        },
        {
          path: '/test',
          component: test
        }
      ]
    },
    {
      path: '/login',
      component: login
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (this.getCookie('user')) {
      next();
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    next();
  }
})

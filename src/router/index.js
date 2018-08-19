import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
import login from '../components/v1/login.vue'
import home from '../components/v1/home.vue'
import monitorPage from '../components/v3/monitorPage.vue'
import equipmentLedger from '../components/v3/equipment/equipmentLedger.vue'
import equipmentDetails from '../components/v3/equipment/equipmentDetails.vue'
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
          path: '/equipmentLedger',
          component: equipmentLedger,
        },
        {
          path: '/equipmentDetails',
          component: equipmentDetails
        }
      ]
    },
    {
      path: '/login',
      component: login
    }
  ]
})

function getCookie (cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta.requireAuth)) {
    if (getCookie('user')) {
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

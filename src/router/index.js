import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
import login from '../components/login.vue'
import store from '../vuex/store'
import home from '../components/common/home.vue'
import test from '../components/common/test.vue'
import monitorPage from '../components/monitorPage.vue'
import equipmentLedger from '../components/equipmentManage/equipmentLedger.vue'
import equipmentDetails from '../components/equipmentManage/equipmentDetails.vue'
import equipmentEdit from '../components/equipmentManage/equipmentEdit.vue'
import departManger from '../components/setting/dePart/departManger.vue'
import addDepart from '../components/setting/dePart/addDepart.vue'
import roleManger from '../components/setting/role/RoleManger.vue'
import addRole from '../components/setting/role/addRole.vue'
import userManger from '../components/setting/user/userManger.vue'
import addUser from '../components/setting/user/addUser.vue'
import proFlowMan from '../components/setting/proFlow/proFlowMan.vue'
import addProFlow from '../components/setting/proFlow/addProFlow'
import notFound from '../components/notFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: home,
      meta: {
        requireAuth: false,
      },
      children: [
        {
          path: '/monitorPage',
          component: monitorPage,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/departManger',
          component: departManger,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/addDepart',
          component: addDepart,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/editDepart',
          component: addDepart,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },

        {
          path: '/roleManger',
          component: roleManger,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/addRole',
          component: addRole,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/editRole',
          component: addRole,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/userManger',
          component: userManger,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/addUser',
          component: addUser,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/editUser',
          component: addUser,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/proFlowMan',
          component: proFlowMan,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/addProFlow',
          component: addProFlow,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/editProFlow',
          component: addProFlow,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/equipmentLedger',
          component: equipmentLedger,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/equipmentDetails',
          component: equipmentDetails,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/equipmentEdit',
          component: equipmentEdit,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/test',
          component: test
        },
        {
          path: '/*',
          component: notFound
        }
      ]
    }
  ]
})

function checkedPermission(to, from, next) {
  next()
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }
  return "";
}

router.beforeEach((to, from, next) => {
  store.state.menu.headerActive = to.path
  window.sessionStorage.setItem('headerActive', to.path)
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

import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
import login from '../components/v1/login.vue'
import store from '../vuex/store'
import home from '../components/v1/home.vue'
import monitorPage from '../components/v3/monitorPage.vue'
import equipmentLedger from '../components/v3/equipment/equipmentLedger.vue'
import equipmentDetails from '../components/v3/equipment/equipmentDetails.vue'
import equipmentEdit from '../components/v3/equipment/equipmentEdit.vue'
import departManger from '../components/v3/setting/dePart/departManger.vue'
import addDepart from '../components/v3/setting/dePart/addDepart.vue'
import roleManger from '../components/v3/setting/role/RoleManger.vue'
import addRole from '../components/v3/setting/role/addRole.vue'
import userManger from '../components/v3/setting/user/userManger.vue'
import addUser from '../components/v3/setting/user/addUser.vue'
import proFlowMan from '../components/v3/setting/proFlow/proFlowMan.vue'
import addProFlow from '../components/v3/setting/proFlow/addProFlow'

Vue.use(Router)

export default new Router({
  routes: [
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
        }
      ]
    },
    {
      path: '/login',
      component: login
    }
  ]
})

function activeNow(path) {
  for (let key in store.state.menu.menuData) {
    for (let i = 0; i < store.state.menu.menuData[key].length; i++) {
      if (store.state.menu.menuData[key][i].link === path) {
        return key
      }
      if (store.state.menu.menuData[key][i].children) {
        for (let e = 0; e < store.state.menu.menuData[key][i].children.length; e++) {
          if (store.state.menu.menuData[key][i].children[e].link === path) {
            return key
          }
        }
      }
    }
  }
}


function checkedPermission(to, from, next) {
  store.state.menu.menuList = store.state.menu.menuData[activeNow(to.path)]
  window.sessionStorage.setItem('menuList', JSON.stringify(store.state.menu.menuData[activeNow(to.path)]))
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

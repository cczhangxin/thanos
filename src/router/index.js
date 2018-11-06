import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
import login from '../components/login'
import store from '../vuex/store'
import header from '../components/common/header'
import notFound from '../components/notFound'
import test from '../components/common/test'
import monitorPage from '../components/monitorPage'
//设备管理
import equipmentLedger from '../components/equipmentManage/equipmentLedger'
import produceAndProcess from '../components/equipmentManage/produceAndProcess'
import fixedAssets from '../components/equipmentManage/fixedAssets'
import equipmentDetails from '../components/equipmentManage/equipmentDetails'
import equipmentEdit from '../components/equipmentManage/equipmentEdit'
import oilManage from '../components/equipmentManage/oilManage'
//设备管理在线管理
import technologicalProcess from '../components/equipmentOnLine/technologicalProcess'
import maintenanceOrder from '../components/equipmentOnLine/maintenanceOrder'

import departManger from '../components/setting/dePart/departManger'
import addDepart from '../components/setting/dePart/addDepart'
import roleManger from '../components/setting/role/RoleManger'
import addRole from '../components/setting/role/addRole'
import userManger from '../components/setting/user/userManger'
import addUser from '../components/setting/user/addUser'
import proFlowMan from '../components/setting/proFlow/proFlowMan'
import addProFlow from '../components/setting/proFlow/addProFlow'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/',
      component: header,
      meta: {
        requireAuth: true,
      },
      children: [
        {
          path: '/test',
          component: test
        },
        {
          path: '/monitorPage',
          component: monitorPage,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        //设备管理
        {
          path: '/equipmentLedger',
          component: equipmentLedger,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/equipmentEdit',
          component: equipmentEdit,
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
          path: '/equipmentDetails',
          component: equipmentDetails,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/fixedAssets',
          component: fixedAssets,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/produceAndProcess',
          component: produceAndProcess,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/oilManage',
          component: oilManage,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        //设备管理在线管理
        {
          path: '/technologicalProcess',
          component: technologicalProcess,
          beforeEnter: (to, from, next) => checkedPermission(to, from, next)
        },
        {
          path: '/maintenanceOrder',
          component: maintenanceOrder,
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

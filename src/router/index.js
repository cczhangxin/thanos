import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
import login from '../components/v1/login.vue'
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
          component: monitorPage
        },
        {
          path: 'departManger',
          component: departManger
        },
        {
          path: 'addDepart',
          component: addDepart
        },
        {
          path: 'editDepart',
          component: addDepart
        },

        {
          path: '/roleManger',
          component: roleManger
        },
        {
          path: '/addRole',
          component: addRole
        },
        {
          path: '/editRole',
          component: addRole
        },
        {
          path: '/userManger',
          component: userManger
        },
        {
          path: '/addUser',
          component: addUser
        },
        {
          path: '/editUser',
          component: addUser
        },
        {
          path: '/proFlowMan',
          component: proFlowMan
        },
        {
          path: '/addProFlow',
          component: addProFlow
        },
        {
          path: '/editProFlow',
          component: addProFlow
        },
        {
          path: '/equipmentLedger',
          component: equipmentLedger,
        },
        {
          path: '/equipmentDetails',
          component: equipmentDetails,
        },
        {
          path: '/equipmentEdit',
          component: equipmentEdit,
        }
      ]
    },
    {
      path: '/login',
      component: login
    }
  ]
})

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

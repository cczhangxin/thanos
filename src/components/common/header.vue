<template>
  <div>
    <el-menu class="el-menu-demo" id="header" mode="horizontal" background-color="#409EFF" text-color="#fff"
             :default-active="$store.state.menu.headerActive" active-text-color="#ffd04b">
      <el-menu-item index="/monitorPage" @click="$router.push({path: '/monitorPage'});menuActive='0-0'">
        首页
      </el-menu-item>
      <el-submenu v-for="(item,index) in menuData" :key="index" :index="item.name">
        <template slot="title">{{item.name}}</template>
        <router-link v-for="(citem,cindex) in item.children" :key="cindex" :to="citem.link">
          <el-menu-item :index="citem.link">{{citem.name}}</el-menu-item>
        </router-link>
      </el-submenu>
      <el-menu-item index="6" @click="logOut()" style="float: right;width: 100px;">
        <i class="fa fa-sign-out" style="color: #fff;vertical-align: baseline;font-size: 18px"></i>退出
      </el-menu-item>
    </el-menu>
    <div class="section">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        menuData: [
          {
            name: '设备管理',
            children: [
              {name: '设备台账', link: '/equipmentLedger'},
              {name: '固定资产', link: '/fixedAssets'},
              {name: '生产线和工序管理', link: '/produceAndProcess'},
              {name: '油品管理', link: '/oilManage'},
            ]
          },
          {
            name: '设备在线管理',
            children: [
              {name: '工艺流程管理', link: '/technologicalProcess'},
              {name: '维修工单管理', link: '/maintenanceOrder'},
              {name: '停窑信息管理', link: ''},
              {name: '设备运行统计', link: ''},
            ]
          },
          {
            name: '设备备件管理',
            children: [
              {name: '供应商管理', link: ''},
              {name: '备件生命周期录入', link: ''},
              {name: '备件计划', link: ''},
              {name: '比价单', link: ''},
              {name: '备件合同', link: ''},
              {name: '入库验收单', link: ''},
              {name: '领料单', link: ''},
              {name: '备件库', link: ''},
              {name: '在用备件列表', link: ''},
            ]
          },
          {
            name: '生产报表',
            children: [
              {name: '品种管理', link: ''},
              {name: '品种计划管理', link: ''},
              {name: '品种实际管理', link: ''},
              {name: '品种库存', link: ''},
            ]
          },
          {
            name: '系统设置',
            children: [
              {name: '组织架构管理', link: ''},
              {name: '角色权限管理', link: ''},
              {name: '用户管理', link: ''},
              {name: '密码管理', link: ''},
              {name: '审核管理', link: ''},
            ]
          }
        ]
      }
    },
    computed: {},

    mounted() {

    },
    methods: {
      logOut() {
        this.delCookie('user')
        window.sessionStorage.clear()
        this.$router.push({path: '/login'})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

  .section {
    position: relative;
    background: #f0f2f5;
    padding: 20px;
  }

  a:hover {
    text-decoration: none;
  }
</style>

<template>
  <div>
    <div id="header">
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#409EFF" text-color="#fff"
               :default-active="$store.state.menu.headerActive" active-text-color="#ffd04b">
        <el-menu-item index="/monitorPage" @click="$router.push({path: '/monitorPage'});menuActive='0-0'">
          首页
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">设备管理</template>
          <router-link to="/equipmentLedger">
            <el-menu-item index="/equipmentLedger">设备分类</el-menu-item>
          </router-link>
        </el-submenu>
        <el-menu-item index="6" @click="logOut()" style="float: right;width: 100px;">
          <i class="fa fa-sign-out" style="color: #fff;vertical-align: baseline;font-size: 18px"></i>退出
        </el-menu-item>
      </el-menu>
    </div>
    <div id="content">
      <el-menu v-if="$store.state.menu.headerActive==='/monitorPage'" :default-active="menuActive"
               class="el-menu-vertical-demo" @select="menuSelect">
        <el-submenu v-for="(value,key,index) in menuData" :key="index" :index="String(index)">
          <template slot="title">{{key}}</template>
          <el-menu-item v-for="(item,i) in value" :key="i" :index="index+'-'+i">{{item}}</el-menu-item>
        </el-submenu>
      </el-menu>
      <div class="section">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isUnique: true,//是否只保持一个子菜单的展开
        menuActive: '0-0',
        menuData: {
          '一级区域': ['电收尘', '一线窑头', '煤粉制备'],
          '二线区域': ['电收尘', '一线窑头', '煤粉制备'],
          '发电区域': ['电收尘', '一线窑头', '煤粉制备'],
        },

        me: [
          {
            name: '一级区域',
            icon: 'fa-video-camera',
            children: [
              {name: '电收尘', link: '/monitorPage'},
              {name: '一线窑头', link: '/monitorPage'},
              {name: '煤粉制备', link: '/monitorPage'},
              {name: '一线原料磨', link: '/monitorPage'},
              {name: '一线均化库', link: '/monitorPage'},
            ]
          },
          {
            name: '二线区域',
            icon: 'fa-video-camera',
            children: [
              {name: '二线烧成', link: '/monitorPage'},
              {name: '二线窑头', link: '/monitorPage'},
              {name: '煤粉制备', link: '/monitorPage'},
            ]
          },
          {
            name: '发电区域',
            icon: 'fa-video-camera',
            children: [
              {name: '一线汽轮机', link: '/monitorPage'},
              {name: '一线锅炉', link: '/monitorPage'},
              {name: '二线汽轮机', link: '/monitorPage'},
              {name: '二线锅炉', link: '/monitorPage'},
              {name: '纯水制备', link: '/monitorPage'},
            ]
          },
          {
            name: '公共区域',
            icon: 'fa-video-camera',
            children: [
              {name: '供水供暖', link: '/monitorPage'},
            ]
          },
          {
            name: '矿山区域',
            icon: 'fa-video-camera',
            children: [
              {name: '矿山工艺线', link: '/monitorPage'},
            ]
          },
          {
            name: '水泥区域',
            icon: 'fa-video-camera',
            children: [
              {name: '水泥磨工艺', link: '/monitorPage'},
              {name: '水泥入库', link: '/monitorPage'},
              {name: '水泥出库', link: '/monitorPage'},
            ]
          }
        ]
      }
    },
    computed: {},
    created() {
      this.menuActive = window.sessionStorage.getItem("menuActive") ? window.sessionStorage.getItem("menuActive") : '0-0'
    },
    mounted() {

    },
    methods: {
      menuSelect(key) {
        window.sessionStorage.setItem('menuActive', key)
      },
      logOut() {
        this.delCookie('user')
        window.sessionStorage.clear()
        this.$router.push({path: '/login'})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #content {
    display: flex;
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    overflow: hidden;
  }

  .section {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background: #f0f2f5;
    padding: 20px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    flex: 0 0 200px;
    width: 200px;
    z-index: 2;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .fa {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }

  a:hover {
    text-decoration: none;
  }
</style>

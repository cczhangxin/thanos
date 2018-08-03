<template>
  <!--
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-openeds="['1','2','3']"
  -->
  <div id="content">
    <el-menu
      class="aside el-menu-vertical-demo"
      :unique-opened="isUnique"
      @select="handleSelect"
      :default-active="activeIndex">
      <el-submenu v-for="(item,index) in menuList" :key="index" :index="(index+1).toString()" >
        <template slot="title">
          <i class="fa fa-video-camera"></i>
          <span sloat="title">{{item.name}}</span>
        </template>
        <template v-for="(item1,index1) in item.children">
          <router-link :to="item1.link">
            <el-menu-item :index="(index+1)+'-'+(index1+1)">{{ item1.name }}
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
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
        isUnique: false,//是否只保持一个子菜单的展开
        activeIndex: '1-1',
        menuList: [
          {
            name: '一级区域',
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
            children: [
              {name: '二线烧成', link: '/monitorPage'},
              {name: '二线窑头', link: '/monitorPage'},
              {name: '煤粉制备', link: '/monitorPage'},
              {name: '一线原料磨', link: '/monitorPage'},
            ]
          },
          {
            name: '发电区域',
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
            children: [
              {name: '供水供暖', link: '/monitorPage'},
            ]
          },
          {
            name: '矿山区域',
            children: [
              {name: '矿山工艺线', link: '/monitorPage'},
            ]
          },
          {
            name: '水泥区域',
            children: [
              {name: '水泥磨工艺', link: '/monitorPage'},
              {name: '水泥入库', link: '/monitorPage'},
              {name: '水泥出库', link: '/monitorPage'},
            ]
          }
        ],
      };
    },
    mounted() {
    },
    methods: {
      handleSelect(key, keyPath){

      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-menu-item {
    padding-left: 55px !important;
  }

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
    background: #f9fafc;
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

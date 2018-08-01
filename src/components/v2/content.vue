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
      default-active="1-1">
      <el-submenu v-for="(item,index) in menuList" :key="index" :index="(index+1).toString()">
        <template slot="title">
          <i class="fa" :class="item.icon"></i>
          <span sloat="title">{{item.name}}</span>
        </template>
        <template v-for="(item1,index1) in item.children">
          <router-link :to="item1.link">
            <el-menu-item :index="(index+1)+'-'+(index1+1)" @click="checkName(item1.name)">{{ item1.name }}</el-menu-item>
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
        menuList: [
          {
            name: '一级区域',
            icon: 'fa-video-camera',
            children: [
              {name: '电收尘', link: '/'},
              {name: '一线窑头', link: '/'},
              {name: '煤粉制备', link: '/'},
              {name: '一线原料磨', link: '/'},
              {name: '一线均化库', link: '/'},
            ]
          },
          {
            name: '二线区域',
            icon: 'fa-video-camera',
            children: [
              {name: '二线烧成', link: '/'},
              {name: '二线窑头', link: '/'},
              {name: '煤粉制备', link: '/'},
              {name: '一线原料磨', link: '/'},
            ]
          },
          {
            name: '发电区域',
            icon: 'fa-video-camera',
            children: [
              {name: '一线汽轮机', link: '/'},
              {name: '一线锅炉', link: '/'},
              {name: '二线汽轮机', link: '/'},
              {name: '二线锅炉', link: '/'},
              {name: '纯水制备', link: '/'},
            ]
          },
          {
            name: '公共区域',
            icon: 'fa-video-camera',
            children: [
              {name: '供水供暖', link: '/'},
            ]
          },
          {
            name: '矿山区域',
            icon: 'fa-video-camera',
            children: [
              {name: '矿山工艺线', link: '/'},
            ]
          },
          {
            name: '水泥区域',
            icon: 'fa-video-camera',
            children: [
              {name: '水泥磨工艺', link: '/'},
              {name: '水泥入库', link: '/'},
              {name: '水泥出库', link: '/'},
            ]
          }
        ],
      };
    },
    mounted() {
      // let width = window.matchMedia("(max-width: 1000px)");
      // width.addListener(widthCallback);
      // let _self = this
      //
      // function widthCallback(width) {
      //   if (width.matches) {
      //     _self.$store.state.auth.isCollapse = true
      //   } else {
      //     _self.$store.state.auth.isCollapse = false
      //   }
      // }
    },
    methods: {
      checkName(name) {
        this.$store.state.auth.activeMonitorName = name
        console.log(name)
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

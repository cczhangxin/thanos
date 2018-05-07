<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="$store.state.auth.isCollapse"
    background-color="#222d32"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="isUnique">
    <el-submenu v-for="(item,index) in menu_list" :index="(index+1).toString()">
      <template slot="title">
        <i class="fa" :class="item.icon"></i>
        <span sloat="title">{{item.name}}</span>
      </template>
      <template v-for="(item1,index1) in item.children">
        <router-link :to="item1.link">
          <el-menu-item :index="(index+1)+'-'+(index1+1)">{{ item1.name }}</el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </el-menu>
</template>
<script>
  export default {
    data () {
      return {
//        isCollapse: true,
        isUnique: false,
        menu_list: [
          {
            name: '监控',
            icon: 'fa-video-camera',
            children: [
              {name: '一级区域', link: '/'},
              {name: '二级区域', link: '/'},
              {name: '发电区域', link: '/'},
              {name: '公共区域', link: '/'},
              {name: '矿山区域', link: '/'},
              {name: '水泥区域', link: '/'},
            ]
          },
          {
            name: '设备管理',
            icon: 'fa-th-large',
            children: [
              {name: '设备台账', link: '/'},
              {name: '采集点管理', link: '/'},
              {name: '润滑卡片', link: '/'},
            ]
          },
          {
            name: '油品管理',
            icon: 'fa-tint',
            children: [
              {name: '油品台账', link: '/'},
            ]
          },
          {
            name: '运行维护',
            icon: 'fa-indent',
            children: [
              {name: '待修隐患', link: '/'},
              {name: '维修工单', link: '/'},
              {name: '检修计划', link: '/'},
              {name: '润滑记录', link: '/'},
              {name: '巡检记录', link: '/'},
            ]
          },
          {
            name: '权限管理',
            icon: 'fa-cogs',
            children: [
              {name: '用户管理', link: '/'},
              {name: '部门管理', link: '/'},
              {name: '角色管理', link: '/'},
              {name: '权限设置', link: '/'},
            ]
          }
        ]
      };
    },
    methods: {
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 202px;
    position: absolute;
    top: 0;
    left: 0;
    padding-top: 70px;
    height: 100%;
    z-index: 2;
    overflow-y: auto;
    overflow-x: hidden;
  }
  
  .el-menu {
    position: absolute;
    padding-top: 70px;
    min-height: 100%;
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
  
  .el-menu-item {
    padding-left: 55px !important;
  }
  
  ::-webkit-scrollbar {
    width: 4px;
  }
  
  ::-webkit-scrollbar-track-piece {
    background-color: #ccc;
    -webkit-border-radius: 4px;
  }
  
  ::-webkit-scrollbar-thumb:vertical {
    background-color: #999;
    -webkit-border-radius: 6px;
  }
</style>
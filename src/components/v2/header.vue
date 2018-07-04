<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">设备管理</template>
        <router-link to="/test">
          <el-menu-item index="1-1">选项1</el-menu-item>
        </router-link>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">备件管理</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">运行维护管理</template>
        <el-menu-item index="3-1">选项1</el-menu-item>
        <el-menu-item index="3-2">选项2</el-menu-item>
        <el-menu-item index="3-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">润滑管理</template>
        <el-menu-item index="4-1">选项1</el-menu-item>
        <el-menu-item index="4-2">选项2</el-menu-item>
        <el-menu-item index="4-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">系统设置</template>
        <el-menu-item index="5-1">选项1</el-menu-item>
        <el-menu-item index="5-2">选项2</el-menu-item>
        <el-menu-item index="5-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {}
    },
    components: {},
    props: [],
    computed: {},
    mounted() {
    },
    methods: {
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #header {
    width: 100%;
    height: 60px;
    background-color: rgb(64, 158, 255);
    color: #fff;
    line-height: 60px;
  }

  .navbar-content {
    margin-right: 20px;
  }

  .navbar-content a {
    color: #fff;
    font-size: 14px;
  }

  .navbar-header {
    width: 220px;
    height: 60px;
    font-size: 19px;
    font-weight: 600;
  }

  .min-header .navbar-header {
    width: 90px;
  }

  i {
    cursor: pointer;
    margin-top: 20px;
  }

  .el-menu {
    padding-left: 200px;
  }

  .is-active {
    background: #0b2e13;
  }
</style>

<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect">
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
      <el-menu-item index="6" @click="logOut()" style="float: right;width: 100px;">
        <i class="fa fa-sign-out" style="color: #fff;vertical-align: baseline;font-size: 18px"></i>退出
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    components: {},
    props: [],
    computed: {},
    mounted() {
    },
    methods: {
      logOut() {
        this.$notify.closeAll()
        this.delCookie('user')
        this.$router.push({path: '/login'});
        // this.$store.commit('login')
      },
      handleSelect(key, keyPath){
        this.$notify.closeAll()
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-menu {
    padding-left: 200px;
  }
</style>

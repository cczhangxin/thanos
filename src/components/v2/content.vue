<template>
  <!--
      background-color="#222d32"
      text-color="#fff"
      active-text-color="#ffd04b"
      :default-openeds="['1','2','3']"
  -->
  <div id="content" v-if="$route.path">
    <el-menu
      class="aside el-menu-vertical-demo"
      :unique-opened="isUnique"
      @select="handleSelect"
      :default-active="$route.path"
      router>
      <template v-for="(item,index) in $store.state.menu.menuList">
        <el-submenu v-if="!item.link" :key="index" :index="(index+1).toString()">
          <template slot="title">
            <i class="fa" :class="item.icon"></i>
            <span sloat="title">{{item.name}}</span>
          </template>
          <template v-for="(item1,index1) in item.children">
            <router-link :to="item1.link">
              <el-menu-item :index="item1.link" @click="checkName(item1.name)">{{ item1.name }}
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
        <router-link v-else :to="item.link">
          <el-menu-item :index="item.link" @click="checkName(item.name)">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </router-link>
      </template>
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
        isUnique: true,//是否只保持一个子菜单的展开
      }
    },
    computed:{
      activeNow(){
        return this.$route.path
      }
    },
    created() {
      // this.setHistory()
    },
    mounted() {

    },
    methods: {
      checkName(name) {
      },
      handleSelect(key, keyPath) {
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

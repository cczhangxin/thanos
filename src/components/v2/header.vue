<template>
  <div id="header" :class="{'min-header':$store.state.auth.isCollapse}">
    <div class="navbar-header pull-left">
      <!--<img src="" alt="logo">-->
      <!--<i class="fa fa-bars pull-right" aria-hidden="true" @click="$store.commit('collapse')"></i>-->
    </div>
    <div class="navbar-content pull-right">
      <a href="javascript:;" @click="$store.commit('login')">
        <i class="fa fa-sign-out" aria-hidden="true"></i>注销
      </a>
    </div>
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
    methods: {}
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

  .navbar-content{
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
</style>

<template>
  <div class="navbar">
    <div class="navbar-header pull-left">
      <!--<img src="" alt="logo">-->
      <!--<i class="fa fa-bars" aria-hidden="true" @click="$store.commit('increment')"></i>-->
    </div>
    <div class="navbar-content pull-left">
      <a href=""><i class="fa fa-sign-out" aria-hidden="true"></i>注销</a>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    },
    components: {},
    props: [],
    computed: {},
    mounted () {
    },
    methods: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    background-color: #3c8dbc;
    position: fixed;
    width: 100%;
    height: 60px;
    color: #fff;
    z-index: 10;
  }
  
  .navbar-content a {
    color: #fff;
  }
  
  .navbar-header {
    font-size: 19px;
    font-weight: 600;
  }
  
  i {
    cursor: pointer;
  }
</style>
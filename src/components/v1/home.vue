<template>
  <div id="container">
    <Header></Header>
    <Content></Content>
  </div>
</template>
<script>
  import Header from '../v2/header'
  import Content from '../v2/content'

  export default {
    data() {
      return {}
    },
    components: {Header, Content},
    props: [],
    computed: {},
    mounted() {
    },
    methods: {}
  }
</script>
<style>
  body {
    font-family: "Microsoft Yahei";
    background-color: #fff;
  }

  #container {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    min-width: 1200px;
  }

  .item-box {
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    overflow: auto;
    border-color: rgba(0,0,0,.05);
    box-shadow: 4px 4px 40px rgba(0,0,0,.05);
  }

  /*浏览器滚动条样式*/
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

  .el-dialog__body{
    overflow: auto;
  }

  /*.el-menu-item.is-active {*/
    /*background: #ecf5ff;*/
    /*border-right: 2px solid #007bff;*/
    /*color: #007bff;*/
  /*}*/
</style>

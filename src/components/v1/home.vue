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
    min-width: 950px;
  }

  .item-box {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    padding: 20px;
    overflow: auto;
    /*border-top: 2px solid #409EFF;*/
  }
</style>

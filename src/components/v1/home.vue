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
    data () {
      return {}
    },
    components: {Header, Content},
    props: [],
    computed: {},
    mounted () {
    },
    methods: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  body {
    font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #fff;
  }
  #container{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>

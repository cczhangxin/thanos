<template>
  <div>
    <header-container></header-container>
    <menu-container></menu-container>
    <content-container></content-container>
    <footer-container></footer-container>
  </div>
</template>
<script>
  import HeaderContainer from '../v2/HeaderContainer'
  import MenuContainer from '../v2/MenuContainer'
  import ContentContainer from '../v2/ContentContainer'
  import FooterContainer from '../v2/FooterContainer'
  
  export default {
    data () {
      return {}
    },
    components: {HeaderContainer, MenuContainer, ContentContainer, FooterContainer},
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

</style>
<template>
  <login v-if="!$store.state.auth.is_login"></login>
  <home v-else></home>
</template>
<script>
  import login from './components/v1/login'
  import home from './components/v1/home'
  export default {
    data() {
      return {}
    },
    components: {login,home},
    props: [],
    computed: {},
    mounted() {
    },
    methods: {}
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>

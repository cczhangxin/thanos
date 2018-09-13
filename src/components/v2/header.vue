<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#ffd04b"

      :default-active="String(activeNow())">
      <el-menu-item v-for="(value,key,index) in $store.state.menu.menuData" :key="index" :index="key"
                    @click="handleSelect(key,index)">{{key}}
      </el-menu-item>
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
    created() {
    },
    mounted() {
      // console.log(this.activeNow())
      this.checkMenu(this.activeNow())
    },
    methods: {
      logOut() {
        this.delCookie('user')
        window.sessionStorage.clear()
        this.$router.push({path: '/login'})
      },
      handleSelect(key) {
        this.$store.state.menu.menuList = this.$store.state.menu.menuData[key]
        window.sessionStorage.setItem('menuList', JSON.stringify(this.$store.state.menu.menuData[key]))
        this.$router.push({
          path: this.$store.state.menu.menuData[key][0].link ? this.$store.state.menu.menuData[key][0].link : this.$store.state.menu.menuData[key][0].children[0].link
        })

      },
      checkMenu(key){
        this.$store.state.menu.menuList = this.$store.state.menu.menuData[key]
        window.sessionStorage.setItem('menuList', JSON.stringify(this.$store.state.menu.menuData[key]))
      },
      activeNow() {
        for (let key in this.$store.state.menu.menuData) {
          for (let i = 0; i < this.$store.state.menu.menuData[key].length; i++) {
            if (this.$store.state.menu.menuData[key][i].link === this.$route.path) {
              return key
            }
            if (this.$store.state.menu.menuData[key][i].children) {
              for (let e = 0; e < this.$store.state.menu.menuData[key][i].children.length; e++) {
                if (this.$store.state.menu.menuData[key][i].children[e].link === this.$route.path) {
                  return key
                }
              }
            }
          }
        }
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

<template>
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      background-color="#324057"
      text-color="#fff"
      active-text-color="#ffd04b"

      :default-active="$store.state.monitor.headerActive">
      <el-menu-item v-for="(value,key,index) in menuData" :key="index" :index="(index+1).toString()"
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
        menuData: {
          home: [
            {
              name: '一级区域',
              icon: 'fa-video-camera',
              children: [
                {name: '电收尘', link: '/monitorPage'},
                {name: '一线窑头', link: '/'},
                {name: '煤粉制备', link: '/'},
                {name: '一线原料磨', link: '/'},
                {name: '一线均化库', link: '/'},
              ]
            },
            {
              name: '二线区域',
              icon: 'fa-video-camera',
              link: '/'
            },
            {
              name: '发电区域',
              icon: 'fa-video-camera',
              children: [
                {name: '一线汽轮机', link: '/'},
                {name: '一线锅炉', link: '/'},
                {name: '二线汽轮机', link: '/'},
                {name: '二线锅炉', link: '/'},
                {name: '纯水制备', link: '/'},
              ]
            },
            {
              name: '公共区域',
              icon: 'fa-video-camera',
              children: [
                {name: '供水供暖', link: '/'},
              ]
            },
            {
              name: '矿山区域',
              icon: 'fa-video-camera',
              children: [
                {name: '矿山工艺线', link: '/'},
              ]
            },
            {
              name: '水泥区域',
              icon: 'fa-video-camera',
              children: [
                {name: '水泥磨工艺', link: '/'},
                {name: '水泥入库', link: '/'},
                {name: '水泥出库', link: '/'},
              ]
            }
          ],
          setting: [
            {
              name: 123,
              link: '/equipmentLedger'
            },
            {
              name: 456,
              link: '/'
            },
            {
              name: 789,
              link: '/'
            }
          ]
        },

      }
    },
    components: {},
    props: [],
    computed: {},
    created() {
      this.$store.state.monitor.headerActive = window.sessionStorage.getItem('headerActive') ? window.sessionStorage.getItem('headerActive') : '1'
    },
    mounted() {
    },
    methods: {
      logOut() {
        this.delCookie('user')
        window.sessionStorage.clear()
        this.$router.push({path: '/login'});
        // this.$store.commit('login')
      },
      handleSelect(key, index) {
        console.log(String(index + 1))
        this.$store.state.monitor.menuList = this.menuData[key]
        window.sessionStorage.setItem('menuList', JSON.stringify(this.menuData[key]))
        window.sessionStorage.setItem('headerActive', String(index + 1))
        window.sessionStorage.setItem('menuActive', this.menuData[key][0].children ? '1-1' : '1')
        this.$store.state.monitor.menuActive=this.menuData[key][0].children ? '1-1' : '1'
        // window.sessionStorage.setItem('path',JSON.stringify(this.menuData[key]))
        this.$router.push({
          path: this.menuData[key][0].link ? this.menuData[key][0].link : this.menuData[key][0].children[0].link
        });
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

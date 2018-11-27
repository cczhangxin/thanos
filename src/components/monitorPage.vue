<template>
  <div>
    <aside class="menu">
      <el-button class="add-btn" type="primary" icon="el-icon-plus" plain size="medium">添加工艺流程</el-button>
      <el-menu :default-active="menuActive" :unique-opened="isUnique" class="el-menu-vertical-demo aside-menu"
               @select="menuSelect">
        <el-submenu v-for="(value,key,index) in menuData" :key="index" :index="String(index)">
          <template slot="title">
            <font-awesome-icon icon="video" style="color: #909399;"/>
            {{key}}
          </template>
          <el-menu-item v-for="(item,i) in value" :key="i" :index="index+'-'+i">{{item}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </aside>
    <section class="section" ref="section">
      <img v-for="item in videos" class="item-img" src="../../static/images/video.png"
           :style="{top:item.top,left:item.left}"
           :info="item"
           @contextmenu="showMenu($event,item,'videos')"
           @mousedown='drag($event,item)' alt="">
      <img v-for="item in oils" class="item-img" src="../../static/images/oil.png"
           :style="{top:item.top,left:item.left}"
           :info="item"
           @contextmenu="showMenu($event,item,'oils')"
           @mousedown='drag($event,item)' alt="">
      <transition name="el-zoom-in-top">
        <el-form v-show="showInfoBox" v-if="activeInfo" class="info-box" label-width="80px">
          <p class="close" style="margin-bottom: 35px">
            <i @click="showInfoBox=!showInfoBox" class="el-icon-close pull-right"></i>
          </p>
          <el-form-item label="内部编号">
            <el-input v-model="activeInfo.info.number"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-input v-model="activeInfo.info.type"></el-input>
          </el-form-item>
          <el-form-item label="注释">
            <el-input v-model="activeInfo.info.annotation"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="show=!show">确定</el-button>
            <el-button type="danger" size="small" @click="deletePoint()">删除</el-button>
            <el-button size="small" @click="show=!show">取消</el-button>
          </el-form-item>
        </el-form>
      </transition>
    </section>
    <el-button @click="addPoint('videos')" type="text">添加摄像点</el-button>
    <el-button @click="addPoint('oils')" type="text">添加油点</el-button>
    <el-button @click="save" type="text">保存</el-button>
    <!--<aside class="aside">-->
    <!--<div class="switch" @click="showAlarm=!showAlarm" :class="{show:showAlarm}">-->
    <!--报警信息-->
    <!--<span>99</span>-->
    <!--</div>-->
    <!--<div class="content" v-show="showAlarm">-->

    <!--</div>-->
    <!--</aside>-->
  </div>
</template>
<script>
  import 'element-ui/lib/theme-chalk/base.css';

  export default {
    data: function () {
      return {
        isUnique: true,//是否只保持一个子菜单的展开
        menuActive: '0-0',
        menuData: {
          '一级区域': ['电收尘', '一线窑头', '煤粉制备'],
          '二线区域': ['电收尘', '一线窑头', '煤粉制备'],
          '发电区域': ['电收尘', '一线窑头', '煤粉制备'],
        },
        me: [
          {
            name: '一级区域',
            icon: 'fa-video-camera',
            children: [
              {name: '电收尘', link: '/monitorPage'},
              {name: '一线窑头', link: '/monitorPage'},
              {name: '煤粉制备', link: '/monitorPage'},
              {name: '一线原料磨', link: '/monitorPage'},
              {name: '一线均化库', link: '/monitorPage'},
            ]
          },
          {
            name: '二线区域',
            icon: 'fa-video-camera',
            children: [
              {name: '二线烧成', link: '/monitorPage'},
              {name: '二线窑头', link: '/monitorPage'},
              {name: '煤粉制备', link: '/monitorPage'},
            ]
          },
          {
            name: '发电区域',
            icon: 'fa-video-camera',
            children: [
              {name: '一线汽轮机', link: '/monitorPage'},
              {name: '一线锅炉', link: '/monitorPage'},
              {name: '二线汽轮机', link: '/monitorPage'},
              {name: '二线锅炉', link: '/monitorPage'},
              {name: '纯水制备', link: '/monitorPage'},
            ]
          },
          {
            name: '公共区域',
            icon: 'fa-video-camera',
            children: [
              {name: '供水供暖', link: '/monitorPage'},
            ]
          },
          {
            name: '矿山区域',
            icon: 'fa-video-camera',
            children: [
              {name: '矿山工艺线', link: '/monitorPage'},
            ]
          },
          {
            name: '水泥区域',
            icon: 'fa-video-camera',
            children: [
              {name: '水泥磨工艺', link: '/monitorPage'},
              {name: '水泥入库', link: '/monitorPage'},
              {name: '水泥出库', link: '/monitorPage'},
            ]
          }
        ],

        itemId: 0,
        videos: [],
        oils: [],
        activePoint: '',
        activeInfo: '',
        showInfoBox: false,
        showAlarm: false,
        boxTop: 0,
        boxLeft: 0,
      }
    },
    created() {
      this.menuActive = window.sessionStorage.getItem("menuActive") ? window.sessionStorage.getItem("menuActive") : '0-0'
    },
    mounted() {
      // this.$notify({
      //   title: '警告',
      //   message: '这是一条警告的提示消息',
      //   type: 'warning',
      //   duration: 0
      // });
    },
    methods: {
      menuSelect(key) {
        window.sessionStorage.setItem('menuActive', key)
      },
      drag(e, item) {
        let style = window.getComputedStyle(this.$refs.section, null)
        let width = parseInt(style.width) - 20
        let height = parseInt(style.height) - 20
        document.onmousemove = (e) => {
          e.preventDefault();
          let clientX = e.clientX - 270
          let clientY = e.clientY - 110
          if (clientX < 0) {
            clientX = 0
          }
          if (clientX > width) {
            clientX = width
          }
          if (clientY < 0) {
            clientY = 0
          }
          if (clientY > height) {
            clientY = height
          }
          item.top = clientY + 'px'
          item.left = clientX + 'px'
        }
        document.onmouseup = () => {
          document.onmousemove = null;
        }
      },
      showMenu(e, item, name) {
        e.preventDefault();
        this.activeInfo = item
        this.activePoint = name
        this.showInfoBox = true
      },
      addPoint(data) {
        this[data].push({
          id: this.itemId++,
          top: 0,
          left: 0,
          info: {
            number: '',
            type: '',
            annotation: ''
          }
        })
      },
      deletePoint() {
        this[this.activePoint] = this[this.activePoint].filter(item => {
          return item.id !== this.activeInfo.id
        })
        this.showInfoBox = !this.showInfoBox
      },
      save() {
        console.log(this.videos)
        console.log(this.oils)
      }
    }
  }
</script>
<style scoped lang="less">
  .section {
    width: 1100px;
    height: 650px;
    background: url("../../static/images/testbg.jpg") no-repeat #fff;
    background-size: 100% 100%;
    border: 1px solid #eee;
    margin-left: 220px;
    position: relative;
    .item-img {
      position: absolute;
      cursor: move;
    }
    .info-box {
      position: absolute;
      left: 30%;
      top: 150px;
      border: 1px solid #eee;
      border-radius: 3px;
      width: 300px;
      padding: 20px 30px 20px 10px;
      /*box-shadow: 0 0 6px 3px #eee;*/
      background: #fff;
    }
    .close i {
      cursor: pointer;
    }
  }

  .add-btn {
    width: 200px;
    margin-bottom: 20px;
  }

  .aside {
    .content {
      background: #fff;
      border-left: 1px solid #eee;
      /*box-shadow: -2px 0 10px #d2d6de;*/
      overflow-y: auto;
      position: fixed;
      right: 0;
      top: 62px;
      width: 10%;
      height: 97.5%;
      padding: 20px;
    }
    .switch {
      position: fixed;
      right: 0;
      top: 80px;
      text-align: center;
      padding: 4px;
      width: 25px;
      background: #fff;
      border: 1px solid #d2d6de;
      border-bottom-left-radius: 6px;
      border-top-left-radius: 6px;
      cursor: pointer;
      box-shadow: -2px 0 10px #d2d6de;
      span {
        background-color: #f56c6c;
        border-radius: 10px;
        color: #fff;
        display: inline-block;
        font-size: 12px;
        height: 18px;
        line-height: 18px;
        padding: 0 6px;
        text-align: center;
        white-space: nowrap;
        border: 1px solid #fff;
        margin-top: 2px;
      }
    }
    .switch.show {
      right: 12.8%;
    }
  }

  .el-menu-item {
    padding-left: 55px !important;
  }

  #content {
    display: flex;
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    overflow: hidden;
  }

  .menu {
    position: absolute;
  }

  .aside-menu {
    border-radius: 6px;
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

  .el-submenu__title b {
    color: #909399;
  }

  .el-menu {
    border: 1px solid #e6e6e6;
  }
</style>

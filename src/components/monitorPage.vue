<template>
    <div class="box">
      <section class="section">
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
              <el-button type="primary" size="small" @click="showInfoBox=!showInfoBox">确定</el-button>
              <el-button type="danger" size="small" @click="deletePoint()">删除</el-button>
              <el-button size="small" @click="showInfoBox=!showInfoBox">取消</el-button>
            </el-form-item>
          </el-form>
        </transition>
      </section>
      <aside class="aside">
        <div class="switch" @click="showAlarm=!showAlarm" :class="{show:showAlarm}">
          报警信息
          <span>99</span>
        </div>
        <div class="content" v-show="showAlarm">
          <el-button @click="addPoint('videos')" type="text">添加摄像点</el-button>
          <el-button @click="addPoint('oils')" type="text">添加油点</el-button>
          <el-button @click="save" type="text">保存</el-button>
        </div>
      </aside>
  </div>
</template>
<script>
  import 'element-ui/lib/theme-chalk/base.css';

  export default {
    data: function () {
      return {
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
    mounted () {
    },
    methods: {
      drag (e, item) {
        let clientWidth = document.body.clientWidth - 245
        document.onmousemove = (e) => {
          e.preventDefault();
          let clientX = e.clientX - 235
          let clientY = e.clientY - 90
          let percentage = clientX / clientWidth * 100
          if (percentage < 0) {
            percentage = 0
          }
          if (percentage > 81.5) {
            percentage = 81.5
          }
          if (clientY < 0) {
            clientY = 0
          }
          if (clientY > 675) {
            clientY = 675
          }
          item.top = clientY + 'px'
          item.left = percentage + '%'
          // let clientX = e.clientX - 230
          // let clientY = e.clientY - 90
          // if (clientX < 0) {
          //   clientX = 0
          // }
          // if (clientX > 1375) {
          //   clientX = 1375
          // }
          // if (clientY < 0) {
          //   clientY = 0
          // }
          // if (clientY > 805) {
          //   clientY = 805
          // }
          // item.top = clientY + 'px'
          // item.left = clientX + 'px'
        }
        document.onmouseup = () => {
          document.onmousemove = null;
        }
      },
      showMenu (e, item, name) {
        e.preventDefault();
        this.activeInfo = item
        this.activePoint = name
        this.showInfoBox = true
      },
      addPoint (data) {
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
      deletePoint () {
        this[this.activePoint] = this[this.activePoint].filter(item => {
          return item.id !== this.activeInfo.id
        })
        this.showInfoBox = !this.showInfoBox
      },
      save () {
        console.log(this.videos)
        console.log(this.oils)
      }
    }
  }
</script>
<style scoped lang="less">
  .box {
    position: relative;
    overflow-x: auto;
    width: 100%;
    .section {
      width: 80%;
      height: 660px;
      background: url("../../static/images/22.jpg") no-repeat #fff;
      background-size: 100% 100%;
      border: 1px solid #eee;
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
  .section {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background: #f9fafc;
    padding: 20px;
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
</style>

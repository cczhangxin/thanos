<template>
  <div class="box">
    <section class="section">
      <el-button @click="addPoint('videos')" type="text">添加摄像点</el-button>
      <el-button @click="addPoint('oils')" type="text">添加油点</el-button>
      <el-button @click="save" type="text">保存</el-button>
      <!--&lt;!&ndash;&ndash;&gt;-->
      <!--&lt;!&ndash;<img class="item-img" src="../../../static/images/oil.png" @mousedown='drag' alt="">&ndash;&gt;-->
      <!--&lt;!&ndash;<img class="item-img" src="../../../static/images/green.png" @mousedown='drag' alt="">&ndash;&gt;-->
      <!--&lt;!&ndash;<img class="item-img" src="../../../static/images/grey.png" @mousedown='drag' alt="">&ndash;&gt;-->
      <!--&lt;!&ndash;<img class="item-img" src="../../../static/images/red.png" @mousedown='drag' alt="">&ndash;&gt;-->
      <!--<img class="item-img" src="../../../static/images/yellow.png" @mousedown='drag' alt="">-->
      <img v-for="item in videos" class="item-img" src="../../../static/images/video.png"
           :style="{top:item.top,left:item.left}"
           :info="item"
           @contextmenu="showMenu($event,item,'videos')"
           @mousedown='drag($event,item)' alt="">

      <img v-for="item in oils" class="item-img" src="../../../static/images/oil.png"
           :style="{top:item.top,left:item.left}"
           :info="item"
           @contextmenu="showMenu($event,item,'oils')"
           @mousedown='drag($event,item)' alt="">

      <transition name="el-zoom-in-top">
        <el-form v-show="showInfoBox" v-if="activeInfo" class="info-box" label-width="80px">
          <p class="close" style="margin-bottom: 35px"><i @click="showInfoBox=!showInfoBox"
                                                          class="el-icon-close pull-right"></i></p>
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
        <el-card shadow="always" style="margin-bottom: 20px">
          报警1
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警2
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
        <el-card shadow="always" style="margin-bottom: 20px">
          报警3
        </el-card>
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
        showAlarm: false
      }
    },
    methods: {
      drag(e, item) {
        let clientWidth = document.body.clientWidth - 245
        document.onmousemove = (e) => {
          e.preventDefault();
          let clientX = e.clientX - 235
          let clientY = e.clientY - 90
          let percentage = clientX / clientWidth * 100
          if (percentage < 0) {
            percentage = 0
          }
          if (percentage > 98.5) {
            percentage = 98.5
          }
          item.top = clientY < 0 ? 0 : clientY + 'px'
          item.left = percentage + '%'
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
  .box {
    position: relative;
    width: 100%;
    height: 100%;
    .section {
      margin: 20px;
      width: 1400px;
      height: 830px;
      background: #fff;
      border: 1px solid #eee;
    }
  }

  .item-img {
    position: absolute;
    cursor: move;
  }

  .info-box {
    position: absolute;
    left: 30%;
    top: 150px;
    border-radius: 3px;
    width: 300px;
    padding: 20px 30px 20px 10px;
    box-shadow: 0 0 6px 3px #eee;
    background: #fff;
  }

  .close i {
    cursor: pointer;
  }

  .aside {
    .content {
      background: #f9fafc;
      border-left: 1px solid #d2d6de;
      box-shadow: -2px 0 10px #d2d6de;
      width: 180px;
      height: 95.5%;
      overflow-y: auto;
      position: absolute;
      right: 0;
      top: -20px;
      padding: 20px;
    }
    .switch {
      position: absolute;
      right: 0;
      top: 20px;
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
      right: 220px;
    }
  }
</style>

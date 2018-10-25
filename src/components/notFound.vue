<template>
  <div class="notfoud-container">
    <div class="img-404">
    </div>
    <p class="notfound-p">哎呀迷路了...</p>
    <div class="notfound-reason">
      <p>可能的原因：</p>
      <ul>
        <li>原来的页面不存在了</li>
        <li>我们的服务器被外星人劫持了</li>
      </ul>
    </div>
    <div class="notfound-btn-container">
      <router-link to="/monitorPage">
        <a class="notfound-btn">返回首页</a>
      </router-link>
    </div>
  </div>
  <!--<div>-->
    <!--<el-table-->
      <!--ref="singleTable"-->
      <!--:data="tableData"-->
      <!--highlight-current-row-->
      <!--@current-change="handleCurrentChange"-->
      <!--style="width: 100%">-->
      <!--<el-table-column-->
        <!--type="index"-->
        <!--width="50">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="date"-->
        <!--label="日期"-->
        <!--width="120">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="name"-->
        <!--label="姓名"-->
        <!--width="120">-->
      <!--</el-table-column>-->
      <!--<el-table-column-->
        <!--property="address"-->
        <!--label="地址">-->
      <!--</el-table-column>-->
      <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--@click="setCurrent(scope.row)">编辑-->
          <!--</el-button>-->
          <!--<el-button-->
            <!--size="mini"-->
            <!--type="danger"-->
            <!--@click="handleDelete(scope.$index, scope.row)">删除-->
          <!--</el-button>-->
        <!--</template>-->
      <!--</el-table-column>-->
    <!--</el-table>-->
    <!--<div style="margin-top: 20px">-->
      <!--<el-button @click="setCurrent(tableData[1])">选中第二行</el-button>-->
      <!--<el-button @click="setCurrent()">取消选择</el-button>-->
    <!--</div>-->
  <!--</div>-->
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        currentRow: null
      }
    },

    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      }
    }
  }
</script>
<style scoped>
  .notfoud-container .img-404 {
    height: 155px;
    background: url(data:image/png;base64,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) center center no-repeat;
    -webkit-background-size: 150px auto;
    margin-top: 40px;
    margin-bottom: 20px
  }

  .notfoud-container .notfound-p {
    line-height: 22px;
    font-size: 17px;
    padding-bottom: 15px;
    border-bottom: 1px solid #f6f6f6;
    text-align: center;
    color: #262b31
  }

  .notfoud-container .notfound-reason {
    color: #9ca4ac;
    font-size: 13px;
    line-height: 13px;
    text-align: left;
    width: 210px;
    margin: 0 auto
  }

  .notfoud-container .notfound-reason p {
    margin-top: 13px
  }

  .notfoud-container .notfound-reason ul li {
    margin-top: 10px;
    margin-left: 36px
  }

  .notfoud-container .notfound-btn-container {
    margin: 40px auto 0;
    text-align: center
  }

  .notfoud-container .notfound-btn-container .notfound-btn {
    display: inline-block;
    border: 1px solid #ebedef;
    background-color: #239bf0;
    color: #fff;
    font-size: 15px;
    border-radius: 5px;
    text-align: center;
    padding: 10px;
    line-height: 16px;
    white-space: nowrap
  }
</style>

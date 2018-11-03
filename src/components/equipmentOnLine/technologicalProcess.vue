<template>
  <div class="item-box">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备在线管理</el-breadcrumb-item>
      <el-breadcrumb-item>工艺流程管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索部分-->
    <header class="header-search">
      <el-button size="small" type="success" @click="add()" class="header-add-btn">新增工艺流程</el-button>
    </header>
    <!--内容-->
    <el-table :data="tableData" style="width: 100%" height="620" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="工艺流程名称"></el-table-column>
      <el-table-column prop="number" label="所属区域"></el-table-column>
      <el-table-column prop="vendor" label="背景画面"></el-table-column>
      <el-table-column prop="vendor" label="备注"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="delete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      class="table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 50, 100, 200]"
      :page-size=paginationData.pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total=paginationData.total>
    </el-pagination>
  </div>
</template>
<script>
  export default {
    data: function () {
      return {
        loading: false,
        searchData: {
          number: '',
          location: '',
          department: '',
          locationOption: []
        },
        paginationData: {
          pageNow: 1,
          pageSize: 10,
          total: 0
        },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
      }
    },
    components: {},
    props: [],
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      handleSizeChange(val) {
        this.paginationData.pageSize = val
        this.getTableData()
      },
      handleCurrentChange(val) {
        this.paginationData.pageNow = val
        this.getTableData()
      },
      getData() {

      },
      query() {

      },
      edit() {

      },
      delete() {

      },
    },
    watch: {}
  }
</script>
<style scoped lang="less">
</style>

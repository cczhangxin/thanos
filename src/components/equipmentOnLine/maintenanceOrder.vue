<template>
  <div class="item-box">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备在线管理</el-breadcrumb-item>
      <el-breadcrumb-item>维修工单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索部分-->
    <header class="header-search">
      <el-input size="small" v-model="searchData.number" placeholder="请输入工单号" clearable style="width: 180px;"></el-input>
      <el-input size="small" v-model="searchData.number" placeholder="请输入设备名称/设备编号" clearable style="width: 220px;"></el-input>
      <el-select size="small" v-model="searchData.location" filterable clearable placeholder="所有工单类型"
                 style="width: 140px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button size="small" type="primary" icon="el-icon-search" @click="query()">查询</el-button>
      <el-button size="small" type="success" @click="add()" class="header-add-btn">新增工单记录</el-button>
    </header>
    <!--内容-->
    <el-table :data="tableData" style="width: 100%" height="620" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="工单号"></el-table-column>
      <el-table-column prop="number" label="设备名称"></el-table-column>
      <el-table-column prop="vendor" label="设备编号"></el-table-column>
      <el-table-column prop="vendor" label="故障发现时间"></el-table-column>
      <el-table-column prop="vendor" label="故障描述"></el-table-column>
      <el-table-column prop="vendor" label="工单类型"></el-table-column>
      <el-table-column prop="vendor" label="监控负责人"></el-table-column>
      <el-table-column prop="vendor" label="技术负责人"></el-table-column>
      <el-table-column prop="vendor" label="计划修复时间"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="mini" @click="detail(scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="delete(scope.row)">删除</el-button>
          <el-button size="mini" type="warning" @click="scrap(scope.row)">审核</el-button>
          <el-button size="mini" type="success" @click="info(scope.row)">生成在修工单</el-button>
          <el-button size="mini" type="info" @click="info(scope.row)">生成领料单</el-button>
          <el-button size="mini" type="info" @click="info(scope.row)">创建备件计划</el-button>
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
      detail() {

      },
      edit() {

      },
      delete() {

      },
      scrap() {

      },
      info() {

      },
    },
    watch: {}
  }
</script>
<style scoped lang="less">
</style>

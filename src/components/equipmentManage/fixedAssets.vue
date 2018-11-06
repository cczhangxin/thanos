<template>
  <div class="item-box">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>固定资产</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索部分-->
    <header class="header-search">
      <el-input size="small" v-model="searchData.number" placeholder="请输入设备编号/名称" clearable
                style="width: 180px;"></el-input>
      <el-select size="small" v-model="searchData.location" filterable clearable placeholder="全部安装位置"
                 style="width: 140px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select size="small" v-model="searchData.department" filterable clearable placeholder="全部使用部门"
                 style="width: 140px;">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button size="small" type="primary" icon="el-icon-search" @click="query()">查询</el-button>
    </header>
    <!--内容-->
    <el-table :data="tableData" style="width: 100%" height="620" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="number" label="设备编号"></el-table-column>
      <el-table-column prop="specification" label="规格型号"></el-table-column>
      <el-table-column prop="vendor" label="生产厂家"></el-table-column>
      <el-table-column prop="vendor" label="使用部门"></el-table-column>
      <el-table-column prop="vendor" label="投用日期"></el-table-column>
      <el-table-column prop="vendor" label="所属生产线"></el-table-column>
      <el-table-column prop="vendor" label="所属工序"></el-table-column>
      <el-table-column prop="vendor" label="资产净值"></el-table-column>
      <el-table-column prop="vendor" label="资产状态"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="mini" @click="detail(scope.row)">详情</el-button>
          <el-button size="mini" type="success" @click="edit(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="delete(scope.row)">删除</el-button>
          <el-button size="mini" type="danger" @click="scrap(scope.row)">报废</el-button>
          <el-button size="mini" type="danger" @click="info(scope.row)">运转信息</el-button>
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

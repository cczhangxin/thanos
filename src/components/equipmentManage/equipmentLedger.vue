<template>
  <div class="item-box">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备台账</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索部分-->
    <header class="header-search">
      <el-input size="small" v-model="searchData.number" placeholder="请输入设备编号" clearable
                style="width: 180px;"></el-input>
      <el-input size="small" v-model="searchData.name" placeholder="请输入设备名称" clearable style="width: 180px;"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="query()">查询</el-button>
      <el-button size="small" type="success" class="header-add-btn" @click="$store.state.common.showDialog=true">新增设备台账</el-button>
    </header>
    <!--内容-->
    <el-table :data="tableData" style="width: 100%" height="620" v-loading="loading" element-loading-text="拼命加载中">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <!--<el-table-column prop="number" label="设备编号"></el-table-column>-->
      <el-table-column prop="specification" label="规格型号"></el-table-column>
      <el-table-column prop="vendor" label="生产厂家"></el-table-column>
      <el-table-column prop="useTo" label="设备用途"></el-table-column>
      <el-table-column prop="category" label="设备分类"></el-table-column>
      <el-table-column label="操作" width="350">
        <template slot-scope="scope">
          <el-button size="mini" @click="">详情</el-button>
          <el-button size="mini" type="success" @click="edit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="delete1(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="">新增固定资产</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      class="table-pagination"
      @size-change="sizeChange"
      @current-change="currentChange"
      :page-sizes="[10, 50, 100, 200]"
      :page-size=pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total=Number(total)>
    </el-pagination>
    <!--弹窗-->
    <equipment-edit></equipment-edit>
  </div>
</template>

<script>
  import equipmentEdit from './equipmentEdit'

  export default {
    data() {
      return {
        tableData: [],
        searchData: {
          number: '',
          name: ''
        },
        loading: true,
        categoryOptions: '',
        pageNow: 1,
        pageSize: 10,
        total: '',
      }
    },
    components: {equipmentEdit},
    props: [],
    computed: {},
    created() {
      this.getTableData()
      // this.getCategory()
    },
    mounted() {
    },
    methods: {
      getTableData() {
        this.$http.get('/api/equipments', {
          params: {
            page: this.pageNow - 1,
            size: this.pageSize
          }
        }).then(response => {
          this.tableData = response.data.items
          this.total = response.data.totalItems
          this.loading = false
        }).catch(() => {
          this.$message({
            message: '加载失败！',
            type: 'error'
          });
          this.loading = false
        })
      },
      getCategory() {
        this.$http.get('/api/categories').then(response => {
          this.categoryOptions = response.data
        })
      },
      currentChange(val) {
        this.pageNow = val
        this.getTableData()
      },
      sizeChange(val) {
        this.pageSize = val
        this.getTableData()
      },
      edit() {

      },
      delete1(item) {
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/api/equipments/${item.id}`).then(response => {
            this.checkResponse(response)
            this.getTableData()
          })
        })
      },
    }
  }
</script>

<style scoped>

</style>

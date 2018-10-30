<template>
  <div class="item-box">
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备台账</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索部分-->
    <header class="header-search">
      <el-input size="small" v-model="equipmentNumber" placeholder="请输入设备编号" clearable style="width: 180px;"></el-input>
      <el-input size="small" v-model="equipmentName" placeholder="请输入设备名称" clearable style="width: 180px;"></el-input>
      <el-button size="small" type="primary" icon="el-icon-search" @click="query()">查询</el-button>
      <el-button size="small" type="success" @click="newEquipment()" class="header-add-btn">新增设备台账</el-button>
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
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="handleEquipmentInfo(scope.$index, scope.row)">新增固定资产</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      class="table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 50, 100, 200]"
      :page-size=pageSize
      layout="total, sizes, prev, pager, next, jumper"
      :total=Number(total)>
    </el-pagination>
    <!--&lt;!&ndash;弹窗&ndash;&gt;-->
    <!--<el-dialog title="编辑设备" :visible.sync="outerVisible" width="70%" :close-on-click-modal="false">-->
    <!--<el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>-->
    <!--</el-dialog>-->
    <!--<el-steps :active="active" finish-status="success">-->
    <!--<el-step title="设备基本信息"></el-step>-->
    <!--<el-step title="设备备件"></el-step>-->
    <!--<el-step title="润滑卡片"></el-step>-->
    <!--</el-steps>-->
    <!--<equipmentEdit></equipmentEdit>-->
    <!--<div slot="footer" class="dialog-footer">-->
    <!--<el-button @click="outerVisible = false">取 消</el-button>-->
    <!--<el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>-->
    <!--</div>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import equipmentEdit from './equipmentEdit'

  export default {
    data() {
      return {
        outerVisible: false,
        innerVisible: false,
        equipmentNumber: '',
        equipmentName: '',
        titleName: ['设备名称', '设备编号', '规格型号', '生产厂家', '设备用途', '主要参数'],
        dialogFormVisible: false,
        activeData: '',
        tableData: [],
        itemData: {
          name: '1',
          number: '2',
          type: '3',
          manufacturers: '4',
          use: '5',
          parameter: '6'
        },
        loading: true,
        categoryOptions: '',
        pageNow: 1,
        pageSize: 10,
        total: ''
      }
    },
    components: {equipmentEdit},
    props: [],
    computed: {},
    created() {
      this.getTableData()
      this.getCategory()
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
        }).catch(error => {
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
      newEquipment() {
        this.$router.push({
          path: '/equipmentEdit'
        })
      },
      handleDetail(index, row) {
        this.$router.push({
          path: '/equipmentDetails',
          query: {
            data: row
          }
        })
      },
      handleEdit(index, row) {
        // this.outerVisible = true
        this.$router.push({
          path: '/equipmentEdit',
          query: {
            data: JSON.stringify(row)
          }
        })
        this.dialogFormVisible = true
      },
      handleDelete(item) {
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
      handleEquipmentInfo(index, row) {
        console.log(index, row);
      },
      handleGenerate(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getTableData()
      },
      handleCurrentChange(val) {
        this.pageNow = val
        this.getTableData()
      }
    }
  }
</script>

<style scoped>
</style>

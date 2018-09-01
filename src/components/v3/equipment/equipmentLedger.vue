<template>
  <div class="item-box">
    <!--修改时弹窗-->
    <el-dialog title="设备台账" :visible.sync="dialogFormVisible">
      <el-form ref="form" label-width="90px">
        <el-col :span="12" v-for="(value,key,index) in itemData" :key="index">
          <el-form-item :label="titleName[index]">
            <el-input v-model="activeData[key]"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
    <!--面包屑-->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备台账</el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索部分-->
    <header class="header">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-input v-model="equipmentNumber" placeholder="请输入设备编号"></el-input>
        </el-col>
        <el-col :span="4">
          <el-input v-model="equipmentName" placeholder="请输入设备名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="query()">查询</el-button>
        </el-col>
        <el-col :span="10" class="new">
          <el-button type="success" @click="newEquipment()">新增设备台账</el-button>
        </el-col>
      </el-row>
    </header>
    <!--内容-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="(value,key,index) in itemData" :prop="key" :label="titleName[index]" :key="index"></el-table-column>
      <el-table-column label="操作" width="450">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="success" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="primary" @click="handleEquipmentInfo(scope.$index, scope.row)">运转信息</el-button>
          <el-button size="mini" type="warning" @click="handleGenerate(scope.$index, scope.row)">生成设备实例</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :total="500">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        equipmentNumber: '',
        equipmentName: '',
        titleName: ['设备名称', '设备编号', '规格型号', '生产厂家', '设备用途', '主要参数'],
        dialogFormVisible: false,
        activeData:'',
        tableData: [
          {
            name: '1',
            number: '2',
            type: '3',
            manufacturers: '4',
            use: '5',
            parameter: '6'
          },
          {
            name: '1',
            number: '2',
            type: '3',
            manufacturers: '4',
            use: '5',
            parameter: '6'
          }
        ],
        itemData: {
          name: '1',
          number: '2',
          type: '3',
          manufacturers: '4',
          use: '5',
          parameter: '6'
        },
      }
    },
    components: {},
    props: [],
    computed: {},
    created() {

    },
    mounted() {
      this.$http.get('/api/equipments').then(msg => {
        console.log(msg)
      })
    },
    methods: {
      query() {

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
        this.activeData = row
        this.dialogFormVisible = true
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleEquipmentInfo(index, row) {
        console.log(index, row);
      },
      handleGenerate(index, row) {
        console.log(index, row);
      }
    }
  }
</script>

<style scoped>
  .page {
    float: right;
    margin-top: 20px;
  }

  .header {
    margin-bottom: 40px;
    margin-top: 20px;
  }

  .new {
    text-align: right;
  }
</style>

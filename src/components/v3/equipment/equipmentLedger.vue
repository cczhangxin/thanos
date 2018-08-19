<template>
  <div class="item-box">
    <header class="header">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-input v-model="equipmentNumber" placeholder="请输入设备编号"></el-input>
        </el-col>
        <el-col :span="3">
          <el-input v-model="equipmentName" placeholder="请输入设备名称"></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="query()">查询</el-button>
        </el-col>
        <el-col :span="12" class="new">
          <el-button type="success" @click="newEquipment()">新增设备台账</el-button>
        </el-col>
      </el-row>
    </header>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="设备名称"></el-table-column>
      <el-table-column prop="number" label="设备编号"></el-table-column>
      <el-table-column prop="type" label="规格型号"></el-table-column>
      <el-table-column prop="manufacturers" label="生产厂家"></el-table-column>
      <el-table-column prop="use" label="设备用途"></el-table-column>
      <el-table-column prop="parameter" label="主要参数"></el-table-column>
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
    <el-pagination
      class="page"
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        equipmentNumber:'',
        equipmentName:'',
        tableData: [
          {
            name:'1',
            number:'2',
            type:'3',
            manufacturers:'4',
            use:'5',
            parameter:'6'
          }
        ]
      }
    },
    components: {},
    props: [],
    computed: {},
    created(){

    },
    mounted () {

    },
    methods: {
      query(){

      },
      newEquipment(){

      },
      handleDetail (index, row) {
        this.$router.push({
          path: '/equipmentDetails',
          query: {
            data: row
          }
        })
      },
      handleEdit (index, row) {
        console.log(index, row);
      },
      handleDelete (index, row) {
        console.log(index, row);
      },
      handleEquipmentInfo (index, row) {
        console.log(index, row);
      },
      handleGenerate (index, row) {
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
  }

  .new{
    text-align: right;
  }
</style>

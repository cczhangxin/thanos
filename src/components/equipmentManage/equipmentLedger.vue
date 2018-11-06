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
    <!--弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="showDialog" width="60%" :close-on-click-modal="false"
               :close-on-press-escape="false">
      <el-steps :active="stepActive" finish-status="success" class="steps">
        <el-step title="基础信息"></el-step>
        <el-step title="设备备件"></el-step>
        <el-step title="润滑卡片"></el-step>
        <el-step title="设备参数"></el-step>
      </el-steps>
      <!--基础信息-->
      <el-form v-show="stepActive===0" :model="basicInformation" :rules="ruleBasicInformation" ref="basicInformation"
               label-width="100px"
               style="width: 90%">
        <el-form-item label="设备名称" prop="name">
          <el-input v-model="basicInformation.name" clearable></el-input>
        </el-form-item>
        <el-form-item label="规格型号" prop="specification">
          <el-input v-model="basicInformation.specification" clearable></el-input>
        </el-form-item>
        <el-form-item label="生产厂家" prop="vendor">
          <el-input v-model="basicInformation.vendor" clearable></el-input>
        </el-form-item>
        <el-form-item label="设备用途" prop="useTo">
          <el-input v-model="basicInformation.useTo" clearable></el-input>
        </el-form-item>
      </el-form>
      <!--设备备件-->
      <div v-show="stepActive===1">
        <el-table :data="squareParts" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="name" label="备件名称"></el-table-column>
          <el-table-column property="installLocation" label="使用部位"></el-table-column>
          <el-table-column property="specifications" label="规格型号"></el-table-column>
          <el-table-column property="unit" label="单位"></el-table-column>
          <el-table-column property="initialAmount" label="装机数量"></el-table-column>
          <el-table-column property="technicalParameters" label="技术参数"></el-table-column>
          <el-table-column property="others" label="其他"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="success">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="[1]" style="width: 100%">
          <el-table-column width="50"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="squarePart.name" placeholder="备件名称" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="squarePart.installLocation" placeholder="使用部位" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="squarePart.specifications" placeholder="规格型号" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="squarePart.unit" placeholder="单位" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="squarePart.initialAmount" placeholder="装机数量" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="squarePart.technicalParameters" placeholder="技术参数" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="squarePart.others" placeholder="其他" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="add('squarePart')">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--润滑卡片-->
      <div v-show="stepActive===2">
        <el-table :data="lubricatingCards" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="position" label="润滑部位"></el-table-column>
          <el-table-column property="amount" label="润滑点数"></el-table-column>
          <el-table-column property="type" label="润滑方式"></el-table-column>
          <el-table-column property="initialOilAmount" label="初装油量"></el-table-column>
          <el-table-column property="supplyOilAmount" label="加油量"></el-table-column>
          <el-table-column property="lubricatingPeriod" label="润滑周期"></el-table-column>
          <el-table-column property="temperature" label="标准温度"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="dialog=true;activeData=scope.row">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="[1]" style="width: 100%">
          <el-table-column width="50"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="lubricatingCard.position" placeholder="润滑部位" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="lubricatingCard.amount" placeholder="润滑点数" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="lubricatingCard.type" placeholder="润滑方式" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="lubricatingCard.oilSpecifications" placeholder="油品型号" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="lubricatingCard.initialOilAmount" placeholder="初装油量" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="lubricatingCard.supplyOilAmount" placeholder="加油量" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="lubricatingCard.lubricatingPeriod" placeholder="润滑周期" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="lubricatingCard.temperature" placeholder="标准温度" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="add('lubricatingCard')">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--设备参数-->
      <div v-show="stepActive===3">
        <el-table :data="parameters" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="name" label="参数名称"></el-table-column>
          <el-table-column property="value" label="参数值"></el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="dialog=true;activeData=scope.row">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="[1]" style="width: 100%">
          <el-table-column width="50"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="parameter.name" placeholder="参数名称" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input size="mini" v-model="parameter.value" placeholder="参数值" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="add('lubricatingCard')">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDialog = false" size="medium">取 消</el-button>
        <el-button v-show="stepActive" type="primary" @click="stepActive--" size="medium">上一步</el-button>
        <el-button v-show="stepActive!==3" type="primary" @click="nexStep()" size="medium">下一步</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import equipmentEdit from './equipmentEdit'

  export default {
    data() {
      return {
        showDialog: false,
        equipmentNumber: '',
        equipmentName: '',
        titleName: ['设备名称', '设备编号', '规格型号', '生产厂家', '设备用途', '主要参数'],
        dialogFormVisible: false,
        activeData: '',
        tableData: [],
        loading: true,
        categoryOptions: '',
        pageNow: 1,
        pageSize: 10,
        total: '',
        dialogTitle: '新增设备台账',
        basicInformation: {
          companyId: "5b7f6b1ce7a4d48d1af01f56",
          name: "",
          specification: "",
          vendor: "",
          useTo: "",
        },
        ruleBasicInformation: {
          name: [
            {required: true, message: '请填写设备名称', trigger: 'change'}
          ],
          specification: [
            {required: true, message: '请填写规格型号', trigger: 'change'}
          ],
          vendor: [
            {required: true, message: '请填生产厂家', trigger: 'change'}
          ],
          useTo: [
            {required: true, message: '请填设备用途', trigger: 'change'}
          ]
        },
        squareParts: [],
        squarePart: {
          "initialAmount": "",
          "installLocation": "",
          "name": "",
          "others": "",
          "riskyReserve": "",
          "specifications": "",
          "technicalParameters": "",
          "technicalRequirement": "",
          "unit": ""
        },
        //润滑卡片
        lubricatingCards: [],
        lubricatingCard: {
          "amount": "",
          "id": "",
          "initialOilAmount": "",
          "lubricatingPeriod": "",
          "oilSpecifications": "",
          "position": "",
          "supplyOilAmount": "",
          "temperature": "",
          "standardOilAmount": "",
          "type": ""
        },
        parameters: [],
        parameter: {
          "name": "",
          "value": "",
        },
        stepActive: 0
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
        // this.$router.push({
        //   path: '/equipmentEdit'
        // })
        this.showDialog = true
        this.stepActive = 0

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
      handleSizeChange(val) {
        this.pageSize = val
        this.getTableData()
      },
      handleCurrentChange(val) {
        this.pageNow = val
        this.getTableData()
      },
      submitForm() {
        this.$refs.basicInformation.validate((valid) => {
          if (valid) {
            this.stepActive++
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      nexStep() {
        if (!this.stepActive) {
          this.submitForm()
        } else {
          this.stepActive++
        }
      }
    }
  }
</script>

<style scoped>
  .steps {
    margin-bottom: 20px;

  }
</style>

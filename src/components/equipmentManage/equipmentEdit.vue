<template>
  <!--<div>-->
    <!--<el-dialog title="编辑设备参数" :visible.sync="dialog" width="50%">-->
      <!--<el-table :data="params" style="width: 100%">-->
        <!--<el-table-column width="50"></el-table-column>-->
        <!--<el-table-column label="设备参数名称">-->
          <!--<template slot-scope="scope">-->
            <!--<el-input v-model="scope.row.name" placeholder="设备参数名称" clearable></el-input>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column label="参数值">-->
          <!--<template slot-scope="scope">-->
            <!--<el-input v-model="scope.row.value" placeholder="参数值" clearable></el-input>-->
          <!--</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column width="150">-->
          <!--<template slot-scope="scope">-->
            <!--<el-button size="medium" type="danger" @click="paramsDelete(scope.$index)">删 除</el-button>-->
          <!--</template>-->
        <!--</el-table-column>-->
      <!--</el-table>-->
      <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button type="success" @click="paramsAdd">添 加</el-button>-->
        <!--<el-button @click="dialog = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialog = false">确 定</el-button>-->
      <!--</div>-->
    <!--</el-dialog>-->
    <!--<div class="item-box">-->
      <!--<el-form ref="form" label-width="100px">-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="设备名称">-->
            <!--<el-input v-model="itemData.name" clearable></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="设备编号">-->
            <!--<el-input v-model="itemData.number" clearable></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="规格型号">-->
            <!--<el-input v-model="itemData.specification" clearable></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="设备分类">-->
            <!--<el-select v-model="itemData.category" placeholder="请选择" clearable filterable>-->
              <!--<el-option-group v-for="group in categoryOptions" :key="group.name" :label="group.name">-->
                <!--<el-option v-for="item in group.children" :key="item.name" :label="item.name" :value="item.name">-->
                <!--</el-option>-->
              <!--</el-option-group>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="生产厂家">-->
            <!--<el-input v-model="itemData.vendor" clearable></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="设备用途">-->
            <!--<el-input v-model="itemData.useTo" clearable></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="设备参数">-->
            <!--<el-button type="text" @click="dialog=true">编辑设备参数</el-button>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="12">-->
          <!--<el-form-item label="">-->
            <!--<el-button type="primary" @click="addEquipments">保存</el-button>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-form>-->
    <!--</div>-->
    <!--<div class="item-box">-->
      <!--<equipment-util :itemData="itemData" :itemId="itemId"></equipment-util>-->
    <!--</div>-->
  <!--</div>-->
    <!--弹窗-->
    <el-dialog :title="dialogTitle" :visible.sync="$store.state.common.showDialog" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
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
        <el-table :data="squareParts" highlight-current-row ref="singleTable">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column v-for="(item,index) in squarePartsInfo" :label="item.name" :key="index">
            <template slot-scope="scope">
              <span class="text">{{scope.row[item.value]}}</span>
              <el-input size="mini" class="text-input" v-model="scope.row[item.value]" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="70">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table :data="[1]">
          <el-table-column width="50"></el-table-column>
          <el-table-column v-for="(item,index) in squarePartsInfo" :key="index">
            <template slot-scope="scope">
              <el-input size="mini" v-model="squarePart[item.value]" :placeholder="item.name" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column width="70">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="setCurrent()">新增</el-button>
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
              <el-button size="mini" type="primary" @click="add('lubricatingCard');setCurrent()">新增</el-button>
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
              <el-button size="mini" type="primary" @click="add('lubricatingCard');setCurrent()">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setCurrent;$store.state.common.showDialog=false" size="medium">取 消</el-button>
        <el-button v-show="stepActive" type="primary" @click="stepActive--;setCurrent()" size="medium">上一步</el-button>
        <el-button v-show="stepActive!==3" type="primary" @click="nexStep();setCurrent()" size="medium">下一步</el-button>
      </div>
    </el-dialog>
</template>
<script>
  import equipmentUtil from './equipmentUtil'

  export default {
    data() {
      return {
        ss:true,
        currentRow: null,
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
        squareParts: [
          {
            "initialAmount": "initialAmount",
            "installLocation": "installLocation",
            "name": "name",
            "others": "others",
            "riskyReserve": "riskyReserve",
            "specifications": "specifications",
            "technicalParameters": "technicalParameters",
            "technicalRequirement": "technicalRequirement",
            "unit": "unit"
          },{
            "initialAmount": "initialAmount",
            "installLocation": "installLocation",
            "name": "name",
            "others": "others",
            "riskyReserve": "riskyReserve",
            "specifications": "specifications",
            "technicalParameters": "technicalParameters",
            "technicalRequirement": "technicalRequirement",
            "unit": "unit"
          }],
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
        stepActive: 0,
        squarePartsInfo:[
          {
            name:'备件名称',
            value:'name'
          },
          {
            name:'使用部位',
            value:'installLocation'
          },
          {
            name:'规格型号',
            value:'specifications'
          },
          {
            name:'单位',
            value:'unit'
          },
          {
            name:'装机数量',
            value:'initialAmount'
          },
          {
            name:'技术参数',
            value:'technicalParameters'
          },
          {
            name:'其他',
            value:'others'
          }
        ],
        // dialog: false,
        // itemData: {
        //   companyId: "5b7f6b1ce7a4d48d1af01f56",
        //   params: [],
        //   name: "",
        //   number: "",
        //   specification: "",
        //   category: "",
        //   vendor: "",
        //   useTo: "",
        // },
        // //设备参数
        // params: [],
        // itemId: '',
        // categoryOptions: []
      }
    },
    components: {equipmentUtil},
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
      newEquipment() {
        // this.$router.push({
        //   path: '/equipmentEdit'
        // })
        this.showDialog = true
        this.stepActive = 0

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
        this.stepActive++
        // if (!this.stepActive) {
        //   this.submitForm()
        // } else {
        //   this.stepActive++
        // }
      },
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      // getCategory() {
      //   this.$http.get('/api/categories').then(response => {
      //     this.categoryOptions = response.data
      //     // console.log(response.data)
      //   })
      // },
      // addEquipments() {
      //   let way = 'post'
      //   let api = '/api/equipments'
      //   if (this.itemId) {
      //     api = `/api/equipments/${this.itemId}`
      //     way = 'put'
      //   }
      //   this.itemData.params = this.params
      //   this.$http[way](api, this.itemData).then(response => {
      //     this.itemId = response.data.id
      //     this.checkResponse(response)
      //   })
      // },
      // isEdit() {
      //   try {
      //     this.itemData = JSON.parse(this.$route.query.data)
      //     this.params = this.itemData.params
      //     this.itemId = this.itemData.id
      //   } catch (e) {
      //
      //   }
      // },
      // paramsDelete(index) {
      //   this.params.splice(index, 1);
      // },
      // paramsAdd() {
      //   this.params.push({
      //     name: '',
      //     value: '',
      //   })
      // }
    },
    watch:{
      'itemId':function () {
        if(this.itemId){
          // alert(123)
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .steps {
    margin-bottom: 20px;

  }

  .text-input {
    display: none;
  }

  .text {
    display: block;
  }

  .current-row .text-input {
    display: block;
  }

  .current-row .text {
    display: none;
  }
</style>

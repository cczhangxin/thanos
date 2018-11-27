<template>
  <el-dialog :title="dialogTitle" :visible.sync="$store.state.common.showDialog" width="60%"
             :close-on-click-modal="false" :close-on-press-escape="false" @close="stepActive=0">
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
            <el-input size="small" class="text-input" v-model="scope.row[item.value]" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteRow(scope.$index, squareParts)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--新增部分-->
      <el-table :data="[1]">
        <el-table-column width="50"></el-table-column>
        <el-table-column v-for="(item,index) in squarePartsInfo" :key="index">
          <template slot-scope="scope">
            <el-input size="small" v-model="squarePart[item.value]" :placeholder="item.name" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="addRow(squarePart,squareParts);setCurrent()">新增</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--润滑卡片-->
    <div v-show="stepActive===2">
      <el-table :data="lubricatingCards" highlight-current-row ref="singleTable">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column v-for="(item,index) in lubricatingCardsInfo" :label="item.name" :key="index">
          <template slot-scope="scope">
            <span class="text">{{scope.row[item.value]}}</span>
            <el-input size="small" class="text-input" v-model="scope.row[item.value]" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteRow(scope.$index, lubricatingCards)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="[1]" style="width: 100%">
        <el-table-column width="50"></el-table-column>
        <el-table-column v-for="(item,index) in lubricatingCardsInfo" :key="index">
          <template slot-scope="scope">
            <el-input size="small" v-model="lubricatingCard[item.value]" :placeholder="item.name" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="addRow(lubricatingCard,lubricatingCards);setCurrent()">新增
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--设备参数-->
    <div v-show="stepActive===3">
      <el-table :data="parameters" highlight-current-row ref="singleTable1">
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column v-for="(item,index) in parametersInfo" :label="item.name" :key="index">
          <template slot-scope="scope">
            <span class="text">{{scope.row[item.value]}}</span>
            <el-input size="small" class="text-input" v-model="scope.row[item.value]" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="70">
          <template slot-scope="scope">
            <el-button size="small" type="danger" @click="deleteRow(scope.$index, parameters)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="[1]">
        <el-table-column width="50"></el-table-column>
        <el-table-column v-for="(item,index) in parametersInfo" :key="index">
          <template slot-scope="scope">
            <el-input size="small" v-model="parameter[item.value]" :placeholder="item.name" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column width="70">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="addRow(parameter,parameters)">新增</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="setCurrent;$store.state.common.showDialog=false" size="medium">取 消</el-button>
      <el-button v-show="stepActive" type="primary" @click="stepActive--;setCurrent()" size="medium">上一步</el-button>
      <el-button v-show="stepActive!==3" type="primary" @click="nexStep();setCurrent()" size="medium">下一步</el-button>
      <el-button v-show="stepActive===3" type="primary" @click="$store.state.common.showDialog=false" size="medium">完成
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        stepActive: 0,
        currentRow: null,
        dialogTitle: '新增设备台账',
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
        basicInformation: {
          companyId: "5b7f6b1ce7a4d48d1af01f56",
          name: "",
          specification: "",
          vendor: "",
          useTo: "",
        },
        //设备备件
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
        squarePartsInfo: [
          {
            name: '备件名称',
            value: 'name'
          },
          {
            name: '使用部位',
            value: 'installLocation'
          },
          {
            name: '规格型号',
            value: 'specifications'
          },
          {
            name: '单位',
            value: 'unit'
          },
          {
            name: '装机数量',
            value: 'initialAmount'
          },
          {
            name: '技术参数',
            value: 'technicalParameters'
          },
          {
            name: '其他',
            value: 'others'
          }
        ],
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
        lubricatingCardsInfo: [
          {
            name: '润滑部位',
            value: 'position'
          },
          {
            name: '润滑点数',
            value: 'amount'
          },
          {
            name: '润滑方式',
            value: 'type'
          },
          {
            name: '油品型号',
            value: 'oilSpecifications'
          },
          {
            name: '初装油量',
            value: 'initialOilAmount'
          },
          {
            name: '加油量',
            value: 'supplyOilAmount'
          },
          {
            name: '润滑周期',
            value: 'lubricatingPeriod'
          },
          {
            name: '标准温度',
            value: 'temperature'
          }
        ],
        //设备参数
        parameters: [],
        parameter: {
          "name": "",
          "value": "",
        },
        parametersInfo: [
          {
            name: '参数名称',
            value: 'name'
          }, {
            name: '参数值',
            value: 'value'
          }
        ],
      }
    },
    computed: {},
    created() {
    },
    mounted() {
    },
    methods: {
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
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      addRow(row, rows) {
        let obj = {}
        for (let key in row) {
          obj[key] = row[key]
        }
        rows.push(obj)
        for (let key in row) {
          row[key] = ''
        }
      }
    },
    watch: {
      'itemId': function () {
        if (this.itemId) {
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

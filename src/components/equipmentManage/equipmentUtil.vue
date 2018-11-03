<template>
  <div>
    <!--修改弹窗-->
    <el-dialog title="修改" :visible.sync="dialog" @close="getData()">
      <el-form v-if="tabActive==='squareParts'" ref="form" label-width="120px">
        <el-col :span="12">
          <el-form-item label="备件名称">
            <el-input v-model="activeData.name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用部位">
            <el-input v-model="activeData.installLocation" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格型号">
            <el-input v-model="activeData.specifications" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位">
            <el-input v-model="activeData.unit" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="装机数量">
            <el-input v-model="activeData.initialAmount" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="风险储备">
            <el-input v-model="activeData.riskyReserve" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="技术要求">
            <el-input v-model="activeData.technicalRequirement" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="技术参数">
            <el-input v-model="activeData.technicalParameters" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="其他">
            <el-input v-model="activeData.others" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <el-form v-if="tabActive==='lubricatingCards'" ref="form" label-width="120px">
        <el-col :span="12">
          <el-form-item label="润滑部位">
            <el-input v-model="activeData.position"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="润滑点数">
            <el-input v-model="activeData.amount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="润滑方式">
            <el-input v-model="activeData.type"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="油品型号">
            <el-input v-model="activeData.oilSpecifications"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="初装油量">
            <el-input v-model="activeData.initialOilAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="加油量">
            <el-input v-model="activeData.supplyOilAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标准油量">
            <el-input v-model="activeData.standardOilAmount"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="润滑周期">
            <el-input v-model="activeData.lubricatingPeriod"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="标准温度">
            <el-input v-model="activeData.temperature"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取消</el-button>
        <el-button type="primary" @click="editItem">确定</el-button>
      </div>
    </el-dialog>
    <el-tabs v-model="tabActive" @tab-click="getData">
      <!--设备备件-->
      <el-tab-pane label="设备备件" name="squareParts">
        <!--表格部分-->
        <el-table :data="squareParts" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="name" label="备件名称"></el-table-column>
          <el-table-column property="installLocation" label="使用部位"></el-table-column>
          <el-table-column property="specifications" label="规格型号"></el-table-column>
          <el-table-column property="unit" label="单位"></el-table-column>
          <el-table-column property="initialAmount" label="装机数量"></el-table-column>
          <el-table-column property="riskyReserve" label="风险储备"></el-table-column>
          <el-table-column property="technicalRequirement" label="技术要求"></el-table-column>
          <el-table-column property="technicalParameters" label="技术参数"></el-table-column>
          <el-table-column property="others" label="其他"></el-table-column>
          <el-table-column label="操作" width="150" v-if="data!=='detail'">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="dialog=true;activeData=scope.row">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--新增部分-->
        <el-table :data="[1]" style="width: 100%">
          <el-table-column width="50"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.name" placeholder="备件名称" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.installLocation" placeholder="使用部位" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.specifications" placeholder="规格型号" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.unit" placeholder="单位" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.initialAmount" placeholder="装机数量" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.riskyReserve" placeholder="风险储备" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.technicalRequirement" placeholder="技术要求" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.technicalParameters" placeholder="技术参数" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="squarePart.others" placeholder="其他" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-button size="medium" type="primary" @click="add('squarePart')">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <!--润滑卡片-->
      <el-tab-pane label="润滑卡片" name="lubricatingCards">
        <!--表格部分-->
        <el-table :data="lubricatingCards" style="width: 100%">
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="position" label="润滑部位"></el-table-column>
          <el-table-column property="amount" label="润滑点数"></el-table-column>
          <el-table-column property="type" label="润滑方式"></el-table-column>
          <el-table-column property="oilSpecifications" label="油品型号"></el-table-column>
          <el-table-column property="initialOilAmount" label="初装油量"></el-table-column>
          <el-table-column property="supplyOilAmount" label="加油量"></el-table-column>
          <el-table-column property="standardOilAmount" label="标准油量"></el-table-column>
          <el-table-column property="lubricatingPeriod" label="润滑周期"></el-table-column>
          <el-table-column property="temperature" label="标准温度"></el-table-column>
          <el-table-column label="操作" width="150" v-if="data!=='detail'">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="dialog=true;activeData=scope.row">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteItem(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--新增部分-->
        <el-table :data="[1]" v-if="data!=='detail'" style="width: 100%">
          <el-table-column width="50"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.position" placeholder="润滑部位" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.amount" placeholder="润滑点数" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.type" placeholder="润滑方式" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.oilSpecifications" placeholder="油品型号" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.initialOilAmount" placeholder="初装油量" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.supplyOilAmount" placeholder="加油量" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.standardOilAmount" placeholder="标准油量" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.lubricatingPeriod" placeholder="润滑周期" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-input v-model="lubricatingCard.temperature" placeholder="标准温度" clearable></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-button size="medium" type="primary" @click="add('lubricatingCard')">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tabActive: 'squareParts',
        activeData: '',
        dialog: false,
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
      }
    },
    components: {},
    props: ['data', 'itemData', 'itemId'],
    computed: {},
    created() {
      this.getData()
    },
    mounted() {

    },
    methods: {
      getData() {
        if (this.itemId) {
          this.$http.get(`/api/equipments/${this.itemId}/${this.tabActive}`).then(response => {
            this[this.tabActive] = response.data.items
          })
        }
      },
      editItem() {
        this.$http.put(`/api/equipments/${this.itemId}/${this.tabActive}/${this.activeData.id}`, this.activeData).then(response => {
          this.checkResponse(response)
          this.dialog = false
          this[this.tabActive] = response.data.items
          this.getData()
        })
      },
      deleteItem(row) {
        this.$confirm('是否确认删除！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.activeData = row
          this.$http.delete(`/api/equipments/${this.itemId}/${this.tabActive}/${this.activeData.id}`, this.activeData).then(response => {
            this.checkResponse(response,'删除成功')
            this[this.tabActive] = response.data.items
            this.getData()
          })
        }).catch(() => {
        })
      },
      add(item) {
        if (this.itemId) {
          this.$http.post(`/api/equipments/${this.itemId}/${this.tabActive}`, this[item]).then(response => {
            this.checkResponse(response)
            for(let key in this[item]){
              this[item]={}
              this[item][key]=''
            }
            this.getData()
          })
        } else {
          this.$message({
            message: '操作失败！',
            type: 'error'
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .info {
    margin-bottom: 40px;
  }

  .empty thead.has-gutter {
    display: none;
  }

  .add-box {
    margin-top: 20px;
    button {
      margin-top: 2px;
    }
  }
</style>

<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="设备备件" name="first">
        <el-table :data="sparePartsData" style="width: 100%">
          <el-table-column prop="name" label="备件名称"></el-table-column>
          <el-table-column prop="part" label="使用部位"></el-table-column>
          <el-table-column prop="type" label="规格型号"></el-table-column>
          <el-table-column prop="unit" label="单位"></el-table-column>
          <el-table-column prop="number" label="装机数量"></el-table-column>
          <el-table-column prop="parameter" label="技术参数"></el-table-column>
          <el-table-column prop="other" label="其他"></el-table-column>
          <el-table-column label="操作" width="150" v-if="data!=='detail'">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="partEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="partDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row :gutter="20" class="add-box" v-if="data!=='detail'">
          <el-col :span="3">
            <el-input v-model="sparePart.name" placeholder="备件名称"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="sparePart.part" placeholder="使用部位"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="sparePart.type" placeholder="规格型号"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="sparePart.unit" placeholder="单位"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="sparePart.number" placeholder="装机数量"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="sparePart.parameter" placeholder="技术参数"></el-input>
          </el-col>
          <el-col :span="3">
            <el-input v-model="sparePart.other" placeholder="其他"></el-input>
          </el-col>
          <el-col :span="3">
            <el-button size="medium" type="primary" @click="newSpareParts">新增</el-button>
          </el-col>
        </el-row>
        <el-dialog title="设备备件" :visible.sync="dialogFormVisible">
          <el-form>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="备件名称" :label-width="formLabelWidth">
                  <el-input v-model="sparePartsData[activeIndex].name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="使用部位" :label-width="formLabelWidth">
                  <el-input v-model="sparePartsData[activeIndex].part"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="规格型号" :label-width="formLabelWidth">
                  <el-input v-model="sparePartsData[activeIndex].type"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="单位" :label-width="formLabelWidth">
                  <el-input v-model="sparePartsData[activeIndex].unit"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="装机数量" :label-width="formLabelWidth">
                  <el-input v-model="sparePartsData[activeIndex].number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item label="技术参数" :label-width="formLabelWidth">
                  <el-input v-model="sparePartsData[activeIndex].parameter"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-form-item label="其他" :label-width="formLabelWidth">
                  <el-input v-model="sparePartsData[activeIndex].other"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="润滑卡片" name="second">
        <el-table :data="empty" style="width: 100%">
          <el-table-column prop="name" label="润滑部位"></el-table-column>
          <el-table-column prop="name" label="润滑点数"></el-table-column>
          <el-table-column prop="name" label="润滑方式"></el-table-column>
          <el-table-column prop="name" label="油品型号"></el-table-column>
          <el-table-column prop="name" label=" 初装油量"></el-table-column>
          <el-table-column prop="name" label="加油量"></el-table-column>
          <el-table-column prop="name" label="标准油量"></el-table-column>
          <el-table-column prop="name" label="润滑周期"></el-table-column>
          <el-table-column prop="name" label="标准温度"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="partEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="partDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="设备参数" name="third">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="备件名称">
          </el-table-column>
          <el-table-column prop="name" label="使用部位">
          </el-table-column>
          <el-table-column prop="name" label="规格型号">
          </el-table-column>
          <el-table-column prop="name" label="单位">
          </el-table-column>
          <el-table-column prop="name" label="装机数量">
          </el-table-column>
          <el-table-column prop="name" label="技术参数">
          </el-table-column>
          <el-table-column prop="name" label="其他">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="partEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="partDelete(scope.$index, scope.row)">删除</el-button>
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
        sparePartsData: [
          {
            name: '1',
            part: '2',
            type: '3',
            unit: '4',
            number: '5',
            parameter: '6',
            other: '7',
          },
          {
            name: '11',
            part: '22',
            type: '33',
            unit: '44',
            number: '55',
            parameter: '66',
            other: '77',
          }
        ],
        activeIndex: 0,
        // sparePartsData[activeIndex]: {
        //   name: '',
        //   part: '',
        //   type: '',
        //   unit: '',
        //   number: '',
        //   parameter: '',
        //   other: '',
        // },
        formLabelWidth: '120px',
        sparePart: {
          name: '',
          part: '',
          type: '',
          unit: '',
          number: '',
          parameter: '',
          other: '',
        },
        activeName: 'first',
        dialogFormVisible: false
      }
    },
    components: {},
    props: ['data'],
    computed: {},
    created() {

    },
    mounted() {
      console.log(this.$route.query)
    },
    methods: {
      partEdit(index, row) {
        this.activeIndex = index
        this.dialogFormVisible = true
      },
      partDelete(index, row) {
        this.sparePartsData.splice(index, 1)
      },
      newSpareParts() {
        this.sparePartsData.push(this.sparePart)
        this.sparePart = {
          name: '',
          part: '',
          type: '',
          unit: '',
          number: '',
          parameter: '',
          other: '',
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

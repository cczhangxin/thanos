<template>
  <div>
    <div class="item-box">
      <el-dialog title="设备参数" :visible.sync="parameterBox" width="50%" style="min-width: 600px;">
        <el-row :gutter="20" class="title">
          <el-col :span="9">
            设备参数名称
          </el-col>
          <el-col :offset="2" :span="9">
            参数值
          </el-col>
        </el-row>
        <el-row :gutter="20" v-for="(item,index) in parameterArr" class="item">
          <el-col :span="9">
            <el-input placeholder="设备参数名称" v-model="item.parameternName" style="width: 100%;"></el-input>
          </el-col>
          <el-col :span="2" style="text-align: center;line-height: 40px;">
            --
          </el-col>
          <el-col :span="9">
            <el-input placeholder="参数值" v-model="item.parameterNumber" style="width: 100%;"></el-input>
          </el-col>
          <el-col :span="3" :offset="1">
            <el-button type="danger" size="small" @click="parmeterDelete(index)">删除</el-button>
          </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="success" size="medium" @click="parameterAdd()">增加</el-button>
          <el-button @click="parameterBox = false">取 消</el-button>
          <el-button type="primary" @click="parameterBox = false">确 定</el-button>
        </div>
      </el-dialog>
      <el-form ref="form" :model="form" label-width="80px">
        <el-col :span="12">
          <el-form-item label="设备名称">
            <el-input placeholder="设备名称" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备编号">
            <el-input placeholder="设备编号" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格型号">
            <el-input placeholder="规格型号" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备分类">
            <el-input placeholder="设备分类" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产厂家">
            <el-input placeholder="设备名称" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="安装位置">
            <el-input placeholder="安装位置" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用部门">
            <el-input placeholder="使用部门" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备用途">
            <el-input placeholder="设备用途" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备参数">
            <el-button type="text" @click="parameterEdit()">编辑设备参数</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary">保存</el-button>
        </el-col>
      </el-form>
    </div>
    <div class="item-box">
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
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="partEdit(scope.$index, scope.row)">修改</el-button>
                <el-button size="mini" type="danger" @click="partDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row :gutter="20" class="add-box">
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
        <!--<el-tab-pane label="润滑卡片" name="second">-->
        <!--<el-table :data="empty" style="width: 100%">-->
        <!--<el-table-column prop="name" label="润滑部位"></el-table-column>-->
        <!--<el-table-column prop="name" label="润滑点数"></el-table-column>-->
        <!--<el-table-column prop="name" label="润滑方式"></el-table-column>-->
        <!--<el-table-column prop="name" label="油品型号"></el-table-column>-->
        <!--<el-table-column prop="name" label=" 初装油量"></el-table-column>-->
        <!--<el-table-column prop="name" label="加油量"></el-table-column>-->
        <!--<el-table-column prop="name" label="标准油量"></el-table-column>-->
        <!--<el-table-column prop="name" label="润滑周期"></el-table-column>-->
        <!--<el-table-column prop="name" label="标准温度"></el-table-column>-->
        <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button size="mini" type="success" @click="partEdit(scope.$index, scope.row)">修改</el-button>-->
        <!--<el-button size="mini" type="danger" @click="partDelete(scope.$index, scope.row)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="设备参数" name="third">-->
        <!--<el-table :data="tableData" style="width: 100%">-->
        <!--<el-table-column prop="name" label="备件名称">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="使用部位">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="规格型号">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="单位">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="装机数量">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="技术参数">-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="name" label="其他">-->
        <!--</el-table-column>-->
        <!--<el-table-column label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button size="mini" type="success" @click="partEdit(scope.$index, scope.row)">修改</el-button>-->
        <!--<el-button size="mini" type="danger" @click="partDelete(scope.$index, scope.row)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</el-table>-->
        <!--</el-tab-pane>-->
      </el-tabs>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        parameterBox: true,
        parameterQuantity: 0,
        parameterArr: [
          {
            parameternName: '',
            parameterNumber: ''
          }
        ],
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
    props: [],
    computed: {},
    mounted () {
    },
    methods: {
      parameterEdit () {
        this.parameterBox = true
      },
      parmeterDelete (i) {
        this.parameterArr.splice(i, 1);
        // this.parameterArr.filter((item, index) => {
        //   return i !== index
        // })
      },
      parameterAdd () {
        this.parameterQuantity++
        let obj = {}
        let key = 'parameternName' + this.parameterQuantity++
        let key1 = 'parameterNumber' + this.parameterQuantity++
        obj[key] = ''
        obj[key1] = ''
        this.parameterArr.push(obj)
      },
      partEdit (index, row) {
        this.activeIndex = index
        this.dialogFormVisible = true
      },
      partDelete (index, row) {
        this.sparePartsData.splice(index, 1)
      },
      newSpareParts () {
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
  .title {
    margin-bottom: 10px;
    .el-col-9 {
      font-weight: bold;
    }
  }

  .item {
    overflow: auto;
    margin-bottom: 10px;
  }
  .item-box{
    margin-bottom: 20px;
  }
  .add-box {
    margin-top: 20px;
    button {
      margin-top: 2px;
    }
  }
</style>

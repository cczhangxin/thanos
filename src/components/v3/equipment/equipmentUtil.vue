<template>
  <div>
    <el-tabs v-model="activeName">
      <!--设备备件-->
      <el-tab-pane label="设备备件" name="first">
        <!--表格部分-->
        <el-table :data="sparePartData" style="width: 100%">
          <el-table-column v-for="(value,key,index) in sparePart" :prop="key" :label="sparePartName[index]" :key="index"></el-table-column>
          <el-table-column label="操作" width="150" v-if="data!=='detail'">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="partEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="partDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--新增部分-->
        <el-table :data="[1]" v-if="data!=='detail'" style="width: 100%">
          <el-table-column v-for="(value,key,index) in sparePart" :key="index">
            <template slot-scope="scope">
              <el-input v-model="sparePart[key]" :placeholder="sparePartName[index]"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-button size="medium" type="primary" @click="newSpareParts">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--修改时弹窗部分-->
        <el-dialog title="设备备件" :visible.sync="sparePartsDialog">
          <el-form ref="form">
            <el-col :span="12" v-for="(value,key,index) in sparePart" :key="index">
              <el-form-item :label="sparePartName[index]" :label-width="formLabelWidth">
                <el-input v-model="activeData[key]"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="sparePartsDialog = false">取消</el-button>
            <el-button type="primary" @click="sparePartsDialog = false">确定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <!--润滑卡片-->
      <el-tab-pane label="润滑卡片" name="second">
        <!--表格部分-->
        <el-table :data="lubricationData" style="width: 100%">
          <el-table-column v-for="(value,key,index) in lubrication" :prop="key" :label="lubricationName[index]" :key="index"></el-table-column>
          <el-table-column label="操作" width="150" v-if="data!=='detail'">
            <template slot-scope="scope">
              <el-button size="mini" type="success" @click="lubricationEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="partDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--新增部分-->
        <el-table :data="[1]" v-if="data!=='detail'" style="width: 100%">
          <el-table-column v-for="(value,key,index) in lubrication" :key="index">
            <template slot-scope="scope">
              <el-input v-model="lubrication[key]" :placeholder="lubricationName[index]"></el-input>
            </template>
          </el-table-column>
          <el-table-column width="150">
            <template slot-scope="scope">
              <el-button size="medium" type="primary" @click="newLubrication">新增</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--修改时弹窗部分-->
        <el-dialog title="润滑卡片" :visible.sync="lubricationDialog">
          <el-form ref="form">
            <el-col :span="12" v-for="(value,key,index) in lubrication" :key="index">
              <el-form-item :label="lubricationName[index]" :label-width="formLabelWidth">
                <el-input v-model="activeData[key]"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="lubricationDialog = false">取消</el-button>
            <el-button type="primary" @click="lubricationDialog = false">确定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <!--设备参数-->
      <el-tab-pane label="设备参数" name="third">
        <el-table :data="lubricationData" style="width: 100%">
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
        formLabelWidth: '90px',
        activeName: 'first',
        activeData:'',
        //设备备件
        sparePartName: ['备件名称', '使用部位', '规格型号', '单位', '装机数量', '技术参数', '其他'],
        sparePartData: [
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
        sparePart: {
          name: '',
          part: '',
          type: '',
          unit: '',
          number: '',
          parameter: '',
          other: '',
        },
        sparePartsDialog: false,
        //润滑卡片
        lubricationName: ['润滑部位', '润滑点数', '润滑方式', '油品型号', '初装油量', '加油量', '标准油量', '润滑周期', '标准温度'],
        lubricationData: [
          {
            part: 1,
            count: 1,
            way: 1,
            type: 1,
            firstOil: 1,
            addOil: 1,
            norm: 1,
            period: 1,
            temperature: 1,
          },
          {
            part: 1,
            count: 1,
            way: 1,
            type: 1,
            firstOil: 1,
            addOil: 1,
            norm: 1,
            period: 1,
            temperature: 1,
          }
        ],
        lubrication: {
          part: '',
          count: '',
          way: '',
          type: '',
          firstOil: '',
          addOil: '',
          norm: '',
          period: '',
          temperature: '',
        },
        lubricationDialog: false,
      }
    },
    components: {},
    props: ['data'],
    computed: {},
    created() {

    },
    mounted() {
    },
    methods: {
      partEdit(index, row) {
        this.activeData = row
        this.sparePartsDialog = true
      },
      partDelete(index, row) {
        this.sparePartData.splice(index, 1)
      },
      lubricationEdit(index, row) {
        this.activeIndex = index
        this.lubricationDialog = true
      },
      lubricationDelete(index, row) {
        this.lubricationDialog.splice(index, 1)
      },
      newSpareParts() {
        this.sparePartData.push(this.sparePart)
        this.sparePart = {
          name: '',
          part: '',
          type: '',
          unit: '',
          number: '',
          parameter: '',
          other: '',
        }
      },
      newLubrication() {
        this.lubricationData.push(this.lubrication)
        this.lubrication = {
          part: '',
          count: '',
          way: '',
          type: '',
          firstOil: '',
          addOil: '',
          norm: '',
          period: '',
          temperature: '',
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

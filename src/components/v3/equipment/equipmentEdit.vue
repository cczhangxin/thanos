<template>
  <div>
    <el-dialog title="设备参数" :visible.sync="parameterBox" width="50%" style="min-width: 600px;">
      <el-row :gutter="20" class="title">
        <el-col :span="9">
          设备参数名称
        </el-col>
        <el-col :offset="2" :span="9">
          参数值
        </el-col>
      </el-row>
      <el-row :gutter="20" v-for="(item,index) in parameterArr" :key="index" class="item">
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
    <div class="item-box">
      <el-form ref="form" label-width="80px">
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
      <equipment-util></equipment-util>
    </div>
  </div>
</template>
<script>
  import equipmentUtil from '../equipment/equipmentUtil'
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
        ]
      }
    },
    components: {equipmentUtil},
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

<template>
  <div>
    <el-dialog title="编辑设备参数" :visible.sync="dialog" width="50%">
      <el-table :data="params" style="width: 100%">
        <el-table-column width="50"></el-table-column>
        <el-table-column label="设备参数名称">
          <template slot-scope="scope">
            <el-input v-model="scope.row.name" placeholder="设备参数名称" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column label="参数值">
          <template slot-scope="scope">
            <el-input v-model="scope.row.value" placeholder="参数值" clearable></el-input>
          </template>
        </el-table-column>
        <el-table-column width="150">
          <template slot-scope="scope">
            <el-button size="medium" type="danger" @click="paramsDelete(scope.$index)">删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="success" @click="paramsAdd">添 加</el-button>
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" @click="dialog = false">确 定</el-button>
      </div>
    </el-dialog>
    <div class="item-box">
      <el-form ref="form" label-width="100px">
        <el-col :span="12">
          <el-form-item label="设备名称">
            <el-input v-model="itemData.name" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备编号">
            <el-input v-model="itemData.number" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格型号">
            <el-input v-model="itemData.specification" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备分类">
            <el-select v-model="itemData.category" placeholder="请选择" clearable filterable>
              <el-option-group v-for="group in categoryOptions" :key="group.name" :label="group.name">
                <el-option v-for="item in group.children" :key="item.name" :label="item.name" :value="item.name">
                </el-option>
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="生产厂家">
            <el-input v-model="itemData.vendor" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备用途">
            <el-input v-model="itemData.useTo" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备参数">
            <el-button type="text" @click="dialog=true">编辑设备参数</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="">
            <el-button type="primary" @click="addEquipments">保存</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </div>
    <div class="item-box">
      <equipment-util :itemData="itemData" :itemId="itemId"></equipment-util>
    </div>
  </div>
</template>
<script>
  import equipmentUtil from '../equipment/equipmentUtil'

  export default {
    data() {
      return {
        dialog: false,
        itemData: {
          companyId: "5b7f6b1ce7a4d48d1af01f56",
          params: [],
          name: "",
          number: "",
          specification: "",
          category: "",
          vendor: "",
          useTo: "",
        },
        //设备参数
        params: [],
        itemId: '',
        categoryOptions: []
      }
    },
    components: {equipmentUtil},
    props: [],
    computed: {},
    created() {
      this.getCategory()
      this.isEdit()
    },
    mounted() {
    },
    methods: {
      getCategory() {
        this.$http.get('/api/categories').then(response => {
          this.categoryOptions = response.data
          // console.log(response.data)
        })
      },
      addEquipments() {
        let way = 'post'
        let api = '/api/equipments'
        if (this.itemId) {
          api = `/api/equipments/${this.itemId}`
          way = 'put'
        }
        this.itemData.params = this.params
        this.$http[way](api, this.itemData).then(response => {
          this.itemId = response.data.id
          this.checkResponse(response)
        })
      },
      isEdit() {
        try {
          this.itemData = JSON.parse(this.$route.query.data)
          this.params = this.itemData.params
          this.itemId = this.itemData.id
        } catch (e) {

        }
      },
      paramsDelete(index) {
        this.params.splice(index, 1);
      },
      paramsAdd() {
        this.params.push({
          name: '',
          value: '',
        })
      }
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

  .item-box {
    margin-bottom: 20px;
  }

  .add-box {
    margin-top: 20px;
    button {
      margin-top: 2px;
    }
  }
</style>

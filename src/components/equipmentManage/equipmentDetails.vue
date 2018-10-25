<template>
  <div>
    <div class="item-box">
      <el-table :data="[$route.query.data]" style="width: 100%" class="info">
        <el-table-column prop="name" label="设备名称"></el-table-column>
        <el-table-column prop="number" label="设备编号"></el-table-column>
        <el-table-column prop="type" label="规格型号"></el-table-column>
        <el-table-column prop="manufacturers" label="生产厂家"></el-table-column>
        <el-table-column prop="use" label="设备用途"></el-table-column>
        <el-table-column prop="parameter" label="主要参数"></el-table-column>
      </el-table>
      <equipment-util :data="'detail'"></equipment-util>
    </div>
  </div>
</template>

<script>
  import equipmentUtil from './equipmentUtil'

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
    components: {equipmentUtil},
    props: [],
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

  /*.empty thead.has-gutter {*/
  /*display: none;*/
  /*}*/

  /*.add-box {*/
  /*margin-top: 20px;*/
  /*button {*/
  /*margin-top: 2px;*/
  /*}*/
  /*}*/
</style>

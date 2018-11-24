<template>
    <el-form-item label="上级部门">
        <el-select v-model="departId" filterable placeholder="请选择" @change="optionchange">
            <el-option
                    v-for="item in departs"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
            </el-option>
        </el-select>
    </el-form-item>
</template>
<script>
    export default {
        name: 'departpicker',
        created() {
            this.loaddeparts()
        },
        props: ['companyId', 'departIdOuter', 'level'],
        data() {
            return {
                departs: [],
                departId: this.departIdOuter,
            }
        },
        watch: {
            departIdOuter (val) {
                this.departId = val
            }
        },
        methods: {

            optionchange(value) {
                this.$emit('changedata', value)
            },

            // 加载部门列表
            loaddeparts(level = 0) {
                let that = this;
                let url = '/api/departments?companyId=' + this.companyId;
                if(level){
                    url = url + '&level=' + level;
                }
                this.$http.get('/api/departments?companyId=' + this.companyId).then(
                    res => {
                        that.departs = res.data.items;
                    }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });
            }
        }
    }
</script>

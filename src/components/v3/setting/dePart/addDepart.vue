<template>
    <div class="item-box">
        <el-form ref="form" :model="form" label-width="80px" size="mini">
            <el-form-item label="部门名称" required>
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="部门电话" required>
                <el-input v-model="form.telephone"></el-input>
            </el-form-item>
            <departpicker company-id="5b7f6b1ce7a4d48d1af01f56" @changedata="selectParent" :departIdOuter="form.parent"></departpicker>
            <el-form-item label="备注">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="addDepart" v-if="!form.id">立即创建</el-button>
                <el-button type="primary" @click="editDepart" v-else>保存</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
<style>
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    import Departpicker from "../../../common/departpicker";
    export default {
        name: 'addDepart',
        components: {Departpicker},
        data() {
            return {
                form: {}
            }
        },
        mounted:function(){
            let id = this.$route.params.id;
            if(id){
                this.getDepartDetail(id);
            }
        },
        methods: {
            //添加部门
            addDepart() {
                this.form.companyId = '5b7f6b1ce7a4d48d1af01f56';
                let param = this.form;
                let that = this;
                this.$http.post('/api/departments', param
                ).then((res)=>{
                    that.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.$router.push({path:'/departManger'});
                }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });

            },
            //获取部门详情
            getDepartDetail(id){
                let that = this;
                this.$http.get('/api/departments/'+id
                ).then((res)=>{
                    that.form = res.data;
                    that.form.parent = that.form.parent? that.form.parent.id : '';
                }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });
            },
            editDepart(){
                let that = this;
                this.$http.put('/api/departments/'+that.form.id,that.form
                ).then((res)=>{
                    that.$message({
                        message: '修改成功',
                        type: 'success',
                        onClose: function(){
                            that.$router.push('/departManger');
                        }
                    });
                }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });
            },
            selectParent(val){
                this.form.parent = val;
                console.log(val);
            }

        }
    };
</script>
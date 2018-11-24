<template>
    <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
        <div class="item-box" style="margin: auto auto">
            <el-form ref="form" :model="form" label-width="80px" style="width:300px;" size="mini">
                <el-form-item label="部门名称" required>
                    <el-input v-model="form.name" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="部门编号" required>
                    <el-input v-model="form.departNum" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="部门电话" required>
                    <el-input v-model="form.telephone" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="部门级别" required>
                    <el-select v-model="form.departLevel" placeholder="请选择部门级别" size="mini">
                        <el-option v-for="item in form.departLevels" :label="item.name" :value="item.value"
                                   :key="item.value"></el-option>
                        <el-option value="" label="">
                            <li @click="addLevel"><span>增加部门级别</span></li>
                        </el-option>
                    </el-select>
                </el-form-item>
                <departpicker company-id="5b7f6b1ce7a4d48d1af01f56" @changedata="selectParent"
                              :departIdOuter="form.parent"
                              :level="form.departLevel"></departpicker>
                <el-form-item label="备注">
                    <el-input v-model="form.remark" size="mini"></el-input>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="addDepart" v-if="!form.id" size="mini">立即创建</el-button>
                    <el-button type="primary" size="mini" @click="editDepart" v-else>保存</el-button>
                </el-form-item>
            </el-form>
            <el-dialog :visible.sync="addLevelFormDia">
                <el-form :model="addLevelForm">
                    <el-form-item label="增加部门级别" :label-width="formLabelWidth">
                        <el-input v-model="addLevelForm.name" autocomplete="off" size="mini"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addLevelFormDia = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="addLevelFormDia = false" size="mini">确 定</el-button>
                </div>
            </el-dialog>
        </div>
    </el-dialog>
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
    import Departpicker from "../../common/departpicker";

    export default {
        name: 'addDepart',
        components: {Departpicker},
        data() {
            return {
                dialogFormVisible: false,
                form: {},
                addLevelFormDia: false,
                addLevelForm: {},
                formLabelWidth: '120px',
            }
        },
        created: function () {
            let id = this.$route.params.id;
            if (id) {
                this.getDepartDetail(id);
            }

            this.form.departLevels = this.getDepartLevel();
            console.log(this.form);
        },
        methods: {
            //添加部门
            addDepart() {
                this.form.companyId = '5b7f6b1ce7a4d48d1af01f56';
                let param = this.form;
                let that = this;
                this.$http.post('/api/departments', param
                ).then((res) => {
                    that.$message({
                        message: '添加成功',
                        type: 'success'
                    });
                    this.$router.push({path: '/departManger'});
                }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });

            },
            //获取部门详情
            getDepartDetail(id) {
                let that = this;
                this.$http.get('/api/departments/' + id
                ).then((res) => {
                    that.form = res.data;
                    that.form.parent = that.form.parent ? that.form.parent.id : '';
                }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });
            },
            editDepart() {
                let that = this;
                this.$http.put('/api/departments/' + that.form.id, that.form
                ).then((res) => {
                    that.$message({
                        message: '修改成功',
                        type: 'success',
                        onClose: function () {
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
            selectParent(val) {
                this.form.parent = val;
                console.log(val);
            },
            //部门级别接口
            getDepartLevel() {
                let level = new Array();
                level[0] = {'name': '一级', 'value': 1};
                level[1] = {'name': '二级', 'value': 2};
                level[2] = {'name': '三级', 'value': 3};
                level[3] = {'name': '四级', 'value': 4};

                return level;
            },
            //添加一个部门
            addLevel() {
                this.addLevelFormDia = true;
                // this.form.departLevel = '';
                // this.form.departLevels = [];
            },
        }
    };
</script>

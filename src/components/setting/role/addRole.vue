<template>
    <div class="item-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名称" prop="name">
                <el-input v-model="ruleForm.name" placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="权限分配" prop="region">
                <template>
                    <el-select v-model="ruleForm.permissions" placeholder="请选择" multiple size="medium">
                        <el-option-group
                                v-for="(item, index) in permissions"
                                :key="index"
                                :label="index">
                            <el-option
                                    v-for="im in item"
                                    :key="im.methodGenericString"
                                    :label="im.name"
                                    :value="im.methodGenericString">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </template>
            </el-form-item>
            <el-form-item label="活动性质" prop="type">
                <el-checkbox-group v-model="ruleForm.type">
                    <div>
                        <el-checkbox label="美食/餐厅线上活动" name="type" style="margin-left:30px;"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>

                        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                        <el-checkbox label="地推活动" name="type"></el-checkbox>
                        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                    </div>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="ruleForm.remark"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    export default {
        name: 'addRole',
        data() {
            return {
                permissions: {},
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    permissions: []
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    permissions: [
                        {required: true, message: '请选择权限', trigger: 'change'}
                    ],
                    date1: [
                        {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    ],
                    date2: [
                        {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    ],
                    type: [
                        {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    ],
                    resource: [
                        {required: true, message: '请选择活动资源', trigger: 'change'}
                    ],
                    remark: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                }
            }
        },
        mounted() {
            this.getPermissions();
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
                console.log(this.ruleForm);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            getPermissions() {
                let that = this;
                this.$http.get('/api/permissions').then((res) => {
                    that.permissions = res.data || {};
                }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });
            }
        }
    };
</script>
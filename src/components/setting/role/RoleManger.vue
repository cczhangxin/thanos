<template>
    <div class="item-box">
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>角色权限管理</el-breadcrumb-item>
        </el-breadcrumb>
        <header class="header-search">
            <el-button type="primary"  size="small" class="header-add-btn" @click="addRole">新建角色</el-button>
        </header>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="序号"
            >
            </el-table-column>
            <el-table-column
                    label="角色名称"
            >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="创建人"
            >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="创建时间"
            >
            </el-table-column>
            <el-table-column
                    label="备注"
            >
            </el-table-column>
            <el-table-column label="操作" style="width: 150px;">
                <template slot-scope="scope">
                    <el-button
                            size="small"
                            type="success"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="small"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="page"
                       background
                       layout="prev, pager, next"
                       :total="1000">
        </el-pagination>

        <el-dialog :title="editOrAdd? '编辑角色':'添加角色'" :visible.sync="dialogEditOrAddRole">
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
        </el-dialog>
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
        name: 'RoleManger',
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                dialogEditOrAddRole: false,
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                formInline: {
                    user: '',
                    region: ''
                },

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
            onSubmit() {
                console.log('submit!');
            },
            addRole(){
                this.dialogEditOrAddRole = true;
            },
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
<style scoped>
    .page {
        margin-top: 20px;
        text-align: right;
    }
</style>
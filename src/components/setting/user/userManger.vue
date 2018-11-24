<template>
    <div class="item-box">
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
        <header class="header-search">
            <el-input v-model="formInline.user" placeholder=" 请输入用户名称查询" size="small" clearable style="width: 180px;"></el-input>
            <el-button type="primary" @click="onSubmit" size="small" icon="el-icon-search">查询</el-button>
            <el-button type="primary" size="small" @click="dialogEditOrAddUser = true" class="header-add-btn">新建用户</el-button>
        </header>
        <el-table
                :data="tableData"
                style="width: 100%"
        >
            <el-table-column
                    label="序号"
            >
            </el-table-column>
            <el-table-column
                    label="登录名"
            >
            </el-table-column>
            <el-table-column
                    label="真实姓名"
            >
            </el-table-column>
            <el-table-column
                    label="所在部门"
            >
            </el-table-column>

            <el-table-column
                    label="所属角色"
            >
            </el-table-column>

            <el-table-column
                    label="状态"
            >
            </el-table-column>
            <el-table-column
                    label="创建人"
            >
            </el-table-column>
            <el-table-column
                    label="创建时间"
            >
            </el-table-column>
            <el-table-column label="操作"
                             fixed="right"
                             width="180"
            >
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

        <el-dialog :title="editOrAdd? '编辑用户':'添加用户'" :visible.sync="dialogEditOrAddUser">
            <div class="item-box">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入角色名称" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入真实姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入手机号号码" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="所在部门" prop="region">
                        <el-select v-model="ruleForm.region" placeholder="请选择部门" clearable>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属角色" prop="name">
                        <el-select v-model="ruleForm.region" placeholder="请选择角色" clearable>
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="状态" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="请输入状态" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="resource">
                        <el-input type="textarea" v-model="ruleForm.desc" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" size="small">立即创建</el-button>
                        <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
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
        name: 'userManger',
        data() {
            return {
                editOrAdd: false,
                dialogEditOrAddUser: false,
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    region: [
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
                    desc: [
                        {required: true, message: '请填写活动形式', trigger: 'blur'}
                    ]
                },
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
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            submitForm(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         alert('submit!');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
                let param = {
                    "companyId": "string",
                    "realname": "string",
                    "username": "string"
                };
                this.$http.post('/api/users',
                    {
                        params: param
                    }
                ).then(() => {

                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
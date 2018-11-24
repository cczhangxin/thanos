<template>
    <div class="item-box">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="formInline.user" placeholder=" 请输入用户名称查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                <el-button type="primary" plain>新建用户</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                style="width: 100%"
                max-height="250"
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
                            size="mini"
                            type="success"
                            @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button
                            size="mini"
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
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
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
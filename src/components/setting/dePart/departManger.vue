<template>
    <div class="item-box">
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>组织架构管理</el-breadcrumb-item>
        </el-breadcrumb>
        <header class="header-search">
            <el-input v-model="form.name" placeholder=" 请输入部门名称查询" size="mini" style="width: 180px;"></el-input>
            <el-button type="primary" @click="onSubmit" size="mini" icon="el-icon-search">查询</el-button>
            <el-button type="primary" size="mini" class="header-add-btn" @click="dialogFormVisible = true">新建部门</el-button>
        </header>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column prop="name"
                             label="部门名称"
            >
            </el-table-column>
            <el-table-column
                    label="部门电话" prop="telephone"
            >
            </el-table-column>
            <el-table-column prop="parent.name"
                             label="上级部门"
            >
            </el-table-column>
            <el-table-column prop="remark"
                             label="备注"
            >
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template slot-scope="scope">
                    <router-link :to="['editDepart/']+scope.row.id">
                        <el-button size="mini" type="success">编辑</el-button>
                    </router-link>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="table-pagination"
                @size-change="handlePageSizeChange"
                @current-change="curChange"
                :current-page="pagination.currentPage"
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.currentPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
        </el-pagination>

        <el-dialog title="添加部门" :visible.sync="dialogFormVisible">
            <div class="item-box">
                <el-form ref="form" :model="addForm" label-width="80px">
                    <el-form-item label="部门名称" required>
                        <el-input v-model="addForm.name" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="部门编号" required>
                        <el-input v-model="addForm.departNum" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="部门电话" required>
                        <el-input v-model="addForm.telephone" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="部门级别" required>
                        <el-select v-model="addForm.departLevel" placeholder="请选择部门级别" clearable>
                            <el-option v-for="item in addForm.departLevels" :label="item.name" :value="item.value"
                                       :key="item.value"></el-option>
                        </el-select>
                        <el-button @click="addLevel" title="增加部门级别">+</el-button>
                    </el-form-item>
                    <departpicker company-id="5b7f6b1ce7a4d48d1af01f56" @changedata="selectParent"
                                  :departIdOuter="form.parent"
                                  :level="form.departLevel"></departpicker>
                    <el-form-item label="备注">
                        <el-input v-model="form.remark" clearable></el-input>
                    </el-form-item>
                    <el-form-item size="large">
                        <el-button type="primary" @click="addDepart" v-if="!form.id" size="mini">立即创建</el-button>
                        <el-button type="primary" size="mini" @click="editDepart" v-else>保存</el-button>
                    </el-form-item>
                </el-form>
                <el-dialog :visible.sync="addLevelFormDia" append-to-body>
                    <el-form :model="addLevelForm">
                        <el-form-item label="部门级别" :label-width="formLabelWidth">
                            <el-input v-model="addLevelForm.name" autocomplete="off" clearable></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addLevelFormDia = false" size="mini">取 消</el-button>
                        <el-button type="primary" @click="addLevelFormDia = false" size="mini">确 定</el-button>
                    </div>
                </el-dialog>
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
    import pagination from '../../mixins/pagination';
    import Departpicker from "../../common/departpicker";

    export default {
        name: 'departManger',
        mounted: function () {
            this.getDeparts();
        },
        components: {Departpicker},
        mixins: [pagination],
        data() {
            const item = {};
            return {
                tableData: [],
                form: {
                    name: '',
                    page: 1,
                    size: 10,
                    companyId: "5b7f6b1ce7a4d48d1af01f56"
                },
                dialogFormVisible: false,

                addForm: {},
                addLevelFormDia: false,
                addLevelForm: {},
                formLabelWidth: '120px',
            }
        },
        created: function () {
            // let id = this.$route.params.id;
            // if (id) {
            //     this.getDepartDetail(id);
            // }
            //
            this.addForm.departLevels = this.getDepartLevel();
            // console.log(this.form);
        },
        methods: {
            onSubmit() {
                this.getDeparts();
            },
            getDeparts() {
                let that = this;
                that.form.page = that.form.page - 1;
                this.$http.get('/api/departments', {"params": that.form}).then(
                    res => {
                        that.tableData = res.data.items;
                        that.pagination.total = that.totalItems;
                        that.pagination.currentPageSize = that.form.size;
                        that.pagination.currentPage = that.form.page + 1;
                        that.pagination.total = res.data.totalItems;
                    }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });
            },
            handlePageSizeChange(pagesize) {
                this.pagination.pageNumber = pagesize;
                this.form.size = pagesize;
                this.getDeparts();
            },
            curChange(pageno) {
                this.form.page = pageno;
                this.getDeparts();
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                this.deleteDepart(row.id);
                this.getDeparts();
            },
            deleteDepart(id) {
                let that = this;
                this.$http.delete('/api/departments/' + id).then((res) => {
                    that.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    that.getDeparts();
                }).catch(function (error) {
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });
            },
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

        },
    };
</script>
<style scoped>
    .page {
        margin-top: 20px;
        text-align: right;
    }
</style>

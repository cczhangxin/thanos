<template>
    <div class="item-box">
        <el-form :inline="true" :model="form" class="demo-form-inline">
            <el-form-item label="">
                <el-input v-model="form.name" placeholder=" 请输入部门名称查询"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item style="float:right">
                    <router-link to="addDepart">
                        <el-button type="primary" plain>新建部门</el-button>
                    </router-link>
            </el-form-item>
        </el-form>
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
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <router-link :to="['editDepart/']+scope.row.id">
                        <el-button size="mini" type="success">编辑</el-button>
                    </router-link>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                class="page"
                @size-change="handlePageSizeChange"
                @current-change="curChange"
                :current-page="pagination.currentPage"
                :page-sizes="pagination.pageSizes"
                :page-size="pagination.currentPageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagination.total">
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
    import pagination from '../../mixins/pagination';
    export default {
        name: 'departManger',
        mounted:function(){
            this.getDeparts();
        },
        mixins: [pagination],
        data() {
            const item = {};
            return {
                tableData: [],
                totalitems: 0,
                form: {
                    name: '',
                    page:1,
                    size:10,
                    companyId:"5b7f6b1ce7a4d48d1af01f56"
                }
            }
        },
        methods: {
            onSubmit() {
                this.getDeparts();
            },
            getDeparts(){
                let that = this;
                that.form.page = that.form.page - 1;
                this.$http.get('/api/departments', {"params":that.form}).then(
                    res => {
                        that.tableData = res.data.items;
                        that.totalitems = parseInt(res.data.totalitems);
                        that.pagination.total = that.totalItems;
                        that.pagination.currentPageSize = that.form.size;
                        that.pagination.currentPage = that.form.page + 1;
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
            handleEdit (index, row) {
                console.log(index, row);
            },
            handleDelete (index, row) {
                this.deletDepart(row.id);
                this.getDeparts();
            },
            deletDepart(id){
                let that = this;
                this.$http.delete('/api/departments/'+id).then((res)=>{
                    that.$message({
                        message: '删除成功',
                        type: 'success'
                    });
                    that.getDeparts();
                }).catch(function(error){
                    that.$message({
                        message: error,
                        type: 'error'
                    });
                });
            }
        },
    };
</script>
<style scoped>
    .page{
        margin-top:20px;
        text-align: right;
    }
</style>

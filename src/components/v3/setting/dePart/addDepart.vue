<template>
    <div class="item-box">
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
            <el-form-item label="部门名称">
                <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="部门电话">
                <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>
            <el-form-item label="上级部门">
                <el-select v-model="sizeForm.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="sizeForm.name"></el-input>
            </el-form-item>
            <el-form-item size="large">
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
        name: 'addDepart',
        data() {
            return {
                sizeForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    };
</script>
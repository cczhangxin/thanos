<template>
    <div>
        <div style="margin: 20px;"></div>
        <el-form label-position="top" label-width="80px" :model="formLabelAlign">
            <el-form-item label="原密码">
                <el-input v-model="formLabelAlign.name" type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码">
                <el-input v-model="formLabelAlign.region" type="password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
                <el-input v-model="formLabelAlign.type" type="password"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        name: 'passwordManger',
        data() {
            return {
                labelPosition: 'right',
                formLabelAlign: {
                    name: '',
                    region: '',
                    type: ''
                }
            };
        }
    }
</script>
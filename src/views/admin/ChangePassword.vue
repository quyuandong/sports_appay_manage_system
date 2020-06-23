<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 基本操作
                </el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="120px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="原密码">
                        <el-input v-model="form.oldPassord" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.newPassord" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="form.newPassord2" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit">修改密码</el-button>
                        <el-button @click="handleReset">重置密码</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            form: {
                username: '张三',
                oldPassord: '123456',
                newPassord: '999999999',
                newPassord2: '999999999',
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$message.success('修改密码成功！');
        },
        handleReset() {
            this.$message.success('重置密码成功！');
        }
    }
};
</script>
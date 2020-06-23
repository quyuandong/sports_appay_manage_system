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
                    <el-form-item label="工号">
                        <el-input :value="userInfo.tno" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input :value="userInfo.name" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="原密码">
                        <el-input v-model="form.oldPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码">
                        <el-input v-model="form.newPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码">
                        <el-input v-model="form.newPassword2" type="password"></el-input>
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
import { updateTeacher, teacherModifyPassword } from '../../../api/teacher';
import { mapGetters } from 'vuex';
export default {
    name: 'studenModifyPassword',
    data() {
        return {
            form: {
                oldPassword: '123456',
                newPassword: '999999999',
                newPassword2: '999999999'
            }
        };
    },
    computed: {
        ...mapGetters(['userInfo'])
    },
    methods: {
        handleSubmit() {
            if (this.form.newPassword =='' || this.form.newPassword2=='') {
                this.$notify.error('密码不能为空');
                return;
            }
            if (this.form.newPassword !== this.form.newPassword2) {
                this.$notify.error('两次密码输入不一致');
                return;
            }
            let params = {
                id: this.userInfo.id,
                ...this.form
            };
            this.handleModifyPass(params);
        },
        handleReset() {
            let newPas = this.$cloneDeep(this.userInfo)
            newPas.password = '123456';
            this.handleUpChange(newPas);
        },

        //修改当前信息
        handleUpChange(row) {
            updateTeacher(row)
                .then(res => {
                    this.$message.success('操作成功');
                })
                .catch(err => {
                    this.$notify.err('操作失败');
                });
        },
        //修改密码
        handleModifyPass(row) {
            teacherModifyPassword(row)
                .then(res => {
                    this.$message.success('操作成功');
                })
                .catch(err => {
                    this.$notify.err('操作失败');
                });
        }
    }
};
</script>
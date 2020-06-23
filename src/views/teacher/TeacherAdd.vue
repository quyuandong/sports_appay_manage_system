<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 管理员管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="teacher" label-width="120px">
                    <el-form-item label="工号">
                        <el-input v-model="teacher.tno" placeholder="请输入工号"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名">
                        <el-input v-model="teacher.name" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系">
                        <el-select v-model="teacher.did" placeholder="请选择院系">
                            <el-option
                                v-for="item in departmentList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit">提交</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { findDepartmentByRelease } from '../../api/department';
import { addTeacher } from '../../api/teacher';

export default {
    name: 'teacherAdd',
    data() {
        return {
            teacher: {
                name: '孙立',
                tno:'',
                did: '',
            },
            departmentList: []
        };
    },
    created() {
        this.getAllDepartment();
    },
    methods: {
        handleSubmit() {
            console.log('this.teacher: ', this.teacher);
            addTeacher(this.teacher)
                .then(res => {
                    console.log('res: ', res);
                    this.$notify.success('添加成功');
                    this.handleReset();
                    this.$router.push('/teacherManage');
                })
                .catch(err => {
                    console.log('err: ', err);
                    this.$notify.error('添加失败');
                });
        },
        handleReset() {
            this.teacher.name = '';
            this.teacher.did = '';
        },
        //获得所有的启用的院系
        getAllDepartment() {
            findDepartmentByRelease()
                .then(res => {
                    this.departmentList = this.$get(res, 'data', []);
                })
                .catch(err => {
                    this.$notify.error('院系信息获取失败');
                });
        }
    }
};
</script>
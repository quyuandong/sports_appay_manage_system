<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 班级管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>班级添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="classGrade" label-width="120px">
                    <el-form-item label="班级名称">
                        <el-input v-model="classGrade.name" clearable placeholder="请输入班级名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系">
                        <el-input :value="departmentName" disabled placeholder="请选择院系"></el-input>
                        <!-- <el-select v-model="classGrade.did" disabled placeholder="请选择院系">
                            <el-option
                                v-for="item in departmentList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>-->
                    </el-form-item>
                    <el-form-item label="所属专业">
                        <el-select v-model="classGrade.sid" placeholder="请选择专业">
                            <el-option
                                v-for="item in specialtyList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级描述">
                        <el-input
                            v-model="classGrade.desc"
                            type="textarea"
                            :rows="6"
                            placeholder="请输入班级描述"
                        ></el-input>
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
import { addClassGrade } from '../../api/class';
import { getDepartmentAll } from '../../api/department';
import { findSpecialtyByReleaseAndDid } from '../../api/specialty';
import { mapGetters } from 'vuex';
export default {
    name: 'classGradeAdd',
    data() {
        return {
            classGrade: {
                name: '软件1602B',
                did: '',
                sid: '',
                desc: '我们是一个很团结友爱的班级'
            },
            departmentList: [],
            specialtyList: []
        };
    },
    created() {
        this.getAllDepartment();
        this.getAllSpecialty();
    },
    computed: {
        ...mapGetters(['currentDepartmentId']),
        departmentName() {
            let name = '';
            this.departmentList.forEach(item => {
                if (item.id === this.currentDepartmentId) {
                    this.classGrade.did = item.id;
                    name = item.name;
                    return;
                }
            });
            return name;
        }
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        handleSubmit() {
            addClassGrade(this.classGrade)
                .then(res => {
                    console.log('res: ', res);
                    this.$notify.success('添加成功');
                    this.handleReset();
                    this.$router.push('/classManage');
                })
                .catch(err => {
                    console.log('err: ', err);
                    this.$notify.error('添加失败');
                });
        },
        handleReset() {
            this.classGrade.name = '';
            this.classGrade.sid = '';
            this.classGrade.desc = '';
        },
        //获得所有的启用的院系
        getAllDepartment() {
            getDepartmentAll()
                .then(res => {
                    console.log('res: ', res);
                    this.departmentList = this.$get(res, 'data', []);
                })
                .catch(err => {
                    this.$notify.error('院系信息获取失败');
                });
        },

        //获得所有的启用的专业
        getAllSpecialty() {
            findSpecialtyByReleaseAndDid({did:this.currentDepartmentId})
                .then(res => {
                    console.log('res: ', res);
                    this.specialtyList = this.$get(res, 'data', []);
                })
                .catch(err => {
                    this.$notify.error('专业信息获取失败');
                });
        }
    }
};
</script>
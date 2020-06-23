<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 基本操作
                </el-breadcrumb-item>
                <el-breadcrumb-item>基本信息维护</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="forms" :model="student" :rules="rules" label-width="120px">
                    <el-form-item label="所属院系：" prop="did">
                        <el-input :value="departmentName" disabled placeholder="请选择院系"></el-input>
                    </el-form-item>
                    <el-form-item label="所属专业：" prop="sid">
                        <el-select v-model="student.sid" clearable disabled placeholder="请选择专业">
                            <el-option
                                v-for="item in specialyList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属班级：" prop="cid">
                        <el-select v-model="student.cid" clearable disabled placeholder="请选择班级">
                            <el-option
                                v-for="item in classList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学号：" prop="sno">
                        <el-input v-model="student.sno" disabled placeholder="学号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名：" placeholder="请输入姓名" prop="name">
                        <el-input v-model="student.name" disabled clearable></el-input>
                    </el-form-item>
                    <el-form-item label="性别：" prop="sex">
                        <el-radio v-model="student.sex" label="男">男</el-radio>
                        <el-radio v-model="student.sex" label="女">女</el-radio>
                    </el-form-item>
                    <el-form-item label="年龄：" prop="age">
                        <el-input v-model="student.age" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="联系方式：" prop="phone">
                        <el-input v-model="student.phone" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="身体状态：" prop="bodystate">
                        <el-input v-model="student.bodystate" clearable></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit">修 改</el-button>
                        <el-button @click="handleReset">重 置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { getDepartmentAll } from '../../../api/department';
import { findDepartmentByRelease } from '../../../api/department';
import { findSpecialtyByReleaseAndDid } from '../../../api/specialty';
import { findClassGradeByReleaseAndDidSid } from '../../../api/class';
import { updateStudent, studentModifyPassword } from '../../../api/student';
import { mapGetters } from 'vuex';
export default {
    name: 'baseform',
    data() {
        return {
            specialyList: [],
            classList: [],
            departmentList: [],
            student: {
                did: '',
                sid: '',
                cid: '',
                sno: '',
                name: '',
                sex: '',
                age: '',
                phone: '',
                bodystate: ''
            },
            rules: {
                did: [{ required: true, message: '请选择所属院系', trigger: 'change' }],
                sid: [{ required: true, message: '请选择所属专业', trigger: 'change' }],
                cid: [{ required: true, message: '请选择所属班级', trigger: 'change' }],
                sno: [
                    { required: true, message: '请输入学号', trigger: 'blur' },
                    { min: 8, max: 10, message: '长度在 8 到 10 个字符', trigger: 'blur' }
                ],
                name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
                sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
                age: [{ required: true, message: '请输入年龄', trigger: 'blur' }],
                phone: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
                bodystate: [{ required: true, message: '请输入身体状态', trigger: 'blur' }]
            }
        };
    },
    created() {
        Object.assign(this.student, this.userInfo);
        this.getAllDepartment();
        this.getAllSpecially({ did: this.currentDepartmentId });
        this.getAllClass({ did: this.currentDepartmentId, sid: this.userInfo.sid });
    },
    computed: {
        ...mapGetters(['currentDepartmentId', 'userInfo']),
        departmentName() {
            let name = '';
            this.departmentList.forEach(item => {
                if (item.id === this.currentDepartmentId) {
                    this.userInfo.did = item.id;
                    name = item.name;
                    return;
                }
            });
            return name;
        }
    },
    methods: {
        handleSubmit() {
            this.handleUpChange(this.student);
        },
        handleReset() {
            Object.assign(this.student, this.userInfo);
            this.handleUpChange(this.student);
        },
        //修改当前信息
        handleUpChange(row) {
            updateStudent(row)
                .then(res => {
                    this.$message.success('操作成功');
                })
                .catch(err => {
                    this.$notify.err('操作失败');
                });
        },
        //获得所有的启用的院系
        getAllDepartment() {
            getDepartmentAll()
                .then(res => {
                    this.departmentList = this.$get(res, 'data', []);
                })
                .catch(err => {
                    this.$notify.error('院系信息获取失败');
                });
        },
        //获得院系下面所有启用的专业
        getAllSpecially(params) {
            findSpecialtyByReleaseAndDid(params)
                .then(res => {
                    let data = this.$get(res, 'data', []);
                    this.specialyList = data;
                })
                .catch(err => {
                    this.$notify.error('专业信息获取失败');
                });
        },
        //获取专业下所有启用的班级
        getAllClass(params) {
            findClassGradeByReleaseAndDidSid(params)
                .then(res => {
                    let data = this.$get(res, 'data', []);
                    if (data.length === 0) {
                        this.$notify.warning('该专业下没有对应的班级');
                    }
                    this.classList = data;
                })
                .catch(err => {
                    this.$notify.error('院系信息获取失败');
                });
        }
    }
};
</script>
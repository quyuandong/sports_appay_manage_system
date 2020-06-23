<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="管理员注册" :visible.sync="editVisible" width="50%" :before-close="handleCancle">
        <div class="container">
            <el-form ref="forms" :model="teacher" :rules="rules" label-width="100px">
                <el-form-item label="工号" prop="tno">
                    <el-input v-model="teacher.tno" clearable placeholder="请输入工号"></el-input>
                </el-form-item>
                <el-form-item label="姓名" placeholder="请输入姓名" prop="name">
                    <el-input v-model="teacher.name" clearable></el-input>
                </el-form-item>
                <el-form-item label="所属院系" prop="did">
                    <el-select v-model="teacher.did" clearable placeholder="请选择院系">
                        <el-option
                            v-for="item in departmentList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="handleClick">注 册</el-button>
            <el-button type="primary" @click="handleReset">重 置</el-button>
            <el-button @click="handleCancle">取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { findDepartmentByRelease } from '../../api/department';
import { teacherRegister } from '../../api/user';
export default {
    name: 'teacherRegister',
    props: {
        editVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            departmentList: [],
            teacher: {
                name: '孙立',
                tno: '20200323',
                did: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                tno: [
                    { required: true, message: '请输入工号', trigger: 'blur' },
                    { min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur' },
                ],
                did: [{ required: true, message: '请选择所属院系', trigger: 'change' }]
            }
        };
    },
    created() {
        this.getAllDepartment();
    },
    methods: {
        handleClick() {
            this.$refs.forms.validate(valid => {
                if (valid) {
                    teacherRegister(this.teacher)
                        .then(res => {
                            if (res.data) {
                                this.$notify.success('注册成功,等待审核');
                                this.handleReset();
                                this.$emit('cancle', false);
                            } else {
                                this.$notify.error(res.msg);
                            }
                        })
                        .catch(err => {
                            this.$notify.error(err.msg);
                        });
                }else{
                    this.$message.error("数据校验失败，请检查之后重新提交")
                }
            });
        },
        handleCancle() {
            this.$emit('cancle', false);
        },
        handleReset() {
            this.teacher.tno = '';
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

<style scoped>
.dialog-footer {
    display: flex;
    justify-content: center;
}
</style>

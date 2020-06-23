<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="运动员注册" :visible.sync="editVisible" width="50%" :before-close="handleCancle">
        <div class="container">
            <el-form ref="forms" :model="student" :rules="rules" label-width="100px">
                <el-form-item label="所属院系：" prop="did">
                    <el-select v-model="student.did" clearable placeholder="请选择院系">
                        <el-option
                            v-for="item in departmentList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属专业：" prop="tid">
                    <el-select v-model="student.sid" clearable placeholder="请选择专业">
                        <el-option
                            v-for="item in specialyList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属班级：" prop="cid">
                    <el-select v-model="student.cid" clearable placeholder="请选择班级">
                        <el-option
                            v-for="item in classList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学号：" prop="sno">
                    <el-input v-model="student.sno" clearable placeholder="学号"></el-input>
                </el-form-item>
                <el-form-item label="姓名：" placeholder="请输入姓名" prop="name">
                    <el-input v-model="student.name" clearable></el-input>
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
import { findSpecialtyByReleaseAndDid } from '../../api/specialty';
import { findClassGradeByReleaseAndDidSid } from '../../api/class';
import { studentRegister } from '../../api/user';
export default {
    name: 'stuRegister',
    props: {
        editVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            departmentList: [],
            specialyList: [],
            classList: [],
            student: {
                did: '',
                sid: '',
                cid: '',
                sno: '1634120233',
                name: '张三',
                sex: '男',
                age: 18,
                phone: '15111111111',
                bodystate: '良好'
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
                bodystate: [{ required: true, message: '请输入身体状态', trigger: 'blur' }],

            }
        };
    },
    created() {
        this.getAllDepartment();
    },
    computed: {
      did(){
          return this.student.did
      },
       sid(){
          return this.student.sid
      }  
    },
    watch: {
        did(val){
            this.getAllSpecially({did:val})
        },
        sid(val){
            this.getAllClass({did:this.did,sid:val})
        }
    },
    methods: {
        handleClick() {
            this.$refs.forms.validate(valid => {
                if (valid) {
                    studentRegister(this.student)
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
                } else {
                    this.$message.error('数据校验失败，请检查之后重新提交');
                }
            });
        },
        handleCancle() {
            this.$emit('cancle', false);
        },
        handleReset() {
            this.student = {
                did: '',
                sid: '',
                cid: '',
                studentid: '',
                name: '',
                sex: '',
                age: '',
                phone: '',
                bodystate: ''
            };
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
        },
        //获得院系下面所有启用的专业
        getAllSpecially(params) {
            findSpecialtyByReleaseAndDid(params)
                .then(res => {
                    let data = this.$get(res, 'data', []);
                    if(data.length === 0){
                        this.$notify.warning('该院系下没有对应的专业')
                    }
                        
                    this.specialyList = data
                })
                .catch(err => {
                    this.$notify.error('院系信息获取失败');
                });
        },
        //获取专业下所有启用的班级
        getAllClass(params) {
            findClassGradeByReleaseAndDidSid(params)
                .then(res => {
                    let data = this.$get(res, 'data', []);
                    if(data.length === 0){
                        this.$notify.warning('该专业下没有对应的班级')
                    }
                    this.classList = data
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

<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">运动会报名管理系统</div>
            <el-form
                :model="param"
                :rules="rules"
                ref="logins"
                label-width="80px"
                class="ms-content"
                label-position="right"
            >
                <el-form-item prop="role" label="身份">
                    <el-select v-model="param.role" clearable placeholder="请选择登陆身份...">
                        <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="param.username" clearable placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        clearable
                        @keyup.enter.native="submitForm()"
                    ></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                    <el-button @click="handleReset()">重置</el-button>
                </div>
                <div class="ms-foot">
                    没有账号？ 请先去
                    <el-button type="text" @click="handleRegister">注册账号</el-button>
                </div>
            </el-form>
        </div>

        <!-- 注册身份弹出框 -->
        <el-dialog
            title="注册身份选择"
            :visible.sync="showIdCheck"
            width="30%"
            :before-close="handleCancle"
        >
            注册身份：
            <el-select v-model="registerRole" class="mr10" clearable placeholder="请选择注册身份">
                <el-option
                    v-for="item in statusOptions"
                    :key="item.id"
                    :label="item.label"
                    :value="item.value"
                ></el-option>
            </el-select>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleCheck" :disabled="!registerRole">确 定</el-button>
                <el-button @click="handleCancle">取 消</el-button>
            </span>
        </el-dialog>

        <!-- 教室注册 -->
        <teacher-register
            v-if="editVisible && registerRole==='1'"
            @cancle="editVisible=false;registerRole=''"
            :editVisible="editVisible"
        ></teacher-register>

        <!-- 运动员注册注册 -->
        <student-register
            v-if="editVisible && registerRole==='0'"
            @cancle="editVisible=false;registerRole=''"
            :editVisible="editVisible"
        ></student-register>
    </div>
</template>

<script>
import { login } from '../../api/user';
import { mapMutations } from 'vuex';
import TeacherRegister from './TeacherRegister';
import StudentRegister from './StudentRegister';
export default {
    data() {
        return {
            param: {
                role: 'A',
                username: 'admin',
                password: '123456'
            },
            registerRole: '',
            options: [
                {
                    value: 'A',
                    label: '超级管理员'
                },
                {
                    value: 'T',
                    label: '管理员'
                },
                {
                    value: 'S',
                    label: '运动员'
                }
            ],
            showIdCheck: false,
            editVisible: false,
            statusOptions: [
                {
                    value: '1',
                    label: '管理员'
                },
                {
                    value: '0',
                    label: '运动员'
                }
            ],
            rules: {
                role: [{ required: true, message: '请选择身份', trigger: 'change' }],
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 5,max: 25,message: '长度在 5 到 25个字符'},
                    { pattern: /^(\w){5,25}$/, message: '只能输入字母、数字、下划线' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5,max: 25,message: '长度在 5 到 25个字符'},
                    { pattern: /^(\w){5,25}$/, message: '只能输入字母、数字、下划线' }
                ]
            }
        };
    },
    methods: {
        ...mapMutations(['SET_USER_INFO', 'SET_CURRENT_TYPE']),
        submitForm() {
            this.$refs.logins.validate(valid => {
                if (valid) {
                    login(this.param).then(res => {
                        console.log('res: ', res);
                        if (res.status) {
                            if(res.data.release == '0'){
                                this.$notify.error("当前账号还未启用，请联系管理员")
                                return
                            }
                            if (res.data.approver == '1') {
                                this.SET_USER_INFO(res.data);
                                this.SET_CURRENT_TYPE(this.param.role);
                                console.log('this.param.role: ', this.param.role);
                                this.$message.success('登录成功');
                                localStorage.setItem('user_info', JSON.stringify(res.data));
                                this.$router.push('/');
                            }else{
                                this.$notify.error("当前账号还未审核，请审核之后登陆")
                            }
                        } else {
                            this.$message.error(res.msg);
                        }
                    });
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        //重置信息
        handleReset() {
            this.param.role = '';
            this.param.username = '';
            this.param.password = '';
        },
        //注册账号
        handleRegister() {
            this.showIdCheck = true;
            this.editVisible = false;
            this.registerRole = '';
        },
        //选择身份确定
        handleCheck() {
            console.log(this.registerRole, '---------');

            this.editVisible = true;
            this.showIdCheck = false;
        },
        //选择身份取消
        handleCancle() {
            this.showIdCheck = false;
            this.registerRole = '';
            this.editVisible = false;
        }
    },
    components: {
        TeacherRegister,
        StudentRegister
    }
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-image: url(../../assets/img/login-bg.jpg);
    background-size: 100%;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: rgb(71, 88, 247);
    border-bottom: 1px solid #ddd;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
}
.ms-content {
    padding: 30px 30px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    /* width: 100%; */
    height: 36px;
    margin-bottom: 10px;
}
.login-tips {
    font-size: 12px;
    line-height: 30px;
    color: #fff;
}
.ms-foot {
    font-size: 12px;
    margin-left: 45%;
}
</style>
<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChage">
            <i v-if="!collapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
        </div>
        <div class="logo">运动会报名管理系统</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 全屏显示 -->
                <div class="btn-fullscreen" @click="handleFullScreen">
                    <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
                        <i class="el-icon-rank"></i>
                    </el-tooltip>
                </div>
                <!-- 消息中心 -->
                <div class="btn-bell">
                    <el-tooltip
                        effect="dark"
                        :content="message?`有${message}条未读消息`:`消息中心`"
                        placement="bottom"
                    >
                        <router-link to="/systemInform">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
                <!-- 用户头像 -->
                <!-- <div class> -->
                <el-upload
                    class="user-avator"
                    action="api/common/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                </el-upload>
                <!-- </div> -->
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item divided command="myInfo">个人信息</el-dropdown-item>
                        <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <!-- 超级管理员编辑弹出框 -->
        <el-dialog title="个人信息" :visible.sync="editVisible" v-if="currentRole=='A'" width="50%">
            <el-form ref="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input :value="userInfo.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-input :value="userInfo.create_time" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
            </span>
        </el-dialog>

        <!-- 管理员弹框 -->
        <teacher-dialog
            v-if="editVisible&&currentRole=='T'"
            @cancle="editVisible=false;"
            :teacher="userInfo"
            :editVisible="editVisible"
        ></teacher-dialog>

        <!-- 运动员弹框 -->
        <student-dialog
            v-if="editVisible&&currentRole=='S'"
            @cancle="editVisible=false;"
            :student="userInfo"
            :editVisible="editVisible"
        ></student-dialog>
    </div>
</template>
<script>
import bus from '../common/bus';
import { mapGetters, mapMutations } from 'vuex';
import TeacherDialog from '../../views/teacher/TeacherDialog.vue';
import StudentDialog from '../../views/student/StudentDialog.vue';
import { uploadImage, updateAdmin } from '../../api/user';
import { updateTeacher } from '../../api/teacher';
import { updateStudent } from '../../api/student';
export default {
    data() {
        return {
            collapse: false,
            fullscreen: false,
            name: 'linxin',
            message: 2,
            editVisible: false,
            // 图片上传相关
            imageUrl: ''
        };
    },
    components: {
        TeacherDialog,
        StudentDialog
    },
    computed: {
        ...mapGetters(['userInfo', 'currentRole']),
        username() {
            return this.userInfo.name || this.userInfo.username;
        }
    },
    methods: {
        ...mapMutations(['SET_USER_INFO']),
        // 用户名下拉菜单选择事件
        handleCommand(command) {
            if (command == 'loginout') {
                localStorage.removeItem('user_info');
                this.$router.push('/login');
            }
            if (command == 'myInfo') {
                this.editVisible = true;
            }
        },
        // 侧边栏折叠
        collapseChage() {
            this.collapse = !this.collapse;
            bus.$emit('collapse', this.collapse);
        },
        // 全屏事件
        handleFullScreen() {
            let element = document.documentElement;
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen();
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen();
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen();
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen();
                }
            }
            this.fullscreen = !this.fullscreen;
        },
        //图片上传相关的事件
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
            this.changeUrl(res.data.url)
        },
        changeUrl(url) {
            let newUserInfo = this.$cloneDeep(this.userInfo)
            newUserInfo.icon = url
            this.SET_USER_INFO(newUserInfo)
            let params = {
                id:this.userInfo.id,
                icon:url
            }
            switch (this.currentRole) {
                case 'A':
                    this.updateAdminInfo(params)
                    break;
                case 'T':
                    this.updateTeacherInfo(params)
                    break;
                case 'S':
                    this.updateStudentInfo(params)
                    break;
            }
        },

        updateAdminInfo(row) {
            updateAdmin(row)
                .then(res => {
                    this.$notify.success('图片上传成功');
                })
                .catch(err => {
                    this.$notify.error('图片上传失败');
                });
        },
        updateTeacherInfo(row) {
            updateTeacher(row)
                .then(res => {
                    this.$notify.success('图片上传成功');
                })
                .catch(err => {
                    this.$notify.error('图片上传失败');
                });
        },
        updateStudentInfo(row) {
            updateStudent(row)
                .then(res => {
                    this.$notify.success('图片上传成功');
                })
                .catch(err => {
                    this.$notify.error('图片上传失败');
                });
        },

        beforeAvatarUpload(file) {
            const isJPG = /^image/.test(file.type);
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    },
    created() {
        this.imageUrl = this.userInfo.icon?this.userInfo.icon: require('../../assets/img/img.jpg')
    },
    mounted() {
        if (document.body.clientWidth < 1000) {
            this.collapseChage();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
}
.collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}

.user-avator {
    margin-left: 20px;
}
.user-avator /deep/ .el-upload--text {
    width: 40px;
    height: 40px;
    border: 0;
    border-radius: 50%;
}
.user-avator img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.crop-input {
    position: absolute;
    width: 40px;
    height: 40px;
    right: 105px;
    top: 10px;
    opacity: 0;
    cursor: pointer;
    border: 2px red solid;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>

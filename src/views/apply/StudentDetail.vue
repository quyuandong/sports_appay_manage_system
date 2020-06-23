<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="运动员信息" :visible.sync="editVisible" width="40%">
        <el-form ref="form" :model="info" label-width="120px">
            <el-form-item label="院系：">
                <el-input :value="info.department" disabled></el-input>
            </el-form-item>
            <el-form-item label="专业：">
                <el-input :value="info.major" disabled></el-input>
            </el-form-item>
            <el-form-item label="学号：">
                <el-input :value="info.studentId" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
                <el-input :value="info.name" disabled></el-input>
            </el-form-item>
            <el-form-item label="性别：">
                <el-radio v-model="info.sex"  disabled label="男">男</el-radio>
                <el-radio v-model="info.sex"  disabled label="女">女</el-radio>
            </el-form-item>
            <el-form-item label="年龄：">
                <el-input :value="info.age" disabled></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
                <el-input :value="info.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="身体状态：">
                <el-input :value="info.bodyState" disabled></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleCancle">取消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'studentDetail',
    props: {
        // info: {
        //     require: false,
        //     type: Object
        // },
        editVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            info: {
                department: '信息工程学院',
                major: '软件工程',
                studentId: '1634120233',
                name: '张三',
                sex: '男',
                age: 18,
                phone: '15111111111',
                bodyState: '良好'
            }
        };
    },
    methods: {
        handleCancle() {
            this.$emit('cancle', false);
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

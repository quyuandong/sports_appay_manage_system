<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="信息详情" :visible.sync="editVisible" width="50%" :before-close="handleCancle" >
        <div class="container">
            <el-form ref="form" :model="teacher" label-width="120px">
                 <el-form-item label="工号">
                        <el-input v-model="teacher.tno" :disabled='!edit' placeholder="请输入工号"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名">
                        <el-input v-model="teacher.name" :disabled='!edit'></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系">
                        <el-select v-model="teacher.did" :disabled='!edit' placeholder="请选择院系">
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
            <el-button type="primary" @click="handleClick" v-if="edit" >确 定</el-button>
            <el-button  @click="handleCancle" >取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
import { findDepartmentByRelease } from '../../api/department';
export default {
    name: 'teacherDialog',
    props: {
        teacher: {
            require: true,
            type: Object
        },
        editVisible: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            departmentList: []
        }
    },
    created () {
      this.getAllDepartment()  
    },
    methods: {
        handleClick(){
            this.$emit('edit',this.teacher)
        },
        handleCancle() {
            this.$emit('cancle', false);
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
.dialog-footer{
    display: flex;
    justify-content: center;
}
</style>

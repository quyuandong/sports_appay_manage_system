<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="班级详情" :visible.sync="editVisible" width="70%" :before-close="handleCancle" >
        <div class="container">
            <el-form ref="form" :model="classGrade" label-width="120px">
                    <el-form-item label="班级名称">
                        <el-input v-model="classGrade.name" :disabled='!edit'></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系">
                        <el-input :value="classGrade.departmentName" disabled placeholder="请选择院系"></el-input>
                    </el-form-item>
                    <el-form-item label="所属专业">
                        <el-select v-model="classGrade.sid" placeholder="请选择专业" :disabled='!edit'>
                            <el-option
                                v-for="item in specialtyList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="班级简介">
                        <el-input
                            v-model="classGrade.desc"
                            type="textarea"
                            :rows="6"
                            placeholder="请输入班级描述"
                            :disabled='!edit'
                        ></el-input>
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
import { findSpecialtyByReleaseAndDid } from '../../api/specialty';

export default {
    name: 'classDialog',
    props: {
        classGrade: {
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
            specialtyList:[]
        }
    },
    created () {
        this.getAllSpecialty()
    },
    methods: {
        handleClick(){
            this.$emit('edit',this.classGrade)
        },
        handleCancle() {
            this.$emit('cancle', false);
        },
        //获得所有的启用的院系
        getAllSpecialty() {
            findSpecialtyByReleaseAndDid({did:this.classGrade.did})
                .then(res => {
                    this.specialtyList = this.$get(res, 'data', []);
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

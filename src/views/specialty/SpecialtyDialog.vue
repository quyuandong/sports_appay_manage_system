<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="专业详情" :visible.sync="editVisible" width="70%" :before-close="handleCancle" >
        <div class="container">
            <el-form ref="form" :model="specialty" label-width="120px">
                    <el-form-item label="专业名称">
                        <el-input v-model="specialty.name" :disabled='!edit'></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系">
                        <el-input :value="specialty.departmentName" disabled placeholder="请选择院系"></el-input>
                    </el-form-item>
                    <el-form-item label="专业简介">
                        <quill-editor ref="myTextEditor" v-model="specialty.desc" :disabled='!edit'></quill-editor>
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
import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'specialtyDialog',
    props: {
        specialty: {
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
    methods: {
        handleClick(){
            this.$emit('edit',this.specialty)
        },
        handleCancle() {
            this.$emit('cancle', false);
        }
    },
    components: {
        quillEditor
    }
};
</script>

<style scoped>
.dialog-footer{
    display: flex;
    justify-content: center;
}
</style>

<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="信息详情" :visible.sync="editVisible" width="70%" :before-close="handleCancle" >
        <div class="container">
            <el-form ref="form" :model="department" label-width="120px">
                    <el-form-item label="院系名称">
                        <el-input v-model="department.name" :disabled='!edit'></el-input>
                    </el-form-item>
                    <el-form-item label="院系地址">
                        <el-input v-model="department.address" :disabled='!edit'></el-input>
                    </el-form-item>
                    <el-form-item label="院系简介">
                        <quill-editor ref="myTextEditor" v-model="department.desc" :disabled='!edit'></quill-editor>
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
    name: 'departmentDialog',
    props: {
        department: {
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
            this.$emit('edit',this.department)
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

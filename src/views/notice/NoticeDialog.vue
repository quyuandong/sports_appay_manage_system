<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="公告详情" :visible.sync="editVisible" width="70%" :before-close="handleCancle" >
        <div class="container">
            <div class="plugins-tips">
                <el-input v-model="nodtice.title" :disabled='!edit'></el-input>
            </div>
            <quill-editor ref="myTextEditor" v-model="nodtice.content" :disabled='!edit'></quill-editor>
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
    name: 'noticeDialog',
    props: {
        nodtice: {
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
            this.$emit('edit',this.nodtice)
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

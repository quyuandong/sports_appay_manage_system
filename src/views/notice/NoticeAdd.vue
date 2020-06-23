<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 公告管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加公告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="plugins-tips">
                <el-input placeholder="请输入公告标题" v-model="notice.title"></el-input>
            </div>
            <quill-editor
                ref="myTextEditor"
                @change="onEditorChange"
                v-model="notice.content"
                :options="editorOptions"
            ></quill-editor>
            <el-button
                class="editor-btn"
                type="primary"
                icon="el-icon-check"
                @click="handleSubmit"
            >提交</el-button>
            <el-button
                class="editor-btn"
                type="primary"
                icon="el-icon-refresh-right"
                @click="handleReset"
            >重置</el-button>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import { editorOptions } from '../../utils/editor-config';
import { addNotice } from '../../api/notice';
export default {
    name: 'editor',
    data: function() {
        return {
            notice: {
                title: '运动会开幕通知',
                content: '运动会开幕通知运动会开幕通知运动会开幕通知运动会开幕通知',
            },
            editorOptions: editorOptions
        };
    },
    components: {
        quillEditor
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        handleSubmit() {
            addNotice(this.notice)
                .then(res => {
                    console.log('res: ', res);
                    this.$notify.success('添加成功');
                    this.handleReset();
                    this.$router.push('/noticeManage');
                })
                .catch(err => {
                    console.log('err: ', err);
                    this.$notify.error('添加失败');
                });
        },
        handleReset() {
            this.notice.title = '';
            this.notice.content = '';
        }
    }
};
</script>
<style scoped>
.editor-btn {
    margin-top: 20px;
}
</style>
<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 院系管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>学院院系项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="department" label-width="120px">
                    <el-form-item label="院系名称">
                        <el-input v-model="department.name" placeholder="请输入院系名称"></el-input>
                    </el-form-item>
                    <el-form-item label="院系地址">
                        <el-input v-model="department.address" placeholder="请输入院系地址"></el-input>
                    </el-form-item>
                    <el-form-item label="院系简介">
                        <quill-editor
                            ref="myTextEditor"
                            @change="onEditorChange"
                            v-model="department.desc"
                            :options="editorOptions"
                        ></quill-editor>
                        <!-- <el-input v-model="department.desc" type="textarea" :rows="6" placeholder="请输入院系简介"></el-input> -->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit">提交</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor';
import { addDepartment } from '../../api/department';
import { editorOptions } from '../../utils/editor-config';
export default {
    name: 'departmentAdd',
    data() {
        return {
            department: {
                name: '信息工程学院',
                address: '学院北区一号楼',
                desc: '信息工程学院是一个全新，全信息化的，全方位服务的一个院系'
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
            addDepartment(this.department)
                .then(res => {
                    console.log('res: ', res);
                    this.$notify.success('添加成功');
                    this.handleReset();
                    this.$router.push('/departmentManage');
                })
                .catch(err => {
                    console.log('err: ', err);
                    this.$notify.error('添加失败');
                });
        },
        handleReset() {
            this.department.name = '';
            this.department.address = '';
            this.department.desc = '';
        }
    }
};
</script>
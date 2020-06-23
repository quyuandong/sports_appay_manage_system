<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 专业管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>专业添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="specialty" label-width="120px">
                    <el-form-item label="专业名称">
                        <el-input v-model="specialty.name" clearable placeholder="请输入专业名称"></el-input>
                    </el-form-item>
                    <el-form-item label="所属院系">
                        <el-input :value="departmentName" disabled placeholder="请选择院系"></el-input>
                        <!-- <el-select v-model="specialty.did" disabled placeholder="请选择院系">
                            <el-option
                                v-for="item in departmentList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                            ></el-option>
                        </el-select> -->
                    </el-form-item>
                    <el-form-item label="专业简介">
                        <quill-editor
                            ref="myTextEditor"
                            @change="onEditorChange"
                            v-model="specialty.desc"
                            :options="editorOptions"
                        ></quill-editor>
                        <!-- <el-input v-model="specialty.desc" type="textarea" :rows="6" placeholder="请输入专业简介"></el-input> -->
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
import { addSpecialty } from '../../api/specialty';
import { getDepartmentAll } from '../../api/department';
import { editorOptions } from '../../utils/editor-config';
import { mapGetters } from 'vuex';
export default {
    name: 'specialtyAdd',
    data() {
        return {
            specialty: {
                name: '软件工程',
                did: "",
                desc: '软件工程是一个工程'
            },
            editorOptions: editorOptions,
            departmentList: []
        };
    },
    components: {
        quillEditor
    },
    created() {
        this.getAllDepartment();
    },
    computed:{
        ...mapGetters(['currentDepartmentId']),
        departmentName(){
            let name = '';
            this.departmentList.forEach(item => {
                if (item.id === this.currentDepartmentId) {
                    this.specialty.did = item.id
                    name = item.name;
                    return;
                }
            });
            return name;
        }
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        handleSubmit() {
            addSpecialty(this.specialty)
                .then(res => {
                    this.$notify.success('添加成功');
                    this.handleReset();
                    this.$router.push('/specialtyManage');
                })
                .catch(err => {
                    console.log('err: ', err);
                    this.$notify.error('添加失败');
                });
        },
        handleReset() {
            this.specialty.name = '';
            this.specialty.desc = '';
        },
        //获得所有的启用的院系
        getAllDepartment() {
            getDepartmentAll()
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
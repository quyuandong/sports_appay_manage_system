<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 详情信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <h2>{{titles}}</h2>
            </div>
            <hr>
            <div v-html="contents"></div>
        </div>
    </div>
</template>

<script>
import { findTeacherByApprover, updateTeacher, deleteTeacher } from '../../api/teacher';
import { getDepartmentAll } from '../../api/department';
export default {
    name: 'editorDetail',
    props: {
        title: {
            type: String
        },
        content: {
            type: String
        }
    },
    data() {
        return {
            route_title: '',
            route_content: ''
        };
    },
    computed: {
        titles() {
            return this.route_title ? this.route_title : this.title;
        },
        contents() {
            return this.route_content ? this.route_content : this.content;
        }
    },
    created() {
        this.route_title = this.$route.query.row.title;
        console.log('this.route_title: ', this.route_title);
        this.route_content = this.$route.query.row.content;
        console.log('this.route_content: ', this.route_content);
    }
};
</script>

<style scoped>
.handle-box {
    text-align: center;
    color: #3e7aeb;
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>

<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 项目报名审核
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select v-model="query.approver" class="mr10" @clear='handleSearch' clearable placeholder="请选择审核状态">
                    <el-option
                        v-for="item in statusOptions"
                        :key="item.id"
                        :label="item.label"
                        :value="item.value"
                    ></el-option>
                </el-select>
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    :disabled="query.approver ==''"
                    @click="handleSearch"
                >搜索</el-button>
                <el-button
                    icon="el-icon-refresh-right"
                    :disabled="query.approver ==''"
                    @click="handleReset"
                >重置</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" width="55" align="center" label="序号"></el-table-column>
                <el-table-column prop="sno" label="学号" align="center"></el-table-column>
                <el-table-column prop="name" align="center" label="运动员姓名">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleProjectName(scope.row)"
                        >{{scope.row.name}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" min-width="50px" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            effect="dark"
                            :type="tagType[scope.row.approver]"
                        >{{tagText[scope.row.approver]}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="create_time" align="center" label="报名时间" min-width="100px"></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="success"
                            icon="el-icon-success"
                            @click="handleSuccess(scope.row)"
                        >通过</el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
                        <el-button
                            type="warning"
                            icon="el-icon-refresh-right"
                            @click="handleReject(scope.row)"
                        >驳回</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>
        <student-dialog
            v-if="editVisible"
            @cancle="editVisible=false;edit=false"
            :student="current_row"
            :edit="edit"
            :editVisible="editVisible"
        ></student-dialog>
    </div>
</template>

<script>
import StudentDialog from '../student/StudentDialog.vue';
import { mapGetters } from 'vuex';
import { findApplyByNoApprover,updateApply,deleteApply } from '../../api/apply';
export default {
    name: 'basetable',
    components: {
        StudentDialog
    },
    data() {
        return {
            query: {
                did: '',
                approver: '',
                pageIndex: 1,
                limit: 5,
                pid:''
            },
            tableData: [],
            editVisible: false,
            edit: false,
            pageTotal: 0,
            current_row: {},
            statusOptions: [
                {
                    value: '0',
                    label: '审核中'
                },
                {
                    value: '2',
                    label: '已驳回'
                }
            ],
            tagType: { '0': '', '1': 'success', '2': 'danger' },
            tagText: { '0': '审核中', '1': '已通过', '2': '已驳回' }
        };
    },
    created() {
        this.getAllApplys();
    },
       computed: {
        ...mapGetters(['currentDepartmentId'])
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.$set(this.query, 'limit', 5);
            this.getAllApplys();
        },
        // 删除
        handleDelete( row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
            .then(() => {
                    deleteApply([row.id])
                        .then(res => {
                            this.$notify.success('删除成功');
                            this.getAllApplys();
                        })
                        .catch(err => {
                            this.$notify.error('删除失败');
                        });
                })
                .catch(() => {});
        },
        //驳回
        handleReject( row) {
            let rows = this.$cloneDeep(row)
            delete rows.sno
            delete rows.name
            rows.approver = '2'
            rows.student = JSON.stringify(rows.student)
            this.handleUpdate(rows)
        },
        // 成功
        handleSuccess( row) {
            let rows = this.$cloneDeep(row)
            delete rows.sno
            delete rows.name
            rows.approver = '1'
            rows.student = JSON.stringify(rows.student)
            console.log('row: ', rows);
            this.handleUpdate(rows)
        },
        //点击姓名
        handleProjectName(row) {
            this.editVisible = true;
            this.current_row = row.student;
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getAllApplys();
        },
        handleSizeChange(val) {
            this.$set(this.query, 'limit', val);
            this.getAllApplys();
        },
        //重置搜索框
        handleReset() {
            this.query.approver = '';
            this.query.limit = 5;
            this.query.pageIndex = 1;
            this.getAllApplys();
        },
        //改变当前的状态
        handleUpdate(row) {
            updateApply(row)
                .then(res => {
                    this.$message.success('数据操作成功');
                    this.getAllApplys();
                })
                .catch(err => {
                    this.$notify.err('数据操作失败');
                });
        },

        // 获取 所有的数据
        getAllApplys() {
            this.query.did = this.currentDepartmentId
            this.query.pid = this.$route.query.id
            console.log('this.$route: ', this.$route.query.id);
            findApplyByNoApprover(this.query)
                .then(res => {
                    let data = this.$get(res, 'data', {});
                    this.pageTotal = data.count;
                    this.tableData = data.rows.map(item=>{
                        item.student = JSON.parse(item.student)
                        item.sno = item.student.sno
                        item.name = item.student.name
                        return item;
                    });
                })
                .catch(err => {
                    this.$notify.err('数据获取失败');
                });
        }
    }
};
</script>

<style scoped>
.handle-box {
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

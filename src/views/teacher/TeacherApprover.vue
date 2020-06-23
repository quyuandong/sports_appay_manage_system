<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 管理员审批
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-select
                    v-model="query.did"
                    class="mr10"
                    clearable
                    @clear="handleSearch"
                    placeholder="请选择院系"
                >
                    <el-option
                        v-for="item in departmentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-select
                    v-model="query.approver"
                    class="mr10"
                    clearable
                    @clear="handleSearch"
                    placeholder="请选择审核状态"
                >
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
                    @click="handleSearch"
                    :disabled="!BtnDisable"
                >搜索</el-button>
                <el-button
                    icon="el-icon-refresh-right"
                    @click="handleReset"
                    :disabled="!BtnDisable"
                >重置</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                stripe
                highlight-current-row
                height="350px"
                class="table"
                style="width: 100%"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
                <el-table-column type="index" width="55" align="center" label="序号"></el-table-column>
                <el-table-column prop="tno" align="center" show-overflow-tooltip label="工号"></el-table-column>
                <el-table-column prop="name" align="center" show-overflow-tooltip label="用户名"></el-table-column>
                <el-table-column
                    prop="address"
                    align="center"
                    show-overflow-tooltip
                    width="150px"
                    label="所属院系"
                >
                    <template slot-scope="scope">
                        <span>{{getDepartmentName(scope.row)}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" min-width="100px" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            effect="dark"
                            :type="tagType[scope.row.approver]"
                        >{{tagText[scope.row.approver]}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="create_time"
                    align="center"
                    show-overflow-tooltip
                    label="注册时间"
                    min-width="100px"
                ></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
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
                    layout="total,sizes, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="5"
                    :page-sizes="[5, 10, 15, 20]"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                    @size-change="handleSizeChange"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { findTeacherByApprover, updateTeacher, deleteTeacher } from '../../api/teacher';
import { getDepartmentAll } from '../../api/department';
export default {
    name: 'teacherApprover',
    data() {
        return {
            query: {
                approver: '',
                did: '',
                pageIndex: 1,
                limit: 5
            },
            tableData: [],
            pageTotal: 0,
            departmentList: [],
            tagType: { '0': '', '1': 'success', '2': 'danger' },
            tagText: { '0': '审核中', '1': '已通过', '2': '已驳回' },
            statusOptions: [
                {
                    value: '2',
                    label: '已驳回'
                },
                {
                    value: '0',
                    label: '审核中'
                }
            ]
        };
    },
    created() {
        this.getAllTeachers();
        this.getCheckedDepartment();
    },
    computed: {
        BtnDisable() {
            return this.query.approver != '' || this.query.did != '';
        }
    },
    methods: {
        //获取院系的名称
        getDepartmentName(row) {
            let name = '';
            this.departmentList.forEach(item => {
                if (item.id === row.did) {
                    name = item.name;
                    return;
                }
            });
            return name;
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.$set(this.query, 'limit', 5);
            this.getAllTeachers();
        },
        // 删除操作
        handleDelete(row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteTeacher([row.id])
                        .then(res => {
                            this.$notify.success('删除成功');
                            this.getAllTeachers();
                        })
                        .catch(err => {
                            this.$notify.error('删除失败');
                        });
                })
                .catch(() => {});
        },
        //通过
        handleSuccess(row) {
            row.approver = '1';
            row.release = '1';
            this.handleStatusChange(row);
        },

        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getAllTeachers();
        },
        handleSizeChange(val) {
            this.$set(this.query, 'limit', val);
            this.getAllTeachers();
        },

        //重置搜索框
        handleReset() {
            this.query.approver = '';
            this.query.did = '';
            this.query.limit = 5;
            this.query.pageIndex = 1;
            this.$message.success('重置成功');
            this.getAllTeachers();
        },

        //驳回
        handleReject(row) {
            row.approver = '2';
            this.handleStatusChange(row);
        },

        //变更当前信息
        handleStatusChange(row) {
            updateTeacher(row)
                .then(res => {
                    this.$message.success('操作成功');
                    this.getAllTeachers();
                })
                .catch(err => {
                    this.$notify.err('操作失败');
                });
        },

        // 获取 所有的数据
        getAllTeachers() {
            findTeacherByApprover(this.query)
                .then(res => {
                    let data = this.$get(res, 'data', {});
                    this.pageTotal = data.count;
                    this.tableData = data.rows;
                })
                .catch(err => {
                    this.$notify.err('数据获取失败');
                });
        },
        //获得所有的启用的院系
        getCheckedDepartment() {
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

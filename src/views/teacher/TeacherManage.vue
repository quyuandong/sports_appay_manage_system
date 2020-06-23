<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 院系管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                    :disabled="multipleSelection.length===0"
                >批量删除</el-button>
                <el-select
                    v-model="query.release"
                    class="mr10"
                    clearable
                    @clear="handleSearch"
                    placeholder="请选择发布状态"
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
                    :disabled="query.release ==''"
                >搜索</el-button>
                <el-button
                    icon="el-icon-refresh-right"
                    @click="handleReset"
                    :disabled="query.release ==''"
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
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
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
                <el-table-column show-overflow-tooltip label="是否启用" min-width="50px" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            v-model="scope.row.release"
                            active-value="1"
                            inactive-value="0"
                            @change="handleStatusChange(scope.row)"
                        >发布</el-switch>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="create_time"
                    show-overflow-tooltip
                    align="center"
                    label="注册时间"
                    min-width="100px"
                ></el-table-column>
                <el-table-column label="操作" width="300" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                        >删除</el-button>
                        <el-button
                            type="success"
                            icon="el-icon-refresh-right"
                            @click="handleResetPassword(scope.row)"
                        >重置密码</el-button>
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
        <teacher-dialog
            v-if="editVisible"
            @cancle="editVisible=false;edit=false"
            :teacher="current_row"
            :edit="edit"
            @edit="handleEditCompute"
            :editVisible="editVisible"
        ></teacher-dialog>
    </div>
</template>

<script>
import TeacherDialog from './TeacherDialog.vue';
import { getTeacherList, updateTeacher, deleteTeacher } from '../../api/teacher';
import { getDepartmentAll } from '../../api/department';
export default {
    name: 'teacherManage',
    data() {
        return {
            query: {
                release: '',
                pageIndex: 1,
                limit: 5
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            edit: false,
            pageTotal: 0,
            current_row: {},
            departmentList: [],
            statusOptions: [
                {
                    value: '1',
                    label: '已发布'
                },
                {
                    value: '0',
                    label: '未发布'
                }
            ]
        };
    },
    created() {
        this.getAllTeachers();
        this.getCheckedDepartment();
    },
    components: {
        TeacherDialog
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
            if (row.release == '1') {
                this.$notify.warning('已激活的数据，不能进行删除');
                return;
            }

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
        //点击编辑安静
        handleEdit(row) {
            if (row.release == '1') {
                this.$notify.warning('已激活的数据，不能进行编辑');
                return;
            }
            this.editVisible = true;
            this.current_row = row;
            this.edit = true;
        },
        //完成编辑
        handleEditCompute(data) {
            this.editVisible = false;
            this.edit = false;
            this.handleStatusChange(data);
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //删除所有选择的
        delAllSelection() {
            if (this.multipleSelection.some(item => item.release == '1')) {
                this.$notify.warning('选中存在已激活的数据，删除失败');
                return;
            }
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    let delArr = [];
                    this.multipleSelection.forEach(item => {
                        delArr.push(item.id);
                    });
                    deleteTeacher(delArr)
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
            this.query.release = '';
            this.query.limit = 5;
            this.query.pageIndex = 1;
            this.$message.success('重置成功');
            this.getAllTeachers();
        },

        //重置密码
        handleResetPassword(row) {
            row.password = '123456';
            this.handleStatusChange(row);
        },

        //改变当前的状态
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
            getTeacherList(this.query)
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

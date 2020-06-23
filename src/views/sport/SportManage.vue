<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 运动项目管理
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
                    :disabled="query.release ==''"
                    @click="handleSearch"
                >搜索</el-button>
                <el-button
                    icon="el-icon-refresh-right"
                    :disabled="query.release ==''"
                    @click="handleReset"
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
                <el-table-column prop="title" align="center" show-overflow-tooltip label="运动项目名称">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleProjectName(scope.row)"
                        >{{ scope.row.title }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="introduction"
                    align="center"
                    show-overflow-tooltip
                    label="运动项目简介"
                ></el-table-column>
                <el-table-column label="是否发布" min-width="50px" show-overflow-tooltip align="center">
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
                    label="创建时间"
                    min-width="100px"
                ></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
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
        <sport-dialog
            v-if="editVisible"
            @cancle="editVisible=false;edit=false"
            :sport="current_row"
            :edit="edit"
            @edit="handleEditCompute"
            :editVisible="editVisible"
        ></sport-dialog>
    </div>
</template>

<script>
import SportDialog from './SportDialog';
import { getSportList, updateSport, deleteSport } from '../../api/sport';
export default {
    name: 'sportManage',
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
        this.getAllSports();
    },
    components: {
        SportDialog
    },
    methods: {
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.$set(this.query, 'limit', 5);
            this.getAllSports();
        },
        // 删除操作
        handleDelete(index, row) {
            if(row.release == '1'){
	this.$notify.warning('已激活的数据，不能进行删除')
	return
}
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    deleteSport([row.id])
                        .then(res => {
                            this.$notify.success('删除成功');
                            this.getAllSports();
                        })
                        .catch(err => {
                            this.$notify.error('删除失败');
                        });
                })
                .catch(() => {});
        },
        //点击编辑安静
        handleEdit(row) {
            if(row.release == '1'){
	this.$notify.warning('已激活的数据，不能进行编辑')
	return
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
                    deleteSport(delArr)
                        .then(res => {
                            this.$notify.success('删除成功');
                            this.getAllSports();
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
            this.getAllSports();
        },
        handleSizeChange(val) {
            this.$set(this.query, 'limit', val);
            this.getAllSports();
        },

        //点击名称
        handleProjectName(row) {
            console.log('row: ', row);
            this.editVisible = true;
            this.current_row = row;
        },
        //重置搜索框
        handleReset() {
            this.query.release = '';
            this.query.limit = 5;
            this.query.pageIndex = 1;
            this.getAllSports();
        },

        //改变当前的状态
        handleStatusChange(row) {
            updateSport(row)
                .then(res => {
                    this.$message.success('数据操作成功');
                    this.getAllSports();
                })
                .catch(err => {
                    this.$notify.err('数据操作失败');
                });
        },

        // 获取 所有的数据
        getAllSports() {
            getSportList(this.query)
                .then(res => {
                    let data = this.$get(res, 'data', {});
                    this.pageTotal = data.count;
                    this.tableData = data.rows;
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

<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 报名管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
            >
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
                <el-table-column prop="count" align="center" show-overflow-tooltip label="运动项目已报人数"></el-table-column>
                <el-table-column
                    prop="create_time"
                    align="center"
                    show-overflow-tooltip
                    label="运动项目发布时间"
                    min-width="100px"
                ></el-table-column>
                <el-table-column prop="content" align="center" label="报名审核">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleClick(scope.row,1)"
                        >审核已报名运动员</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="content" align="center" label="审核结果">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleClick(scope.row,2)"
                        >查看已审核详情</el-button>
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
        <sport-dialog
            v-if="editVisible"
            @cancle="editVisible=false;edit=false"
            :sport="current_row"
            :edit="edit"
            :editVisible="editVisible"
        ></sport-dialog>
    </div>
</template>

<script>
import SportDialog from '../../pages/student/sport/StudentSportDialog.vue';
import { findApplyList, findApplyAll } from '../../api/apply';
import { mapGetters } from 'vuex';
export default {
    name: 'applyManage',
    data() {
        return {
            query: {
                pageIndex: 1,
                limit: 5
            },
            tableData: [],
            editVisible: false,
            edit: false,
            pageTotal: 0,
            current_row: {}
        };
    },
    created() {
        this.getAllSports();
    },
    computed: {
        ...mapGetters(['currentDepartmentId'])
    },
    components: {
        SportDialog
    },
    methods: {
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getAllSports();
        },
        handleSizeChange(val) {
            this.$set(this.query, 'limit', val);
            this.getAllSports();
        },
        handleClick(row, type) {
            let jumpPath = '';
            switch (type) {
                case 1:
                    jumpPath = '/applyAudit';
                    break;
                case 2:
                    jumpPath = '/applyList';
                    break;
            }
            this.$router.push({ path: jumpPath, query: { id: row.id, title: row.title } });
        },
        //点击名称
        handleProjectName(row) {
            this.editVisible = true;
            this.current_row = row;
        },
        getAllSports() {
            findApplyList(this.query)
                .then(res => {
                    findApplyAll()
                        .then(result => {
                            if (res.data && result.data) {
                                this.pageTotal = res.data.count;
                                let rows = res.data.rows;
                                this.tableData = rows.map(item => {
                                    let newPid = 0;
                                    result.data.forEach(it => {
                                        if (it.pid == item.id && it.did == this.currentDepartmentId) {
                                            newPid++;
                                        }
                                    });
                                    item.count = newPid;
                                    console.log('newPid: ', newPid);
                                    return item;
                                });
                            } else {
                                this.$notify.error('数据获取失败');
                            }
                        })
                        .catch(err => {
                            this.$notify.error(err.msg);
                        });
                })
                .catch(err => {
                    this.$notify.error(err.msg);
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

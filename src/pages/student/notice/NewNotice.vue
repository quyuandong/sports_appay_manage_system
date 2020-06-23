<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 最新公告
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
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
                <el-table-column prop="title" align="center" show-overflow-tooltip label="标题">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleProjectName(scope.row)"
                        >{{ scope.row.title }}</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="content" show-overflow-tooltip align="center" label="内容">
                </el-table-column>

                <el-table-column
                    prop="create_time"
                    show-overflow-tooltip
                    align="center"
                    label="发布时间"
                    min-width="100px"
                ></el-table-column>
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
        <!-- <notice-dialog
            v-if="editVisible"
            @cancle="editVisible=false;edit=false"
            :nodtice="current_row"
            :edit="edit"
            @edit="handleEditCompute"
            :editVisible="editVisible"
        ></notice-dialog> -->
    </div>
</template>

<script>
import { notice } from '../../../mock/index';
// import NoticeDialog from './NoticeDialog';
import { getNoticeList, updateNotice, deleteNotice } from '../../../api/notice';

export default {
    name: 'newNotice',
    data() {
        return {
            query: {
                release: '',
                pageIndex: 1,
                limit: 5
            },
            tableData: [],
            editVisible: false,
            pageTotal: 0,
            current_row: {},
        };
    },
    created() {
        this.getAllNotice();
    },
    components: {
        // NoticeDialog
    },
    methods: {

        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getAllNotice();
        },
        handleSizeChange(val) {
            this.$set(this.query, 'limit', val);
            this.getAllNotice();
        },

        //点击公告标题
        handleProjectName(row) {
            this.$router.push({path:'/editDetail',query:{"row":row}});
        },
        // 获取 所有的数据
        getAllNotice() {
            getNoticeList(this.query)
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

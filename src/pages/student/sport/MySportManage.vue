<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 运动项目报名
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
                <el-table-column prop="title" align="center" show-overflow-tooltip label="报名项目">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="handleProjectName(scope.row)"
                        >{{ scope.row.sport.title }}</el-button>
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
                    show-overflow-tooltip
                    align="center"
                    label="报名时间"
                    min-width="100px"
                ></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="danger"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                        >删 除</el-button>
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
import SportDialog from './StudentSportDialog.vue';
import { findSportByRelease } from '../../../api/sport';
import { getProjectList,deleteProject } from '../../../api/project';
import { mapGetters } from 'vuex';
export default {
    name: 'StudentSportManage',
    data() {
        return {
            query: {
                pageIndex: 1,
                limit: 5,
            },
            tableData: [],
            editVisible: false,
            edit: false,
            pageTotal: 0,
            current_row: {},
            tagType: { '0': '', '1': 'success', '2': 'danger' },
            tagText: { '0': '审核中', '1': '已通过', '2': '已驳回' },
        };
    },
    computed: {
      ...mapGetters(['userInfo'])  
    },
    created() {
        this.getAllSports();
    },

    components: {
        SportDialog
    },
    methods: {
        handleDelete(row){
            if(row.approver == '1'){
                this.$notify.error("删除失败，已审核通过的项目，不能删除！")
                return;
            }
            deleteProject([row.id]).then(res=>{
                this.$notify.success("删除成功")
                this.getAllSports()
            }).catch(err=>{
                this.$notify.error(err.msg)
            })
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
            this.editVisible = true;
            this.current_row = row.sport;
        },
        // 获取 所有的数据
        getAllSports() {
            let sid = this.userInfo.id
            let params = {sid,...this.query}
            getProjectList(params)
                .then(res => {
                    let data = this.$get(res, 'data', {});
                    this.pageTotal = data.count;
                   this.tableData = data.rows.map(item=>{
                        item.student = JSON.parse(item.student)
                        item.sport = JSON.parse(item.sport)
                        return item 
                    })
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

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
                <el-table-column
                    prop="create_time"
                    show-overflow-tooltip
                    align="center"
                    label="发布时间"
                    min-width="100px"
                ></el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="primary"
                            icon="el-icon-edit"
                            @click="handleLogin(scope.row)"
                        >报 名</el-button>
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
import { addProject } from '../../../api/project';
import { mapGetters } from 'vuex';
export default {
    name: 'StudentSportManage',
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
            current_row: {},
        };
    },
    created() {
        this.getAllSports();
    },
    computed: {
      ...mapGetters(['userInfo'])  
    },
    components: {
        SportDialog
    },
    methods: {
        //点击报名
        handleLogin(row) {
            let params = {
                pid:row.id,
                did:this.userInfo.did,
                sid:this.userInfo.sid,
                cid:this.userInfo.cid,
                tid:this.userInfo.id,
                student:JSON.stringify(this.userInfo),
                sport:JSON.stringify(row),
            }
            addProject(params).then(res=>{
                if(res.data){
                    this.$notify.success("报名成功")
                }else{
                    this.$notify.error(res.msg)
                }
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
            this.current_row = row;
        },
        // 获取 所有的数据
        getAllSports() {
            findSportByRelease(this.query)
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

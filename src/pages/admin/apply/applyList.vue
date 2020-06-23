<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 已报名人员列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-printer"
                    class="handle-del mr10"
                    @click="handlePoint"
                >打印报名表</el-button>
                <el-select
                    v-model="query.did"
                    class="mr10"
                    @clear="handleSearch"
                    clearable
                    placeholder="请选择院系"
                >
                    <el-option
                        v-for="item in departmentList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <el-button
                    type="primary"
                    icon="el-icon-search"
                    :disabled="query.sid ==''"
                    @click="handleSearch"
                >搜索</el-button>
                <el-button
                    icon="el-icon-refresh-right"
                    :disabled="query.sid ==''"
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
                <el-table-column prop="did" align="center" label="院系">
                    <template slot-scope="scope">
                        <span>{{getDepartmentName(scope.row)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sid" align="center" label="专业">
                    <template slot-scope="scope">
                        <span>{{getspecialtyName(scope.row)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cid" align="center" label="班级">
                    <template slot-scope="scope">
                        <span>{{getClassName(scope.row)}}</span>
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
                <el-table-column prop="update_time" align="center" label="审核时间" min-width="100px"></el-table-column>
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
import StudentDialog from '../../../views/student/StudentDialog.vue';
import { mapGetters } from 'vuex';
import { findApplyByApproverDid, findApplyByTeacherExport } from '../../../api/apply';
import { getSpecialtyAll } from '../../../api/specialty';
import { getClassGradeAll } from '../../../api/class';
//导出excel
import Blob from '../../../excel/Blob';
import { export_json_to_excel } from '../../../excel/Export2Excel';
import { getDepartmentAll } from '../../../api/department';
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
                pid: '',
            },
            tableData: [],
            editVisible: false,
            edit: false,
            pageTotal: 0,
            current_row: {},
            departmentList: [],
            specialtyList: [],
            classList: [],
            tagType: { '0': '', '1': 'success', '2': 'danger' },
            tagText: { '0': '审核中', '1': '已通过', '2': '已驳回' }
        };
    },
    created() {
        this.getAllApplys();
        this.getCheckedDepartment();
        this.getCheckedSpecialty();
        this.getCheckedClass();
    },
    computed: {
        ...mapGetters(['currentDepartmentId'])
    },
    methods: {
        //获取院系
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
        //获取专业
        getspecialtyName(row) {
            let name = '';
            this.specialtyList.forEach(item => {
                if (item.id === row.sid) {
                    name = item.name;
                    return;
                }
            });
            return name;
        },
        //获取班级
        getClassName(row) {
            let name = '';
            this.classList.forEach(item => {
                if (item.id === row.cid) {
                    name = item.name;
                    return;
                }
            });
            return name;
        },
        //打印
        handlePoint() {
            this.$notify.success('打印成功');
            let newRow = {
                did: this.query.did,
                pid: this.$route.query.id,
            };
            findApplyByTeacherExport(newRow)
                .then(res => {
                    let data = this.$get(res, 'data', {});
                    console.log('data: ', data);
                    // this.tableData = data.map(item => {
                    //     item.student = JSON.parse(item.student);
                    //     item.sno = item.student.sno;
                    //     item.name = item.student.name;
                    //     return item;
                    // });
                    this.exportExcel(data);
                })
                .catch(err => {
                    this.$notify.err('数据获取失败');
                });
        },

        //导出
        exportExcel(datas) {
            // 设置Excel的表格第一行的标题
            const tHeader = ['序号', '学号', '姓名','院系','专业','班级','报名项目','报名时间','审核时间'];
            const filterVal = ['index', 'sno', 'name','department','specialy','class','title','create_time','update_time'];
            let list = []
            datas.forEach((item,index)=>{
                item.student = JSON.parse(item.student)
                let params = {}
                params['index'] = index+1;
                params['sno'] = item.student.sno;
                params['name'] = item.student.name;
                params['department'] = this.getDepartmentName(item);
                params['specialy'] = this.getspecialtyName(item);
                params['class'] = this.getClassName(item);
                params['title'] = this.$route.query.title;
                params['create_time'] = item.create_time;
                params['update_time'] = item.update_time;
                list.push(params)
            })

            const data = this.formatJson(filterVal, list);
            const excelName = this.$route.query.title+'报名表';
            export_json_to_excel(tHeader, data, excelName);
        },
        //格式化json
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => v[j]));
        },

        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.$set(this.query, 'limit', 5);
            this.getAllApplys();
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
            this.query.did = '';
            this.query.limit = 5;
            this.query.pageIndex = 1;
            this.getAllApplys();
        },

        // 获取 所有的数据
        getAllApplys() {
            this.query.pid = this.$route.query.id;
            findApplyByApproverDid(this.query)
                .then(res => {
                    let data = this.$get(res, 'data', {});
                    this.pageTotal = data.count;
                    this.tableData = data.rows.map(item => {
                        item.student = JSON.parse(item.student);
                        item.sno = item.student.sno;
                        item.name = item.student.name;
                        return item;
                    });
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
        },
         //获得所有的启用的专业
        getCheckedSpecialty() {
            getSpecialtyAll()
                .then(res => {
                    this.specialtyList = this.$get(res, 'data', []);
                })
                .catch(err => {
                    this.$notify.error('专业信息获取失败');
                });
        },
         //获得所有的启用的班级
        getCheckedClass() {
            getClassGradeAll()
                .then(res => {
                    this.classList = this.$get(res, 'data', []);
                })
                .catch(err => {
                    this.$notify.error('班级信息获取失败');
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

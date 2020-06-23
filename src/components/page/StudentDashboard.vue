<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:303px;">
                    <div class="user-info">
                        <img :src="imageUrl" class="user-avator" alt />
                        <div class="user-info-cont">
                            <div class="user-info-name">{{name}}</div>
                            <div>{{role}}</div>
                        </div>
                    </div>
                    <div class="user-info-list">
                        上次登录时间：
                        <span>2020-05-21</span>
                    </div>
                    <div class="user-info-list">
                        上次登录地点：
                        <span>驻马店</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="hover" style="height:303px;">
                    <div slot="header" class="clearfix">
                        <span>待办事项</span>
                        <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
                    </div>
                    <el-table :show-header="false" :data="todoList" style="width:100%;">
                        <el-table-column width="40">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.status"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div
                                    class="todo-item"
                                    :class="{'todo-item-del': scope.row.status}"
                                >{{scope.row.title}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column width="60">
                            <template>
                                <i class="el-icon-edit"></i>
                                <i class="el-icon-delete"></i>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <a href='http://cie.huanghuai.edu.cn/'>
                    <img src="../../assets/img/xx.png" style="width:100%;height:100%" alt />
                </a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import { mapGetters } from 'vuex';
export default {
    name: 'dashboard',
    data() {
        return {
            imageUrl: '',
            todoList: [
                {
                    title: '今天要完成运动信息的初步统计',
                    status: false
                },
                {
                    title: '今天要完成赛事的策划',
                    status: false
                },
                {
                    title: '今天要完成运动奖项标准制作',
                    status: true
                },
                {
                    title: '今天要完成信息技术的汇总',
                    status: true
                }
            ],
            data: [
                {
                    name: '2018/09/04',
                    value: 1083
                },
                {
                    name: '2018/09/05',
                    value: 941
                },
                {
                    name: '2018/09/06',
                    value: 1139
                },
                {
                    name: '2018/09/07',
                    value: 816
                },
                {
                    name: '2018/09/08',
                    value: 327
                },
                {
                    name: '2018/09/09',
                    value: 228
                },
                {
                    name: '2018/09/10',
                    value: 1065
                }
            ],
            options: {
                type: 'bar',
                title: {
                    text: '各运动项目的报名人数图'
                },
                xRorate: 25,
                labels: [
                    '30米推铁球环跑',
                    '袋鼠跳',
                    '健身球',
                    '分钟踢毽',
                    '分钟跳绳',
                    '分钟定点投篮',
                    '五人行',
                    '50米田径',
                    '800米田径',
                    '立定跳远',
                    '跳远'
                ],
                datasets: [
                    {
                        label: '报名人数',
                        data: [50, 30, 25, 15, 65, 44, 56, 45, 20, 78, 15]
                    }
                ]
            },
            options2: {
                type: 'bar',
                title: {
                    text: '各学院报名人数'
                },
                xRorate: 25,
                labels: ['国际学院', '信息工程学院', '建筑学院', '马克思主义学院', '音乐学院', '体育学院', '护理学院'],
                datasets: [
                    {
                        label: '报名人数',
                        data: [66, 99, 95, 75, 65, 144, 36]
                    }
                ]
            }
        };
    },
    components: {
        Schart
    },
    watch: {
        userInfo(val) {
            this.imageUrl = this.userInfo.icon ? this.userInfo.icon : require('../../assets/img/img.jpg');
        }
    },
    computed: {
        ...mapGetters(['userInfo', 'currentRole']),
        name() {
            return this.userInfo.name || this.userInfo.username;
        },
        role() {
            switch (this.currentRole) {
                case 'A':
                    return '超级管理员';
                    break;
                case 'T':
                    return '院系管理员';
                    break;
                case 'S':
                    return '普通用户';
                    break;
            }
            // return this.currentRole === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    created() {
        this.imageUrl = this.userInfo.icon ? this.userInfo.icon : require('../../assets/img/img.jpg');
    },

    methods: {
        changeDate() {
            const now = new Date().getTime();
            this.data.forEach((item, index) => {
                const date = new Date(now - (6 - index) * 86400000);
                item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
            });
        }
        // handleListener() {
        //     bus.$on('collapse', this.handleBus);
        //     // 调用renderChart方法对图表进行重新渲染
        //     window.addEventListener('resize', this.renderChart);
        // },
        // handleBus(msg) {
        //     setTimeout(() => {
        //         this.renderChart();
        //     }, 200);
        // },
        // renderChart() {
        //     this.$refs.bar.renderChart();
        //     this.$refs.line.renderChart();
        // }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}
</style>

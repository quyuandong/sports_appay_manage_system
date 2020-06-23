<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-card shadow="hover" class="mgb20" style="height:252px;">
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
                <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>系统的使用状况</span>
                    </div>熟练使用的
                    <el-progress :percentage="56.3" color="#42b983"></el-progress>普通使用的
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>不会使用的
                    <el-progress :percentage="13.7"></el-progress>没有接触过的
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-row :gutter="20" class="mgb20">
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-1">
                                <i class="el-icon-lx-people grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">666</div>
                                    <div>院系用户访问量</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-2">
                                <i class="el-icon-lx-notice grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">3</div>
                                    <div>系统消息</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card shadow="hover" :body-style="{padding: '0px'}">
                            <div class="grid-content grid-con-3">
                                <i class="el-icon-lx-hotfill grid-con-icon"></i>
                                <div class="grid-cont-right">
                                    <div class="grid-num">152</div>
                                    <div>院系已报名人员</div>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <el-card shadow="hover" style="height:403px;">
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
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="hover">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <a href="http://wisec.huanghuai.edu.cn/index.jsp">
                    <img src="../../assets/img/hh.png" style="width:100%;height:100%" alt />
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
                    title: '学院要完成运动信息的初步统计',
                    status: false
                },
                {
                    title: '学院要完成赛事的策划',
                    status: false
                },
                {
                    title: '学院要完成运动项目规则的指定',
                    status: false
                },
                {
                    title: '学院要完成比赛人员的初选',
                    status: false
                },
                {
                    title: '学院要完成运动奖项标准制作',
                    status: true
                },
                {
                    title: '学院要完成信息技术的汇总',
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
                        data: [15, 20, 8, 23, 12, 3, 11, 9, 20, 18, 15]
                    }
                ]
            },
            options2: {
                type: 'bar',
                title: {
                    text: '各专业报名人数'
                },
                xRorate: 25,
                labels: ['软件工程', '计算机专业', '通信工程', '网络工程', '电子科学与技术', '大数据技术专业'],
                datasets: [
                    {
                        label: '报名人数',
                        data: [20, 30, 15, 25, 33, 28]
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

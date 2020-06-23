<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 运动项目管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>添加运动项目</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="sport" label-width="120px">
                    <el-form-item label="运动项目名称">
                        <el-input v-model="sport.title" placeholder="请输入运动项目名称"></el-input>
                    </el-form-item>
                    <el-form-item label="运动项目简介">
                        <el-input v-model="sport.introduction" type="textarea" :rows="6" placeholder="请输入运动项目简介"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="handleSubmit">提交</el-button>
                        <el-button @click="handleReset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import { addSport } from "../../api/sport"
export default {
    name: 'sportAdd',
    data() {
        return {
            sport: {
                title: '跳远',
                introduction: '50米跳远',
            }
        };
    },
    methods: {
        handleSubmit() {
            addSport(this.sport).then(res=>{
                console.log('res: ', res);
                this.$notify.success('添加成功')
                this.handleReset()
                this.$router.push('/sportManage')
            }).catch(err=>{
                console.log('err: ', err);
                 this.$notify.error("添加失败")
            })
        },
        handleReset() {
            this.sport.title = ''
            this.sport.introduction = ''
        }
    }
};
</script>
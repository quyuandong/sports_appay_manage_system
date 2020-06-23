<template>
    <!-- 编辑弹出框 -->
    <el-dialog title="公告详情" :visible.sync="editVisible" width="70%" :before-close="handleCancle" >
        <div class="container">
            <el-form ref="form" :model="sport" label-width="120px">
                    <el-form-item label="运动项目名称">
                        <el-input v-model="sport.title" :disabled='!edit'></el-input>
                    </el-form-item>
                    <el-form-item label="运动项目简介">
                        <el-input v-model="sport.introduction" type="textarea" :rows="6" :disabled='!edit'></el-input>
                    </el-form-item>
                </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleClick" v-if="edit" >确 定</el-button>
            <el-button  @click="handleCancle" >取 消</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    name: 'studentSportDialog',
    props: {
        sport: {
            require: true,
            type: Object
        },
        editVisible: {
            type: Boolean,
            default: false
        },
        edit: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            
        }
    },
    computed:{
    },
    methods: {
        handleClick(){
            this.$emit('edit',this.sport)
        },
        handleCancle() {
            this.$emit('cancle', false);
        }
    }
};
</script>

<style scoped>
.dialog-footer{
    display: flex;
    justify-content: center;
}
</style>

<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 系统管理
                </el-breadcrumb-item>
                <el-breadcrumb-item>系统属性</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-table :data="tableData" border :show-header='false' style="width: 100%">
                <el-table-column prop="title" align="center" label="属性" ></el-table-column>
                <el-table-column prop="value" align="center" label="参数" ></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'baseform',
    data() {
        return {
            tableData: [
                {title:'操作系统',value:'window7,window10'},
                {title:'开发环境',value:'node环境'},
                {title:'开发语言',value:'vue+node'},
                {title:'数据库',value:'mySql5.12'},
                {title:'版本',value:'v1.0.0.1'},
            ]
        };
    }
};
</script>
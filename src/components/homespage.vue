<!--  -->
<template>
<div class=''>
    <el-container style="height: 500px; border: 1px solid #eee">
        <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>租户管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1" @click="to">租户列表</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        
        <el-container>
            <el-header style="text-align: right; font-size: 12px">
                <el-dropdown>
                    <i class="el-icon-setting" style="margin-right: 15px"></i>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>查看</el-dropdown-item>
                        <el-dropdown-item>新增</el-dropdown-item>
                        <el-dropdown-item>删除</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <span>{{this.$route.params.name}}</span>
            </el-header>
            
            <el-main v-show="visibleto">
                <el-button @click="addUser">新增用户</el-button>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="用户管理" name="first">
                        <el-table :data="tableData">
                            <el-table-column prop="id" label="用户编号" width="140"></el-table-column>
                            <el-table-column prop="name" label="用户名称" width="120"></el-table-column>
                            <el-table-column prop="age" label="用户年龄" width="100"></el-table-column>
                            <el-table-column prop="email" label="用户邮箱" width="180"></el-table-column>
                            <el-table-column prop="officename" label="公司名称" width="250"></el-table-column>
                            <el-table-column prop="tenantid" label="公司ID" width="120"></el-table-column>
                            <el-table-column prop="username" label="用户账号" width="140"></el-table-column>
                            <el-table-column prop="password" label="用户密码" width="140"></el-table-column>
                            <el-table-column label="操作" width="180">
                                <template slot-scope="scope">
                                    <el-button @click="upUser(scope.row.id)" size="small">编辑</el-button>
                                    <el-button type="danger" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="公司管理" name="second" v-if="masterid == 1 && mastername == 'AllLink' && tenantid == 2020101412">
                        <el-table :data="tableCompanyData">
                            <el-table-column prop="id" label="用户编号" width="140"></el-table-column>
                            <el-table-column prop="name" label="用户名称" width="120"></el-table-column>
                            <el-table-column prop="age" label="用户年龄" width="100"></el-table-column>
                            <el-table-column prop="email" label="用户邮箱" width="180"></el-table-column>
                            <el-table-column prop="officename" label="公司名称" width="250"></el-table-column>
                            <el-table-column prop="tenantid" label="公司ID" width="120"></el-table-column>
                            <el-table-column prop="username" label="用户账号" width="140"></el-table-column>
                            <el-table-column prop="password" label="用户密码" width="140"></el-table-column>
                            <el-table-column label="操作" width="180">
                                <template slot-scope="scope">
                                    <el-button @click="upUser(scope.row.id)" size="small">编辑</el-button>
                                    <el-button type="danger" size="small">删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-main>
        </el-container>

        <add v-if="visibleAdd" :visible.sync="visibleAdd" :isMask="addMask" :masterid="masterid" :mastername="mastername" :tenantid="tenantid" @doks="dok"></add>
    </el-container>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import add from './insertUser'
import upd from './updateUser'

export default {
//import引入的组件需要注入到对象中才能使用
components: {add,upd},
data() {
//这里存放数据
return {
    activeName: 'first',
    tableData: [],
    tableCompanyData:[],
    masterid:this.$route.params.id,
    mastername:this.$route.params.name,
    tenantid:this.$route.params.tenantid,
    visibleto:false,
    visibleAdd:false,
    visibleUpd:false,
    addMask:false,
    updMask:false,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    to(){
        this.visibleto = true;
    },
    //跳转新增
    addUser(){
        this.visibleAdd = this.addMask = true;
    },
    //跳转修改
    upUser(id){

    },
    //新增完或修改完刷新
    dok(){
        this.visibleAdd = this.addMask = false;
        this.visibleUpd = this.updMask = false;
        this.init();
    },
    //刷新
    init(){
        let url = "http://localhost:8088/user/queryUser";
        this.$axios.get(url, {
            params: {
                tenantid : this.tenantid
            }
        }).then( res => {
            this.tableData = res.data;
        });
        
        url = "http://localhost:8088/user/queryCompany";
        this.$axios.get(url, {
            params: {
                masterid : this.masterid,
                mastername : this.mastername
            }
        }).then( res => {
            this.tableCompanyData = res.data;
        });
    }
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
    this.init();
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
    .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>
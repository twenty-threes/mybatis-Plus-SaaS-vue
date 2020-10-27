<!--  -->
<template>
<div class=''>
    <el-dialog
        title="新增用户"
        :visible.sync="isMask"
        width="40%"
        :before-close="handleClose">

            <el-form ref="fromData" :rules="fromDatarules" :model="fromData" label-width="130px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="fromData.name" placeholder="请输入用户姓名" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="fromData.age" maxlength="20" placeholder="请输入用户年龄" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="fromData.email" maxlength="20" placeholder="请输入用户邮箱" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="登陆账号" prop="username">
                    <el-input v-model="fromData.username" maxlength="20" placeholder="请输入用户登陆账号" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="登陆密码" prop="password">
                    <el-input v-model="fromData.password" maxlength="20" placeholder="请输入用户登陆密码" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="公司名称" prop="officename">
                    <el-input v-model="fromData.officename" maxlength="20" placeholder="请输入用户公司名称" style="width:80%"></el-input>
                </el-form-item>
                <el-form-item label="租赁公司管理员" v-if="masterid == 1 && mastername == 'AllLink' && tenantid == 2020101412">
                    <el-switch v-model="fromData.same"></el-switch>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button @click="handleClose()">取 消</el-button>
                <el-button type="primary" @click="submitForm('fromData')">添 加</el-button>
            </span>
        </el-dialog>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {
    fromData:{
        masterid:this.masterid,
        mastername:this.mastername,
        tenantid:null,
        company:0,
        same:false,
    },
    fromDatarules:{
        name: [
            { required: true, message: '请输入用户姓名', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        username: [
            { required: true, message: '请输入用户登陆账号', trigger: 'blur' },
        ],
        password: [
            { required: true, message: '请输入用户登陆密码', trigger: 'blur' },
        ],
        officename: [
            { required: true, message: '用户公司名称不能为空', trigger: 'blur' },
        ]
    },
};
},
props:{
    isMask:{                //接收父组件visible
        type:Boolean
    },
    masterid:{
        type:Number
    },
    mastername:{
        type:String
    },
    tenantid:{
        type:Number
    }
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
    //dialog外点关闭方法
    handleClose(done) {
        this.$emit("doks");
    },

    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let url = "http://localhost:8088/user/insertUser";
            if(this.fromData.same == false){
                this.fromData.tenantid = this.tenantid;
                this.fromData.company = 0;
            }else{
                this.fromData.tenantid = null;
                this.fromData.company = 1;
            }
            // console.log(this.fromData);
            this.$axios.post(url,this.fromData).then((res) => {
                if(res.data == "success"){
                    this.$message({
                        message: '添加用户成功！',
                        type: 'success',
                        duration: 1500,
                        onClose: () => {
                            this.$emit("doks");
                        }
                    });
                }
            });
          } else {
            return false;
          }
        });
    },
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
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

</style>
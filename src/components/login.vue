<!-- 登陆 -->
<template>
<div class=''>
    <div class="" v-show="visibleDIV">
      <el-row>
        <br>
        <img src="../assets/background.png" width="38%" height="24%" style="margin:0px 0px 0px 550px">
      </el-row><br>
      <el-row>
        <el-col :span="8">&nbsp;</el-col>
        <el-col :span="7">
          <el-form ref="formData" :model="formData" label-width="80px">
            <el-form-item label="公司ID">
              <el-input v-model.number="formData.tenantid" maxlength="10"></el-input>
            </el-form-item>
            <el-form-item label="账号">
              <el-input v-model="formData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="formData.password" type="password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登陆</el-button>
              <el-button @click="resetForm('formData')">清空</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <router-view/>
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
  //登陆账号对象
  formData:{},
  visibleDIV:true,
};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  onSubmit() {
    let url = "http://localhost:8088/user/Login";
    this.$axios.post(url,this.formData).then((res) => {
      if(res.data!=""){
        this.$message({
          message: '登陆成功！',
          type: 'success',
          duration: 1500,
          onClose: () => {
            this.visibleDIV = false;
            this.$router.push({
              path:'/home',
              name:'home',
              params:{ 
                tenantid:res.data.tenantid,
                name:res.data.name,
                id:res.data.id
              }
            });
          }
        });
      } else {
        this.$message({
          message: '登陆失败！请检查！',
          type: 'warning'
        });
      }
    }).catch(function(error){
    })
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  }
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
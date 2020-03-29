<template>
  <div>
    <div style="width: 1200px; margin: 0 auto;margin-top:100px;padding:20px 0;" clas="login-wrap">
      <div style=" display: flex; justify-content: space-between;padding:0 100px;">
        <div class="left"></div>
        <div class="login-box">
          <div class="login-title">
            <h1>民工工资自主查询平台</h1>
          </div>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <!-- 管理员 -->
            <el-form-item label="管理员">
              <el-input v-model="ruleForm.admin"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
          <div
            style="position:absolute;bottom:0;right:0;font-size:14px;color:#E6A23C;cursor: pointer;
                font-family: 'Helvetica Neue'"
          >
            <span @click="goRegistered()">去注册</span>
            <span>&nbsp;</span>
            <span @click="userLogin()">{{loginRole}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store'
export default {
  data() {
    var that = that;
    var validatePhoneadmin = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else {
        if (that.ruleForm.checkPass !== "") {
          that.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass = (rule, value, callback) => {
      var that = this;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (that.ruleForm.checkPass !== "") {
          that.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    return {
      loginRole: "用户登录",
      ruleForm: {
        admin: "",
        pass: ""
      },
      rules: {
        admin: [{ validator: validatePhoneadmin, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //   用户登录
    submitForm() {
      var that = this;
      if(that.ruleForm.admin === "admin"){
         store.commit("login", {
                account: "admin"
                }); 
         that.$router.push("./adminCenter");
      }else{
       that.$message("用户名或密码不正确");
      }
    },
    // 用户登录
    userLogin() {
      var that = this;
      that.$router.push("./login");
    },
    // 切换到注册页
    goRegistered() {
      var that = this;
      that.$router.push("./register");
    }
  }
};
</script>
<style>
 body{
        padding: 0;
        margin: 0;
    }
.login-wrap {
  width: 1200px;
  margin: 0 auto;
  cursor: pointer;
}
.left {
  width: 450px;
  height: 400px;
  background: url("./../assets/images/background.jpg") no-repeat;
  background-size: 100% 100%;
}
.login-box {
  width: 500px;
  margin: 0 auto;
  position: relative;
}
.login-title {
  color: #f29d38;
  margin-bottom: 20px;
}
</style>

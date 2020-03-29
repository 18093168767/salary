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
            <!-- 已注册用户 -->
            <el-form-item label="用户手机号" prop="phone">
              <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            </el-form-item>
          </el-form>
          <div style="position:absolute;bottom:0;left:20px;font-size:14px;color:#E6A23C;cursor: pointer; font-family: 'Helvetica Neue'">
            <el-switch
              v-model="switchValue"
              active-color="#13ce66"
              :change="swithChange(switchValue)"
              inactive-color="#ff4949">
            </el-switch>
            <span>{{volidTipMsg}}</span>
          </div>
          <div
            style="position:absolute;bottom:0;right:0;font-size:14px;color:#E6A23C;cursor: pointer;
                font-family: 'Helvetica Neue'"
          >
            <span @click="goRegistered()">去注册</span>
            <span>&nbsp;</span>
            <span @click="adminLogin()">{{loginRole}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import qs from 'qs'
import store from '@/store'
export default {
  data() {
    var that = this;
    return {
      volidTipMsg:"关闭电信手机号校验",
      switchValue: true,
      loginRole: "管理员登录",
      ruleForm: {
        phone: "",
        pass: ""
      },
      rules: {
        phone: [{ validator: this.validatePhone, trigger: "blur" }],
        pass: [{ validator: this.validatePass, trigger: "blur" }]
      },
     reg: /^1{1}\d{10}$/

    };
  },
  mounted() {
       
  },
  methods: {
    validatePhone (rule, value, callback) {
      var that = this;
      if (value === "") {
        callback(new Error("手机号不能为空"));
      } else if (!that.reg.test(value)) {
        callback(new Error("请输入电信手机号"));
      } else {
        that.checkedRegistered();
        if (!that.checkedRegistered().data.status) {
          callback(new Error("该手机号未注册，请先注册！"));
        }
        if (that.ruleForm.pass !== "") {
          that.$refs.ruleForm.validateField("pass");
        }
        callback();
      }
    },

    validatePass (rule, value, callback){
       var that = this;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        // if (that.ruleForm.checkPass !== "") {
        //   that.$refs.ruleForm.validateField("checkPass");
        // }
        // callback();
        callback();
      }
    },
    swithChange(status){
      var that = this;
      
      if(!status){
        that.volidTipMsg = "开启电信手机号校验";
        that.reg = /^1(3[3]|5[3]|8[09])\d{8}$/
      }else{
        that.volidTipMsg = "关闭电信手机号校验";
         that.reg = /^1{1}\d{10}$/
        
      }
    },
    //   用户登录
    submitForm(formName) {
      var that = this;
      
      that.$refs[formName].validate(valid => {
        if (valid) {
           var params = {
            telnum: that.ruleForm.phone,
            password: that.ruleForm.pass
          }
        
          that.$api.post("http://49.4.87.4:8080/user/login", params, r => {
            if(r.data.result === "用户名或密码不正确"){
               new Error("用户名或密码不正确");
            }else{

              store.commit("login", {
                account: r.data.result.name
                }); 
              that.$router.push({path:"./userCenter", query:{ telnum:that.ruleForm.phone }});
            }
          });

          //  调用登录的接口
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // 检验时候已注册
    checkedRegistered() {
      return {
        data: {
          status: true
        }
      };
    },
    // 切换到注册页
    goRegistered() {
      var that = this;
      that.$router.push("./register");
    },
    // 管理员登录
    adminLogin() {
      var that = this;
      that.$router.push("./loginAdmin");
    }
  }
};
</script>
<style>
 body{
        padding: 0;
        margin: 0;
          /* background:#F2F6FC;
    background: url("assets/images/background2.png") no-repeat */
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

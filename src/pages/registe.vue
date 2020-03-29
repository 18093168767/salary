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
            <!-- 未注册用户 -->
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="ruleForm.phone" autocomplete="off"></el-input>
            </el-form-item>
            <!-- 注册时获取验证码 -->
            <div style="text-align:left;padding-bottom:20px;">
              <span>
                <el-form-item label prop="VerificationCode">
                  <el-input
                    placeholder="请输入6位验证码"
                    style="width:200px;"
                    v-model="ruleForm.VerificationCode"
                  ></el-input>
                  <el-link
                    @click="getVerificationCode()"
                    type="warning"
                    :disabled="getVerifCodeDisable"
                  >点击获取验证码</el-link>
                  <span
                    v-if="isShowtimeCount"
                    style="font-size:12px;position:relative;top:2px;"
                  >{{timeCount}}s后重试</span>
                </el-form-item>
              </span>
            </div>
            <el-form-item label="密码" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </el-form-item>
          </el-form>
          <div
            style="position:absolute;bottom:0;left:20px;font-size:14px;color:#E6A23C;cursor: pointer; font-family: 'Helvetica Neue'"
          >
            <el-switch
              v-model="switchValue"
              active-color="#13ce66"
              :change="swithChange(switchValue)"
              inactive-color="#ff4949"
            ></el-switch>
            <span>{{volidTipMsg}}</span>
          </div>
          <div
            style="position:absolute;bottom:0;right:0;font-size:14px;color:#E6A23C;cursor: pointer;
                font-family: 'Helvetica Neue'"
          >
            <span @click="userLogin()">{{loginRole}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var that = this;
    return {
        volidTipMsg:"关闭电信手机号校验",
      switchValue: true,
      loginRole: "用户登录",
      isShowtimeCount: false,
      timeCount: 10,
      getVerifCodeDisable: true,
      ruleForm: {
        phone: "",
        pass: "",
        checkPass: "",
        VerificationCode: ""
      },
      checkedRegisteredStatus: false,
      checkVerificationCodeStatus: "",
      reg: /^1{1}\d{10}$/,
      rules: {
        phone: [{ validator: this.validatePhone, trigger: "blur" }],
        VerificationCode: [{ validator: this.VerificationCode, trigger: "blur" }],
        pass: [{ validator: this.validatePass, trigger: "blur" }],
        checkPass: [{ validator: this.validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
     validatePhone (rule, value, callback) {
       var that = this;
      if (value === "") {
        callback(new Error("手机号不能为空"));
        that.getVerifCodeDisable = true;
      } else if (!that.reg.test(value)) {
        callback(new Error("请输入电信手机号"));
        that.getVerifCodeDisable = true;
      } else {
        that.checkedRegistered();
        if (that.checkedRegisteredStatus) {
          callback(new Error("该手机号已注册，请直接登录！"));
        }
        if (that.ruleForm.VerificationCode !== "") {
          that.$refs.ruleForm.validateField("VerificationCode");
        }
        callback();
        that.getVerifCodeDisable = false;
      }
    },

      VerificationCode (rule, value, callback) {
         var that = this;
        var reg = /^\d{6}$/;
        if (value === "") {
          callback(new Error("请输入验证码"));
        }
        if (!reg.test(value)) {
          callback(new Error("验证码格式有误"));
        } else {
          that.checkVerificationCode();
          if(that.checkVerificationCodeStatus !== "" && that.checkVerificationCodeStatus !== "success"){
            callback(new Error("验证码有误，请重新输入"));
          }
          if (that.ruleForm.pass !== "") {
            that.$refs.ruleForm.validateField("pass");
          }
          callback();
        }
    },
    validatePass (rule, value, callback) {
       var that = this;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (that.ruleForm.checkPass !== "") {
          that.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    },
    validatePass2 (rule, value, callback) {
       var that = this;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== that.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
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
    //   用户注册
    submitForm(formName) {
      var that = this;
      console.log(formName);
      that.$refs[formName].validate(valid => {
        if (valid) {
          var param = {
            telnum: that.ruleForm.phone,
            password: that.ruleForm.pass
          }
        
        that.$api.post("http://49.4.87.4:8080/user/updateUser", param, r => {
          //  调用登录的接口
          that.$router.push("./login");
        });
        } 


      });
    },
    // 用户登录
    userLogin() {
      var that = this;
      that.$router.push("./login");
    },
    checkedRegistered() {
      var that = this;
      var param = that.ruleForm.phone
       that.$api.get("http://49.4.87.4:8080/user/isRegistered/" + param, null, r => {
         console.log(r.data.result)
         if(r.data.result){
            that.$message("手机号已注册，请重新输入");
          that.getVerifCodeDisable = true;
         }else{
  that.getVerifCodeDisable = false;
           
         }
         that.checkedRegisteredStatus = r.data.result;
      })
    },
    getVerificationCode() {
      var that = this;
      var param = that.ruleForm.phone;
      that.$api.get("http://49.4.87.4:8080/user/sendTelCode/" + param, null, r => {
         console.log(r.data.result)
        //  that.checkedRegisteredStatus = r.data.result;
      })


      var that = this;
      that.isShowtimeCount = true;
      that.getVerifCodeDisable = true;
      let clock = window.setInterval(() => {
        that.timeCount--;
        if (that.timeCount < 0) {
          clearInterval(clock);
          that.timeCount = 10;
          that.isShowtimeCount = false;
          that.getVerifCodeDisable = false;
          // })
        }
      }, 1000);
    },
    checkVerificationCode() {
      var that = this;
        var telnum = that.ruleForm.phone;
        var code = that.ruleForm.VerificationCode;
         that.$api.get("http://49.4.87.4:8080/user/checkTelCode/" + telnum +"/"+ code, null, r => {
         console.log(r.data.result)
         that.checkVerificationCodeStatus = r.data.result;
          if(that.checkVerificationCodeStatus !== "success"){
             that.$message(that.checkVerificationCodeStatus);
          }
      })
    }
  }
};
</script>
<style>
body {
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

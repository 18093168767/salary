<template>
  <div class="user-center">
        <login-header></login-header>
    <!-- 用户基本信息 -->
    <div>
      <div
        style="font-size:16px;font-weight: bold;;color:#303133;text-align:left;padding:20px 0;"
      >用户基本信息</div>
      <div class="card" style="display:flex;justify-content: space-between">
        <div style="width:30%;background:#fff;padding-left:10px;padding-top:10px;">
          <el-form style="position:relative;" label-width="80px">
            <el-form-item style="margin-bottom:1px"  :label-width="formLabelWidth2" label="姓名">
               <template>
              <div
                style="padding-left:10px;text-align:left;color:#60626;font-family:'Avenir', Helvetica, Arial, sans-serif"
              >{{userMsg.name}}</div>
            </template>
            </el-form-item>
            <el-form-item style="margin-bottom:1px" :label-width="formLabelWidth2" label="手机号">
              <div
                style="padding-left:10px;text-align:left;color:#60626;font-family:'Avenir', Helvetica, Arial, sans-serif"
              >{{userMsg.telnum}}</div>
            </el-form-item>
            <el-form-item  style="margin-bottom:1px" :label-width="formLabelWidth2" label="家庭住址">
              <div
                style="padding-left:10px;text-align:left;color:#60626;font-family:'Avenir', Helvetica, Arial, sans-serif"
              >{{userMsg.address}}</div>
            </el-form-item>
            <el-form-item  style="margin-bottom:1px"  :label-width="formLabelWidth2" label="其他">
              <div
                style="padding-left:10px;text-align:left;color:#60626;font-family:'Avenir', Helvetica, Arial, sans-serif"
              >{{userMsg.otherMsg}}</div>
            </el-form-item>
            <el-form-item style="margin-bottom:1px" :label-width="formLabelWidth2" label="正式工作时间">
              <div
                style="padding-left:10px;text-align:left;color:#60626;font-family:'Avenir', Helvetica, Arial, sans-serif"
              >{{userMsg.startWorkTime | dateformat('YYYY-MM-DD')}}</div>
            </el-form-item>
            <el-form-item style="margin-bottom:1px" :label-width="formLabelWidth2" label="工作结束时间">
              <div
                style="padding-left:10px;text-align:left;color:#60626;font-family:'Avenir', Helvetica, Arial, sans-serif"
              >{{userMsg.endWorkTime | dateformat('YYYY-MM-DD')}}</div>
            </el-form-item>
            <el-button style="position:absolute;bottom:-4px;right:20px;" type="text" @click="dialogVisible = true">编辑</el-button>
          </el-form>
          <el-dialog
            title="编辑"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form :model="userMsg">
                <el-form-item label="姓名" :label-width="formLabelWidth2">
                    <el-input v-model="userMsg.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" :label-width="formLabelWidth2">
                    <el-input :disabled="true" v-model="userMsg.telnum" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="家庭住址" :label-width="formLabelWidth2">
                    <el-input v-model="userMsg.address" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="其他信息" :label-width="formLabelWidth2">
                    <el-input v-model="userMsg.otherMsg" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="正式工作时间" :label-width="formLabelWidth2">
                  <el-date-picker
                  v-model="userMsg.startWorkTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                </el-form-item>
                <el-form-item label="工作结束时间" :label-width="formLabelWidth2">
                  <el-date-picker
                  v-model="userMsg.endWorkTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
                    <!-- <el-input v-model="userMsg.endWorkTime" autocomplete="off"></el-input> -->
                </el-form-item>
                
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel()">取 消</el-button>
                <el-button type="primary" @click="dialogVisibles()">确 定</el-button>
            </span>
            </el-dialog>
        </div>
        <!--人物 -->
        <div style="width:21%;background:#fff;">
          <div style="padding-top:46px;">
            <i v-if="imageUrlAvator === null" class="el-icon-upload" style="font-size:62px;color:#c0c4cc;"></i>
            <div v-if="imageUrlAvator === null" style="font-size:12px;color:#606266;padding:5px 0 10px;">暂无个人头像</div>
            <img v-if="imageUrlAvator !== null" style="width:220;height:130px;" :src="imageUrlAvator">
            <el-upload
              ref="upload"
              :auto-upload="false"
              :multiple="false"
              :limit="1"
              :on-success="handleAvatarSuccess"
              :http-request="uploadFiles"
              accept="image/jpeg, image/gif, image/png"
              action
            >
              <el-button slot="trigger" size="mini" type="primary">选取图片</el-button>
              <span>&nbsp;</span>
              <el-button @click="uploadFiles('avator')" size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <!--省份证 -->
        <div style="width:21%;background:#fff;">
          <div style="padding-top:46px;">
            <i v-if="imageUrlIdCard === null" class="el-icon-upload" style="font-size:62px;color:#c0c4cc;"></i>
            <div v-if="imageUrlIdCard === null" style="font-size:12px;color:#606266;padding:5px 0 10px;">暂无身份证照片</div>
            <img v-if="imageUrlIdCard !== null" style="width:220;height:130px;" :src="imageUrlIdCard">
            <el-upload
              ref="upload2"
              :auto-upload="false"
              :multiple="false"
              :limit="1"
              :on-success="handleAvatarSuccess"
              :http-request="uploadFiles"
              accept="image/jpeg, image/gif, image/png"
              action
            >
              <el-button slot="trigger" size="mini" type="primary">选取图片</el-button>
              <span>&nbsp;</span>
              <el-button @click="uploadFiles('IdCard')" size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
        <!--银行卡 -->
        <div style="width:21%;background:#fff;">
          <div style="padding-top:46px;">
            <i v-if="imageUrlBankCard === null" class="el-icon-upload" style="font-size:62px;color:#c0c4cc;"></i>
            <div v-if="imageUrlBankCard === null" style="font-size:12px;color:#606266;padding:5px 0 10px;">暂无银行卡照片</div>
            <img v-if="imageUrlBankCard !== null" style="width:220;height:130px;" :src="imageUrlBankCard">
            <el-upload
              ref="upload3"
              :auto-upload="false"
              :multiple="false"
              :limit="1"
              :on-success="handleAvatarSuccess"
              :http-request="uploadFiles"
              accept="image/jpeg, image/gif, image/png"
              action
            >
              <el-button slot="trigger" size="mini" type="primary">选取图片</el-button>
              <span>&nbsp;</span>
              <el-button @click="uploadFiles('bankCard')" size="mini" type="primary">点击上传</el-button>
            </el-upload>
          </div>
        </div>
      </div>
    </div>
    <!-- 工资部分 -->
    <div>
      <div
        style="font-size:16px;font-weight: bold;;color:#303133;text-align:left;padding:20px 0;"
      >工资详情</div>
      <div style="text-align:left;padding:0 20px 20px;">
        <span>选择年份</span>
        <span>
          <el-select v-model="value" placeholder="请选择年份" @change="onSelectedDate(value)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </span>
      </div>
      <div style="padding:20px;background:#fff;">
        <el-table :data="userSalary" style="width: 100%">
          <el-table-column label="日期" width="150">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.month }}月</span>
            </template>
          </el-table-column>
          <el-table-column label="基本工资" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.baseWage}}</span>
            </template>
          </el-table-column>
          <el-table-column label="绩效、奖金" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.otherWage}}</span>
            </template>
          </el-table-column>
          <el-table-column label="社保、上税" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.deduction}}</span>
            </template>
          </el-table-column>
          <el-table-column label="应发工资" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.baseWage + scope.row.otherWage - scope.row.deduction}}</span>
            </template>
          </el-table-column>
          <el-table-column label="反馈信息" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.feedBackInfo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="申批信息" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.approvalInfo}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="warning"
                @click="dialogVisibleFeedBackFun(scope.row)"
              >反馈</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog
            title="反馈"
            :visible.sync="dialogVisibleFeedBack"
            width="30%">
            <el-form :model="formUserFeedBack">
                <el-form-item label="问题" :label-width="formLabelWidth">
                    <el-input v-model="formUserFeedBack.desc" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleFeedBack = false">取 消</el-button>
                <el-button type="primary" @click="dialogFeedBack(formUserFeedBack.desc)">确 定</el-button>
            </span>
            </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../store";
import LoginHeader from "@/components/loginHeader";
export default {
   components: {
    LoginHeader
  },
  data() {
    return {
       formLabelWidth2: "120px",
       formLabelWidth: "80px",
        formUserFeedBack:{
            desc:""
        },
      vipList: [],
      options: [
        {
          value: "2018",
          label: "2018年"
        },
        {
          value: "2019",
          label: "2019年"
        },
        {
          value: "2020",
          label: "2020年"
        }
      ],
      value: "2020",
      userSalary: null,
      dialogVisible: false,
      dialogVisibleFeedBack:false,
      imageUrl: "",
      imageUrlAvator: null,
      imageUrlIdCard:null,
      imageUrlBankCard:null,
      userMsg: {
        name:"",
        telnum:"",
        address:"",
        otherMsg:"",
        startWorkTime:"",
        endWorkTime:""
      },
      userSalary:null,
      telnum:null,
      wageData:null
    };
  },
  mounted() {
    var that = this;
    that.findByTelnum();
  },
  methods: {
    getSalaryData(){
        var that = this;
        var year = that.value;
        var telnum = that.telnum;
        that.$api.get(
        "http://49.4.87.4:8080/wage/findByUserIdAndYear/" + year +"/" + telnum,
        null,
        r => {
          that.userSalary = r.data;
        }
      );
    },
    dialogVisibles (){
        this.updateUserBasic()
        this.dialogVisible = false;
    },
    dialogVisibleFeedBackFun(row){
      this.wageData = row;
      this.dialogVisibleFeedBack = true;
    },
    dialogFeedBack(desc){
        this.postFeedBack(desc);
        this.dialogVisibleFeedBack = false;
    }, 
    findByTelnum() {
      var that = this;
      that.$api.get(
        "http://49.4.87.4:8080/user/findByTelnum/" + this.$route.query.telnum,
        null,
        r => {
          that.userMsg = r.data.msg;
          that.telnum = r.data.msg.telnum;
          that.imageUrlAvator = r.data.msg.photoBase64;
          that.imageUrlIdCard = r.data.msg.idCardBase64;
          that.imageUrlBankCard = r.data.msg.bankCardBase64;
          that.getSalaryData()
        }
      )
    },
    handleAvatarSuccess(res, file) {
      var That = this;
      That.imageUrl = URL.createObjectURL(file.raw);
    },
    updateUserBasic(){
        var that = this;
        let param = that.userMsg;
        param.name = that.userMsg.name;
        param.telnum = that.userMsg.telnum;
        param.address = that.userMsg.address;
        param.otherMsg = that.userMsg.otherMsg;
         if(!Number.isInteger(param.endWorkTime)){
        param.endWorkTime = new Date(param.endWorkTime).getTime()
      }
      if(!Number.isInteger(param.startWorkTime)){
 param.startWorkTime = new Date(param.startWorkTime).getTime()
      }
        that.$api.post("http://49.4.87.4:8080/user/updateUser", param, r => {
          that.findByTelnum();
        });
    },
    postFeedBack(desc){
        var param = this.wageData;
        param.feedBackInfo = desc;
        var that = this;
        that.$api.post("http://49.4.87.4:8080/wage/update", param, r => {
          that.findByTelnum();
        });
    },
    //点击上传图片,上传成功返回图片路径
    uploadFiles(type) {
      let that = this;
       let file = null;
       if(type === "avator"){
          file = this.$refs.upload.$refs["upload-inner"].$refs.input; //获取文件数据
        }else if(type === "IdCard"){
           file = this.$refs.upload2.$refs["upload-inner"].$refs.input; //获取文件数据
        }else if(type === "bankCard"){
           file = this.$refs.upload3.$refs["upload-inner"].$refs.input; //获取文件数据
        }
      
      let fileList = file.files;
      var imgFile;
      let reader = new FileReader(); //html5读文件
      reader.readAsDataURL(fileList[0]); //转BASE64
      reader.onload = function(e) {
        //读取完毕后调用接口
        imgFile = e.target.result;
        let param = that.userMsg;
        if(type === "avator"){
          param.photoBase64 = imgFile;
        }else if(type === "IdCard"){
          param.idCardBase64 = imgFile;
        }else if(type === "bankCard"){
          param.bankCardBase64 = imgFile;
        }
        that.$api.post("http://49.4.87.4:8080/user/updateUser", param, r => {
          that.findByTelnum()
        });
      };
    },
    cancel(){
      var that = this;
      that.findByTelnum()
      that.dialogVisible = false
    },
    onSelectedDate(value){
      // 再调一下查询用户工资的接口
      this.getSalaryData()

    }
  }
};
</script>
  
<style>
.el-date-editor.el-input{
  width:100%;
}
.el-dialog__footer{
    text-align: center;
}
.el-dialog__header{
    text-align: left;
}
.card > div:hover {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
body {
  padding: 0;
  margin: 0;
}

.user-center {
  width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
}
.flex-start {
  display: flex;
  justify-content: start;
}
/* font-family: 'Helvetica Neue'" */
</style>


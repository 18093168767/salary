<template>
  <!-- 用户基本信息 -->
  <div class="user-center">
    <login-header></login-header>
    <div style="padding:20px 0"> 
      <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/adminCenter' }">用户列表</el-breadcrumb-item>
      <el-breadcrumb-item>用户工资信息</el-breadcrumb-item>
    </el-breadcrumb>
    </div>
    <div
      style="font-size:18px;font-weight: bold;;color:#303133;text-align:left;padding:10px 0;"
    >用户工资信息</div>
    <div style="padding-top:10px;display: flex;
     justify-content: space-between">
        <div>
            <el-button @click="addData()" type="primary">新增</el-button>
            <el-button type="danger"><a style="color:#fff;text-decoration:none;cursor: pointer;" :href="'http://49.4.87.4:8080/wage/export/' + userId + '/' + value" target="_blank">导出</a></el-button>
        </div>
        <div style="text-align:left;padding-bottom:20px">
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
    </div>
    <!--人物 -->
    <el-table :data="tableData" border style="width: 100%;padding:0 20px;">
      <el-table-column prop="month" label="月份" width="110">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
           <el-input style="width:60px;" v-if="scope.row.monthEdit" v-model="scope.row.month" placeholder="月份"></el-input>
          <span v-else>{{scope.row.month}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="110"></el-table-column>
      <el-table-column prop="baseWage" label="基本工资" width="110">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.baseWage" placeholder="基本工资"></el-input>
          <span v-else>{{scope.row.baseWage}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="otherWage" label="绩效工资" width="110">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.otherWage" placeholder="绩效工资"></el-input>
          <span v-else>{{scope.row.otherWage}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="deduction" label="个税" width="110">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.deduction" placeholder="请输入个税"></el-input>
          <span v-else>{{scope.row.deduction}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="feedBackInfo" label="用户反馈信息" width="180"></el-table-column>
      <el-table-column prop="approvalInfo" label="审批结果" width="180"></el-table-column>
      <el-table-column prop="provide" label="是否已发放" width="110">
        <template slot-scope="scope">
          <span v-if="scope.row.provide">已发放</span>
          <span v-else>未发放</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="280">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            type="text"
            size="medium"
            @click="confirmAdd(scope.row)"
          >完成</el-button>

          <div v-else>
            <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">删除</el-button>
            <el-button type="text" size="medium" @click="payroll(scope.row)">发放工资</el-button>
            <el-button @click="editSalary(scope.row)" type="text">编辑工资</el-button>
            <el-button type="text" size="medium" @click="approve(scope.row,scope.$index)">审批</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="审批" style="text-align:left" :visible.sync="dialogVisibleFeedBack" width="50%">
      <el-form :model="formUserFeedBack">
        <el-form-item style="text-align:left" label="问题" :label-width="formLabelWidth">
          <span>{{formUserFeedBack.feedbackMsg}}</span>
        </el-form-item>
        <el-form-item style="text-align:left" label="审批意见" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="7"
            style="wpadding-left:20px;width:540px;"
            v-model="formUserFeedBack.desc"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" style="text-align:center" class="dialog-footer">
        <el-button @click="dialogVisibleFeedBack = false">取 消</el-button>
        <el-button type="primary" @click="dialogFeedBack()">同意</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import LoginHeader from "@/components/loginHeader";
export default {
  components: {
    LoginHeader
  },
  data() {
    return {
      userId:null,
      telnum: this.$route.query.telnum,
      formLabelWidth: "120px",
      formUserFeedBack: {
        desc: "",
        feedbackMsg: ""
      },
      dialogVisibleFeedBack: false,
      tableData: [],
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
      dialogFeedBackData: null
    };
  },
  mounted() {
    var that = this;
    that.getSalaryData(that.value, that.telnum);
  },
  methods: {
    deleteData(row){
      var that = this;
      let param = row.id;
      that.$api.get("http://49.4.87.4:8080/wage/delete/"+param, null, r => {
           that.getSalaryData(that.value, that.telnum);
      })
    },
    addData(row, index) {
      var that = this;
      var param = {
          id: null,
          name:this.$route.query.name,
          userId: that.userId,
          year: that.value,
          month: null,
          baseWage: null,
          otherWage: null,
          deduction: null,
          feedBackInfo: "",
          approvalInfo: "",
          provide: false,
          edit:true,
          monthEdit:true,
      }
      that.tableData.splice(0, 0, param);
    },
    getSalaryData(year, telnum) {
      var that = this;
      that.$api.get(
        "http://49.4.87.4:8080/wage/findByUserIdAndYear/" + year + "/" + telnum,
        null,
        r => {
          if(r.data.length<1){
            return;
          }
          r.data.forEach(element => {
            element.edit = false;
            element.name = this.$route.query.name;
            element.monthEdit = false;
          });
          that.tableData = r.data;
          that.userId = r.data[0].userId;
        }
      );
    },
    //发放工资http://localhost:8080/wage/update
    payroll(row) {
      var that = this;
      let param = row;
      param.provide = true;
      that.$api.post("http://49.4.87.4:8080/wage/update", param, r => {
        that.getSalaryData(that.value, that.telnum);
      });
      //   row.edit = true;
    },
    //编辑工资
    editSalary(row, index) {
      row.edit = true;
    },
    confirmAdd(row, index) {
      var that = this;
      let param = row;
      param.userId = this.$route.query.userId;
      console.log(that.userId)
      console.log(param)
      that.$api.post("http://49.4.87.4:8080/wage/update", param, r => {
        that.getSalaryData(that.value, that.telnum);
      });
      row.edit = false;
    },
    // 审批
    approve(row, index) {
      var that = this;
      that.formUserFeedBack.feedbackMsg = row.feedBackInfo;
      that.formUserFeedBack.desc = row.approvalInfo;
      that.dialogFeedBackData = row;
      that.dialogVisibleFeedBack = true;
    },
    dialogFeedBack() {
      var that = this;
      let param = that.dialogFeedBackData;
      param.approvalInfo = that.formUserFeedBack.desc;
      that.$api.post("http://49.4.87.4:8080/wage/update", param, r => {
        that.getSalaryData(that.value, that.telnum);
      });
      this.dialogVisibleFeedBack = false;
    },
    onSelectedDate(value) {
      var that = this;
      that.value = value;
      // 再调一下查询用户工资的接口
      that.getSalaryData(that.value, that.telnum);
    }
  }
};
</script>

<style>
.el-dialog__footer {
  text-align: center;
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
</style>

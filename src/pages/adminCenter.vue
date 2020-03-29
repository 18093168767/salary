<template>
  <!-- 用户基本信息 -->
  <div class="user-center">
    <login-header></login-header>
    <div
      style="font-size:16px;font-weight: bold;;color:#303133;text-align:left;padding:20px 0;"
    >民工信息&nbsp;&nbsp;(人数：{{totalNum}})</div>
    <!--人物 -->
    <el-table :data="tableData" border style="width: 100%;padding:0 20px;">
      <el-table-column prop="name" label="姓名" width="130">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.name" placeholder="姓名"></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="telnum" label="手机号" width="180">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.telnum" placeholder="手机号"></el-input>
          <span v-else>{{scope.row.telnum}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="家庭地址" width="300">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.address" placeholder="住址"></el-input>
          <span v-else>{{scope.row.address}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="otherMsg" label="其他" width="200">
        <template slot-scope="scope">
          <el-input v-if="scope.row.edit" v-model="scope.row.otherMsg" placeholder="身份证号"></el-input>
          <span v-else>{{scope.row.otherMsg}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="startWorkTime" label="正式工作时间" width="200">
        <template slot-scope="scope">
            <el-date-picker
            v-if="scope.row.edit"
                  v-model="scope.row.startWorkTime"
                  type="date"
                  placeholder="选择正式工作日期">
                </el-date-picker>
          <!-- <el-input v-if="scope.row.edit" v-model="scope.row.startWorkTime" placeholder="正式工作时间"></el-input> -->
          <span v-else>{{scope.row.startWorkTime |  dateformat('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="endWorkTime" label="工作结束时间" width="200">
        <template slot-scope="scope">
           <el-date-picker
            v-if="scope.row.edit"
                  v-model="scope.row.endWorkTime"
                  type="date"
                  placeholder="工作结束时间">
                </el-date-picker>
          <!-- <el-input v-if="scope.row.edit" v-model="scope.row.endWorkTime" placeholder="工作结束时间"></el-input> -->
          <span v-else>{{scope.row.endWorkTime | dateformat('YYYY-MM-DD')}}</span>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.edit"
            type="text"
            size="medium"
            @click="confirmtelnumIsExist(scope.row)"
          >完成</el-button>
          <div v-else>
            <el-button type="text" size="medium" @click="editData(scope.row)">编辑</el-button>
            <el-button @click="querySalaryDetail(scope.row)" type="text">查看工资</el-button>
            <el-button type="text" size="medium" @click="deleteData(scope.row,scope.$index)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      style="text-align:left;padding-top:20px;"
      layout="prev, pager, next"
      @current-change="current_change"
      :page-size="pageSize"
      :total="totalNum"
    ></el-pagination>
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
      pageSize: 5,
      currentPage: 1,
      totalNum: null,
      tableData: [],
      updateObj: null
    };
  },
  mounted() {
    var that = this;
    that.findAll(that.pageSize, that.currentPage);
  },
  methods: {
    findAll(pageSize, currentPage) {
      var that = this;
      that.$api.get(
        "http://49.4.87.4:8080/user/findAll/" + pageSize + "/" + currentPage,
        null,
        r => {
          r.data.data.forEach(element => {
            element.edit = false;
          });
          that.totalNum = parseInt(r.data.totalNum);
          that.tableData = r.data.data;
        }
      );
    },
    current_change(currentPage) {
      var that = this;
      that.currentPage = currentPage;
      that.findAll(that.pageSize, that.currentPage);
    },
    //修改
    editData(row) {
      row.edit = true;
    },
    //删除
    deleteData(row, index) {
      var that = this;
      let param = row.id;
      that.$api.get("http://49.4.87.4:8080/user/delete/" + param, null, r => {
        that.findAll(that.pageSize, that.currentPage);
      });
    },
    //查询工资详情
    querySalaryDetail(row, index) {
      this.$router.push({
        path: "./userSalary",
        query: { telnum: row.telnum, name: row.name, userId: row.id }
      });
    },
    confirmtelnumIsExist(row) {
      var that = this;
      that.updateObj = row;
      that.$api.get(
        "http://49.4.87.4:8080/user/isAvaliable/" + row.telnum + "/" + row.id,
        null,
        this.confirmAdd,
        r => {}
      );
    },
    confirmAdd(res) {
      var that = this;
      let param = that.updateObj;
      if(!Number.isInteger(param.endWorkTime)){
        param.endWorkTime = new Date(param.endWorkTime).getTime()
      }
      if(!Number.isInteger(param.startWorkTime)){
 param.startWorkTime = new Date(param.startWorkTime).getTime()
      }

      if (res.data.result === true) {
        that.$api.post("http://49.4.87.4:8080/user/updateUser", param, r => {
          that.findAll(that.pageSize, that.currentPage);
        });
        that.updateObj.edit = false;
      } else {
        that.$message("手机号已注册，请重新输入");
      }
    }
  }
};
</script>

<style>
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

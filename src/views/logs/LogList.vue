<template>
  <div>
    <el-form :inline="true">
      <!-- 查询框 -->
      <el-form-item>
        <el-input v-model="filters.name" placeholder="姓名"></el-input>
      </el-form-item>
      <!-- 日期选择器 -->
      <el-form-item>
        <el-date-picker
          v-model="dateValue"
          type="daterange"
          align="left "
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          :default-time="['00:00:00', '23:59:59']"
        ></el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="findLog">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="logLists">
      <!-- 手动添加一个列，写入type="selection"，设置多选框 -->
      <el-table-column type="selection" width="55px"></el-table-column>
      <el-table-column label="序号" prop="l_id"></el-table-column>
      <el-table-column label="姓名" prop="nick"></el-table-column>
      <el-table-column label="内容" prop="content">
        <template v-slot="scope">
          <div v-html="scope.row.content">{{ scope.row.content }}</div>
        </template>
      </el-table-column>
      <el-table-column label="日期" prop="logtime" :formatter="formatTime"></el-table-column>
      <el-table-column label="操作" width="250px">
        <template v-slot="scope">
          <el-button
            type="primary"
            icon="el-icon-delete"
            size="small"
            @click="deleteLog(scope.row)"
          >删除</el-button>
          <el-button type="success" icon="el-icon-edit" size="small" @click="editor(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 
      编辑框组件
        :visible.sync="dialogVisible" Boolean值，控制弹框显示与隐藏
     -->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="50%" height="600px">
      <div>
        <el-card style="height: 500px">
          <quillEditor ref="quillEditor" style="height:400px" v-model="content" mid></quillEditor>
        </el-card>
        <el-button type="primary" style="margin-top: 10px; width: 100px" @click="onSaveLog">保存</el-button>
      </div>
    </el-dialog>
    <!-- 翻页组件 -->
    <el-pagination
      :total="logPager.total"
      :current-page="logPager.currentNo"
      :page-size="logPager.pageSize"
      @current-change="handleCurrentChange"
      layout="total, prev, pager, next, jumper"
      style="float:right;"
    ></el-pagination>
  </div>
</template>

<script>
import {
  RequestLogListPage,
  RequestDeleteLog,
  RequestUpdateLog
} from "@/api/LogApi.js";
import DataUtil from "@/utils/util_date.js";

import { quillEditor } from "vue-quill-editor"; // 引入富文本框组件

// 组件样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  components: { quillEditor }, // 注册富文本框组件
  data: function() {
    return {
      logLists: [],
      logPager: {
        total: 0, //总记录数
        currentNo: 1, //当前页号
        pageSize: 5, //每页记录数
        userName: "",
        startTime: "",
        endTime: ""
      },
      dialogVisible: false, // 编辑弹框的显示与否
      content: "", // 编辑日志时显示的文本内容s
      mid: "",
      filters: {
        // 输入框输入用户名
        name: ""
      },
      dateValue: "", // 日期选择器的时间值
      pickerOptions: {
        // 日期选择快捷方式
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      }
    };
  },
  created: function() {
    this.getLogListPage();
  },
  methods: {
    // 格式化时间
    formatTime: function(row) {
      return DataUtil.formatDate.format(new Date(row.logtime), "yyyy-MM-dd hh:mm:ss")
    },
    // 封装请求日志列表api的 方法
    getLogListApi: function(pageNo, userName, startTime, endTime) {
      RequestLogListPage(pageNo, userName, startTime, endTime)
        .then(res => {
          if (res.resultCode == 1) {
            this.logLists = res.resultInfo.list;
            this.logPager.total = res.resultInfo.total;
          }
        })
        .catch(err => {
          console.log("err>>>", err);
        });
    },
    // 请求日志列表数据方法
    getLogListPage: function() {
      const pageNo = this.logPager.currentNo;
      this.userName = this.$store.getters.user.nick;
      const userName = this.logPager.userName;
      console.log("userName>>>", userName);
      const startTime = this.logPager.startTime;
      const endTime = this.logPager.endTime;

      this.getLogListApi(pageNo, userName, startTime, endTime);
    },
    // 分页点击事件 pageno为当前点击的页面的页码数
    handleCurrentChange: function(pageno) {
      this.logPager.currentNo = pageno;

      this.getLogListPage(
        this.logPager.currentNo,
        this.logPager.userName,
        this.logPager.startTime,
        this.logPager.endTime
      );
    },
    // 删除日志的方法
    deleteLog: function(row) {
      // console.log("row<<<<<<<<<<<<", row);
      const id = row.l_id;
      this.$confirm("是否删除这条数据？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning" // 弹框类型为警告
      })
        .then(() => {
          RequestDeleteLog(id)
            .then(res => {
              // console.log("res>>>", res);
              if (res.resultCode == 1) {
                // 删除成功后，重新过请求一次列表数据
                this.getLogListPage();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(err => {
              console.log("err>>>", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除!"
          });
        });
    },
    // 编辑日志的方法
    editor: function(row) {
      // 显示弹框
      this.dialogVisible = true;
      console.log("thisRow>>>>>>>", row);
      // 富文本框的内容绑定content值，将编辑前的内容赋值给content,在富文本框中显示出来
      this.content = row.content;
      // 获取当前行的id
      this.mid = row.l_id;
    },
    // 保存日志的方法
    onSaveLog: function() {
      // 关闭弹窗
      this.dialogVisible = false;
      // 请求修改日志的接口
      RequestUpdateLog(this.mid, this.content)
        .then(res => {
          console.log("res>>>>", res);
          if (res.resultCode == 1) {
            this.$message({
              type: "success",
              message: "修改成功！"
            });
          }
          this.getLogListPage();
        })
        .catch(err => {
          console.log("err>>>>", err);
        });
    },
    // 查询用户信息
    findLog: function() {
      // this.getManagerList();
      this.logPager.userName = this.filters.name;
      console.log("this.logPager.userName>>>>", this.logPager.userName);
      if (this.dateValue) {
        this.logPager.startTime = DataUtil.formatDate.format(this.dateValue[0], "yyyy-MM-dd hh:mm:ss");
        this.logPager.endTime = DataUtil.formatDate.format(this.dateValue[1], "yyyy-MM-dd hh:mm:ss");
        console.log("this.logPager.startTime", this.logPager.startTime);
        console.log("this.logPager.endTime", this.logPager.endTime);
        this.getLogListApi(
          this.logPager.currentNo,
          this.logPager.userName,
          this.logPager.startTime,
          this.logPager.endTime
        );
        return;
      }

      this.getLogListApi(
        this.logPager.currentNo,
        this.logPager.userName,
        this.logPager.startTime,
        this.logPager.endTime
      );
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

<template>
  <div class="table-wrap">
    <template>
      <!-- 
        表格组件
          :data="tableData" 绑定数组数据tableData，
          border 设置表格线条
          stripe 设置表格斑马纹
      -->
      <el-table :data="tableData" border stripe height="800px" style="padding: 10px">
        <!-- 手动添加一个列，写入type="selection"，设置多选框 -->
        <el-table-column type="selection" width="55px"></el-table-column>
        <el-table-column label="序号" prop="uid" sortable width="80px"></el-table-column>
        <!-- 设置sortable属性，对该列进行排序 -->
        <el-table-column label="头像">
          <template v-slot:default="scope">
            <!-- :src="'http://it.warmtel.com'+scope.row.headerimg" -->
            <el-image style="width: 100px; height: 100px" :src="baseURL+scope.row.headerimg" fit="fill">
              <!-- 图片加载失败处理 -->
              <div slot="error">
                <el-image style="width: 100px; height: 100px" :src="picUrl" fit="fill"></el-image>
              </div>
            </el-image>
          </template>
        </el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="年龄" prop="age"></el-table-column>
        <el-table-column label="性别" prop="sex" :formatter="formatSex"></el-table-column>
        <el-table-column label="时间" prop="visittime" :formatter="formatTime"></el-table-column>
        <el-table-column label="目的" prop="visitgoal"></el-table-column>
        <el-table-column label="学历" prop="education"></el-table-column>
        <el-table-column label="单位" prop="company"></el-table-column>
        <el-table-column label="操作" width="160px">
          <!-- 通过 Scoped slot 可以获取到 row, column, $index 和 store（table 内部的状态管理）的数据 -->
          <template v-slot="scope">
            <!-- <el-button size="mini">编辑</el-button> -->
            <el-button size="mini">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!-- 
      设置分页组件
        total 显示总记录条数的小组件
          :total 设置总的记录条数的数值
        sizes 显示每一页显示的记录条数的小组件
          :page-sizes="[10, 20, 30]" 设置多种分页的记录条数的数值 
          :page-size="5"  设置一个页面显示记录条数的数值
        prev 向上翻页的小组件按钮
        pager 显示中间有多少页面的页码数
        next 向下翻页的小组件按钮
        jumper 设置直接跳转到第几页的小组件
          :current-page 设置跳转到第几页的页码的数值
        background 设置页码的背景
        @current-change 设置当页面页码改变时，执行该点击事件
        @size-change 当页面显示的数量大小变化时，执行该方法
    -->
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      :page-sizes="[5, 10, 20]"
      :current-page="pageNo"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
import { RequestUserList, RequestUserDelete } from "@/api/UserApi.js";
import { baseURL } from "@/api/request.js";
import DataUtil from "@/utils/util_date.js"

export default {
  data: function() {
    return {
      tableData: [],
      pageNo: 1, // 当前页号
      total: 0,
      pageSize: 5,
      picUrl: require("@/assets/images/timg.jpg"),
      baseURL
    };
  },
  created: function() {
    // 在生命周期的钩子函数created中去执行获取网络数据的函数onRequestUserList方法
    this.onRequestUserList(this.pageNo, this.pageSize);
  },
  methods: {
    // 初始化性别
    formatSex: function(row) {
      return row.sex == 1 ? "男" : "女";
    },
    // 格式化时间
    formatTime: function(row) {
      console.log("row>>>>>>>>><<<<<", row.visittime);
      // return DataUtil.onChangeDate(row.visittime);
      return DataUtil.formatDate.format(new Date(row.visittime), "yyyy-MM-dd hh:mm:ss")
    },
    // 删除一条数据的方法
    handleDelete(index, row) {
      // JSON.stringify() 将json对象转换成字符串
      console.log(`index : ${index}, row : ${JSON.stringify(row)}`);
      const uid = row.uid;
      console.log("uid>>", uid);
      // 提示框
      this.$confirm("是否删除这条记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning" // 弹框类型为警告
      })
        .then(() => {
          RequestUserDelete(uid)
            .then(res => {
              if (res.resultCode === 1) {
                // 删除成功后，重新过请求一次列表数据
                this.onRequestUserList(this.currentNo, this.pageSize);
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除!"
          });
        });
    },
    // 请求不同页号，显示不同页面的信息
    handleCurrentChange(val) {
      // val为当前页面的值
      // console.log("当前页码为：", val);
      this.onRequestUserList(val);
    },
    // 页大小转变事件,设置页面显示的记录条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.onRequestUserList(this.pageNo, this.pageSize);
    },
    // 将请求服务器数据封装成一个函数,参数为需要传进来的页码的值
    onRequestUserList(pageNo, pageSize) {
      // 此时将页码作为参数传到请求服务器数据的方法中RequestUserList，请求对应页码的数据
      RequestUserList(pageNo, pageSize)
        .then(data => {
          console.log("data>>>>", data);
          const result = data.resultInfo;
          // console.log("总记录数：", result.total);
          if (data.resultCode === 1) {
            this.total = result.total; // 获取总记录数数值
            this.pageSize = result.pageSize; // 获取每页显示的记录数数值
            this.currentNo = result.currentNo; // 获取当前页码的数值
            this.tableData = result.list; // 获取用户数组
          } else {
            return Promise.reject(new Error("请求出错"));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
}
</style>

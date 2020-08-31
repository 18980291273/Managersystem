<template>
  <div>
    <!--工具条-->
    <el-col :span="21" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <!-- v-on:input 监听input的输入值变化事件 -->
          <el-input v-model="filters.name" placeholder="姓名" v-on:input="getUser"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getUser">查询</el-button>a
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="3">
      <!-- 批量删除按钮 --> 
      <el-button type="danger" icon="el-icon-edit" @click="deleteAll()">批量删除</el-button>
    </el-col>
    <!-- 列表 -->
    <el-table :data="list" style="margin:0px 10px;" height="710px" ref="table">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" prop="id" width="60"></el-table-column>
      <el-table-column label="姓名" prop="name" sortable></el-table-column>
      <el-table-column label="地址" prop="addr" sortable></el-table-column>
      <el-table-column label="年龄" prop="age" sortable></el-table-column>
      <el-table-column label="生日" prop="birth" sortable></el-table-column>
      <el-table-column label="性别" prop="sex" :formatter="formatSex" sortable></el-table-column>

      <el-table-column label="操作" width="250">
        <template v-slot="scope">
          <el-button
            @click="onDelete(scope.row)"
            type="primary"
            size="small"
            icon="el-icon-delete"
          >删除</el-button>
          <el-button
            @click="onUpdate(scope.row.id,scope.row)"
            type="success"
            size="small"
            icon="el-icon-edit"
          >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      :total="userPager.total"
      :current-page.sync="userPager.currentNo"
      :page-size="userPager.pageSize"
      @current-change="handleCurrentChange"
      style="float:right;"
    ></el-pagination>
  </div>
</template>

<script>
import {
  RequestProductListPage,
  RequestProducDeleteByID,
  RequestProducDeleteBatch
} from "@/api/ProductApi.js";

export default {
  data: function() {
    return {
      list: [],
      ids: [],
      userPager: {
        total: 0, // 总记录数
        currentNo: 1, // 页号
        pageSize: 10 // 每页记录数
      },
      filters: {
        name: ""
      }
    };
  },
  created: function() {
    this.RequestProdcutListPageData();
  },
  methods: {
    //性别显示转换
    formatSex: function(row) {
      return row.sex == 1 ? "男" : "女";
    },
    // 获取商品列表
    RequestProdcutListPageData(name) {
      // 请求获取商品列表的接口
      RequestProductListPage(name, this.userPager.currentNo).then(res => {
        this.list = res.data.users;
        this.userPager.total = res.data.total;
      });
    },
    // 过滤查询商品
    getUser: function() {
      // trim()去掉字符串中的空格
      let name = this.filters.name.trim();
      // 获取数据的方法
      this.RequestProdcutListPageData(name);
    },
    // 分页点击事件
    handleCurrentChange: function(pageno) {
      this.userPager.currentNo = pageno;
      this.RequestProdcutListPageData();
    },
    // 删除一项
    onDelete: function(row) {
      console.log("row>>>>>>>>>", row);
      const mid = row.id;
      this.$confirm("是否删除这条记录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          RequestProducDeleteByID(mid)
            .then(res => {
              console.log("list>>>", this.list);
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功！"
                });
              }
              this.RequestProdcutListPageData();
            })
            .catch(err => {
              console.log("err>>>>>", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除!"
          });
        });
    },
    // 批量删除
    deleteAll: function() {
      // 获取多选框中选中状态的的数据 this.$refs.table.selection
      let selectedArry = this.$refs.table.selection;
      let oldIds = [];
      for (let i = 0; i < selectedArry.length; i++) {
        console.log(" selectedArry[i]>>", selectedArry[i]);
        oldIds.push(selectedArry[i].id);
      }
      this.$confirm("是否删除这条记录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning" // 弹框类型为警告
      })
        .then(() => {
          // 批量删除用户的接口需要传进的参数为一个id的字符串
          // oldIds.toString() 将数组转换成字符串
          RequestProducDeleteBatch(oldIds.toString())
            .then(res => {
              console.log("res>>", res);
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.RequestProdcutListPageData();
              }
            })
            .catch(err => {
              console.log("err>>", err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消删除!"
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

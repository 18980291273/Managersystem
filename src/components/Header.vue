<template>
  <el-row class="el-row" type="flex" justify="space-between">
    <el-col :span="6">
      <h1>后台管理系统</h1>
    </el-col>
    <el-col :span="3" class="right">
      <!-- 
        el-dropdown 下拉菜单
          @command="handleCommand" 下拉菜单的点击事件设置
       -->
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link headerimg">
          <el-avatar size="medium" :src="headerImg" style="vertical-align: middle; margin-right: 10px;"></el-avatar>
          <span>{{nick}}</span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="set" icon="el-icon-circle-plus-outline">设置</el-dropdown-item>
          <el-dropdown-item command="help" icon="el-icon-check">帮助</el-dropdown-item>
          <el-dropdown-item command="exit" icon="el-icon-circle-check">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

    </el-col>
  </el-row>
</template>

<script>
import { RequestLogout } from "@/api/IndexApi.js";
import { baseURL } from "@/api/request.js";
// import { deleteAllTagFromCookie, getTagFromCookie } from "@/common/cookieTag.js";
import { DeleteToken } from "@/common/tokenCookie.js";

export default {
  name: "Header",
  data: function() {
    return {
      baseURL
    };
  },
  computed: {
    nick: function() {
      // 从存储在本地的数据中取出用户昵称
      return this.$store.getters.user.nick;
    },
    headerImg: function() {
      // 从存储在本地的数据中取出用户头像
      console.log(this.baseURL + this.$store.getters.user.headerimg);
      return this.baseURL + this.$store.getters.user.headerimg;
    }
  },
  methods: {
    logout: function() {
      RequestLogout()
        .then(data => {
          // console.log('data', data);
          if (data.resultCode === 1) {
            // 清除token值
            DeleteToken();            
            // 清除存放在cookie中的标签数组的所有项
            this.$store.dispatch("deleteAllTag");
            // 页面跳转到登录页面
            this.$router.replace({ path: "/login" });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCommand: function(command) {
      if (command === "exit") {
        this.logout();
      } 
    }
  }
};
</script>

<style lang="scss" scoped>
.el-row {
  display: flex;
  align-items: center;
  h1 {
    text-align: center;
    color: white;
  }
}
.right {
  display: flex; 
}
.el-dropdown {
  color: white;
}
</style>

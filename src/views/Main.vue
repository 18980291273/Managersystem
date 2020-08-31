<template>
  <el-container class="wrap">
    <el-header style="height: 100px">
      <Header class="header"></Header>
    </el-header>
    <el-container>
      <div class="aside">
        <Menu class="menu"></Menu>
      </div>
      <el-main>
        <!-- 
          el-breadcrumb 面包屑组件
          separator-class="el-icon-arrow-right" 设置分隔符的字体图标
        -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index' }" style="margin-bottom: 20px;">首页</el-breadcrumb-item>
          <!-- 
            显示当前路由的标题
            $router.currentRoute 获取当前路由
          -->
          <el-breadcrumb-item>{{$router.currentRoute.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- tag标签组件 -->
        <TagView></TagView>
        
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入组件
import Header from "@/components/Header.vue";
import Menu from "@/components/Menu.vue";
import TagView from "@/components/TagView.vue";

export default {
  name: "Main",
  // 实例化组件
  components: {
    Header,
    Menu,
    TagView
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100vh;
}
.el-header {
  // background: linear-gradient(to top left, #70cfff, #c2ebff);
  background-color: #697480; 
  .header {
    height: 100px;
  }
}
.aside {
  background-color: #545c64;
  // background-color: #9dccfc;
}
.el-main {
  // background-color: #aaaaaa;
  background-color: rgb(226, 226, 226);
  padding: 30px;
}
</style>

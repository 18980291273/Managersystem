<template>
  <!-- 
    router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转
    unique-opened 是否只保持一个子菜单的展开
    :collapse="isCollapse" 控制导航条的左右展开和收缩
  -->
  <div>
    <h4 @click="openDownMenu" style="padding-top:10px">菜单</h4>
    <el-menu
      background-color="#545c64" 
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      unique-opened
      :collapse="isCollapse"
      class="el-menu-vertical-demo"
    >
      <!-- 设置index属性，保证他是唯一的标志，才能确保点击导航的时候，是当前点击的导航打开 -->
      <el-submenu :index="index + '1'" v-for="(menu, index) in menuList" :key="index">
        <template slot="title">
          <i :class="menu.iconCls"></i>
          <span>{{menu.meta.title}}</span>
        </template>
   
        <el-menu-item
          v-for="(menuChild, inde) in menu.children"
          :key="inde"
          :index="menuChild.path"
        >
          <i :class="menuChild.iconCls"></i>
          <span>{{menuChild.meta.title}}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: "Menu",
  data: function() {
    return {
      isCollapse: false
    };
  },
  computed: {
    menuList: function() {
      /**
       * 1. 旧的menu路由菜单数组为从菜单状态缓存中获取到的，其中包含了404错误提示的路由项
       * 2. 为了避免把404的路由菜单显示到el-menu菜单中，对旧的数组进行循环遍历；判断每个路由对象中的hidden值，为true为显示，为false为不显示，404提示路由的hidden为false
       * 3. 将hidden为true的放在一个新的菜单路由数组newMenuList里面，菜单循环显示也显示新的菜单路由数组newMenuList
       */ 
      let oldMenuList = this.$store.getters.menuList;
      const newMenuList = [];
      oldMenuList.forEach(element => {
        if (element.hidden) {
          newMenuList.push(element);
        }
      });
      
      console.log("newMenuList==============", newMenuList);
      return newMenuList;
    }
  },
  created: function() {
    
  },
  methods: {
    openDownMenu: function() {
      if (this.isCollapse === false) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
      console.log("this.isCollapse", this.isCollapse);  
    }
  }
};
</script>

<style lang="scss" scoped>
h4{
  color: white;
  // border: 1px solid red;
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.el-menu{
  border: none;
  padding: 0 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<template>
  <div id="app" class="appEle">
    <router-view />
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  created: function() {
    window.addEventListener("beforeunload", () => {
      console.log("页面刷新前");
    });

    console.log("页面刷新");
    /**
     *  每当页面刷新的时候，去执行储存菜单到store中
     *  每刷新一次，在store中也会重新去请求一次服务器的菜单的数据
     */
    this.$store.dispatch("saveMenu");
  }
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
.appEle {
  // background: url("./assets/images/bg.jpg") no-repeat center center;
  background-color: rgb(124, 119, 119);
  background-size: 100%;
  height: 100vh;
}
</style>

<template>
  <div class="tagwrap">
    <!-- 
      1. 在router-link中，to已经绑定了点击跳转的事件，
      2. 所以在router-link中绑定@click点击事件是没有作用的，
      3. 可以在router-link标签里面去定义一个标签去绑定@click点击事件
      4. 设置点击时的css样式绑定class，运用三目运算符
          :class="isActive(route) ? active : ''"
    -->
    <router-link
      :to="{ path: tagroute.path }"
      class="routerlink"
      v-for="tagroute in tagList"
      :key="tagroute.path"
      :class="isActive(tagroute) ? active : ''"
    >
      {{ tagroute.title }}
      <!-- 
        设置关闭字体图标，设置点击事件 
          设置点击事件的.prevent.stop修饰符，方式点击事件冒泡上去
      -->
      <span class="el-icon-close" @click.prevent.stop="delSelectTag(tagroute)"></span>
    </router-link>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      active: "active",
      tagViewBg: "tagViewBg"
    };
  },
  methods: {
    // 判断tag路由选中状态, route为当前点击的标签的路由
    isActive: function(tagroute) {
      /**
       *  1. route.path 遍历tagList中的我的标签route的path
       *  2. this.$route.path 点击当前路由对象的path
       *  3. 判断是否一致，一致的话表示当前为选中状态
       */
      return tagroute.path == this.$route.path;
    },
    delSelectTag: function(tagroute) {
      /**
       * 1. 调用vuex中删除标签的方法，将当前标签对象tagroute传进去，进行异步处理
       * 2. data为promise异步操作处理成功后返回的的数据
       */
      this.$store.dispatch("deleteTag", tagroute).then(data => {
        // 判断当前删除的标签的选中状态，选中的话，就跳到最后一个，未选中的话则不需要跳转
        if (this.isActive(tagroute)) {
          // slice(-1)选中data数组中最后一个元素并返回放在一个数组中
          const lastRoute = data.slice(-1)[0];
          // 判断数组中最后一个标签是否还存在，不存在的话就跳到首页index
          if (lastRoute) {
            // 路由跳转到最后一路由
            this.$router.push(lastRoute);
          } else {
            /**
             * 当页面跳转到首页时，watch侦听器会侦听到路由的变化；
             * 会再次执行储存路由状态到vuex中的操作，此时在首页会多出来一个标签；
             * 此时需要在侦听器中进行判断，当变化的路由是 index 时，不进行储存操作
             */
            this.$router.replace({ path: '/index' })
          }
        }
      });
    }
  },
  computed: {
    tagList: function() {
      let tagLists = this.$store.getters.tagList;
      return tagLists;
    }
  },
  watch: {
    // 直接监听路由的变化，当路由变化时，将当前路由对象保存到vuex当中去
    $route: function() {
      console.log("this.$route>>>>>>>>>>", this.$route);
      // 判断当前路由的path是index时，返回，不执行储存路由到vuex中去
      if (this.$route.path == '/index') return; 
      // 调用vuex中的添加方法
      this.$store.dispatch("addTag", this.$route);
    }
  }
};
</script>

<style lang="scss" scoped>
.tagwrap {
  margin-bottom: 20px;
  // padding: 10px 0;
  // background: red;
}
.routerlink {
  height: 30px;
  padding: 7px 15px;
  background-color: #f3f7f3;
  text-decoration: none;
  margin: 0 5px;
  font-size: 14px;
  color: black;
  &:hover {
    background-color: rgb(0, 180, 0);
    color: white;
  }
}
// 设置点击tag后的样式
.active {
  background-color: rgb(0, 180, 0);
  color: white;
  border-radius: 5px;
}
.tagViewBg {
  padding: 10px 0;
  background: red;
}
</style>>

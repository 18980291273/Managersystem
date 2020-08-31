<template>
  <div class="login">
    <!-- 
      :rules="rules"绑定表单校验规则，
      :model="user"进行表单校验时，需要绑定输入的信息数组 
      hide-required-asterisk=false 设置是否显示必填字段的标签旁边的红色星号
      ref="ruleForm" 将按钮和表单关联起来，好进行点击事件的操作
    -->
    <el-form @submit.prevent :rules="rules" :model="user" hide-required-asterisk ref="ruleForm">
      <el-form-item>
        <h1>后台管理系统</h1>
      </el-form-item>

      <!-- prop="name" 置为需要校验的字段名即可 -->
      <el-form-item label="帐号" prop="username">
        <el-input v-model="user.username" placeholder="请输入用户名" />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input v-model="user.password" type="password" placeholder="请输入密码" />
      </el-form-item>

      <el-form-item>
        <template>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </template>
      </el-form-item>

      <el-form-item>
        <!-- 你可以使用disabled属性来定义按钮是否可用，它接受一个Boolean值。 -->
        <el-button type="primary" size="medium" style="width: 100%" @click="onLogin">登录</el-button>
      </el-form-item>

      <el-form-item>
        <p>{{message}}</p>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Sha256 from "js-sha256"; // 对密码进行加密的组件
import { RequestLogin } from "@/api/IndexApi.js";
import { SetToken } from "@/common/tokenCookie.js";
import {
  savePswToCookie,
  clearPswFromCookie,
  getPswFromCookie
} from "@/common/cookiePsw.js";

export default {
  name: "Login",
  data: function() {
    return {
      user: {
        username: "",
        password: ""
      },
      checked: false,
      // 设置表单校验规则
      rules: {
        // 这里校验的字段username要与绑定的user.username名字相同
        username: [
          // required设置为必填项，不能为空；message为提示信息，trigger: 'blur'表示规则在失去焦点时会触发
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      message: ""
      // isRed: false
    };
  },
  created: function() {
    let that = this;
    document.onkeypress = function(e) {
      /**
       * 实现按Enter键登录
       * 三目运算符
       *  1. document.all 表示获得文档元素内所有 HTML 标记的集合
       *  2. event 和 e 为不同浏览器上的事件对象
       *  3. 每个按钮对应不得不同的数值，event.keyCode 和 e.which 获取按钮的数值
       *  4. enter键对应的数值为13
       */
      let keycode = document.all ? event.keyCode : e.which;

      if (keycode === 13) {
        that.onLogin(); // 登录方法名
        return false;
      }
    };
  },
  mounted: function() {
    /**
     *  判断cookie中是否保存用户信息，如果是的话，把保存的信息在页面显示出来，实现记住帐号和密码的功能
     */
    // 判断密码是否保存在cookie中
    let isRemember = getPswFromCookie();
    if (isRemember) {
      this.checked = true;
      this.user.username = isRemember.username;
      this.user.password = isRemember.password;
    } else {
      return null;
    }
  },
  methods: {
    onLogin: function() {
      this.$refs.ruleForm.validate(valid => {
        // 判断valid的值，为true时表示校验通过
        if (valid) {
          const userName = this.user.username;
          const psw = this.user.password;
          // 对密码进行加密
          const passWord = Sha256(psw);
          // this.user.password = passWord;

          if (this.checked == true) {
            console.log("记住密码：", this.checked, "保存到cookie");
            savePswToCookie(this.user);
          } else if (this.checked == false) {
            console.log("不记住密码：", this.checked, "清除cookie");
            clearPswFromCookie();
          }

          // axios请求数据 方法一：
          RequestLogin(userName, passWord)
            .then(data => {
              console.log("data>>>>>>", data);
              // const data = res.data;
              if (data.resultCode === 1) {
                /**
                 *  登录成功后，去请求菜单数据，并在本地vuex储存
                 *    这里将请求页面数据放在页面刷新时执行
                 *    当登录成功时，也代表页面刷新一次，整个Vue实例都会重新实例化一次
                 *    所以将刷新事件写到页面渲染的入口app.vue中
                 *    this.$store.dispatch("saveMenu");
                 */

                // 保存登录信息状态,localStorage对象对本地数据的存储
                // localStorage.setItem("loginUserState", userName);
                // res.data的token值为令牌，进行请求数据权限检测的,token存储

                // localStorage.setItem("token", data.token);
                // console.log("data.token<<<<<<<<<<<", data.token);
                // 保存token到cookie中
                // console.log("data", data);
                SetToken(data.token);

                // 将登录请求数据成功时，将登录的信息存储到本地vuex中, data.resultInfo为服务器响应回来的user对象
                const user = data.resultInfo;
                this.$store.dispatch("saveUser", user);

                // 登录成功后自动切换路由
                this.$router.replace({ path: "/index" });
              } else {
                this.message = data.resultInfo;
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("规则不通过！！！");
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 400px;
  padding: 50px;
  background-color: rgba(226, 226, 226, 0.7);
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
h1 {
  text-align: center;
}
p {
  color: red;
}
</style>

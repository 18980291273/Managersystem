import router from "@/router";
import { GetToken } from "@/common/tokenCookie.js"

// beforeEach导航守卫
router.beforeEach((to, from, next) => {
    console.log(`to: ${to.fullPath}   form: ${from.fullPath}`);
    const matchArray = to.matched;
    console.log("matchArray>>>", matchArray);
    // 判断数组中有没有记录满足条件，并将结果返回，有返回真，否则返回false，用常量isRerult接收，路由中的requiresAuth属性值为true的话表示该路由跳转不需要登录
    const isRerult = matchArray.some(item => !item.meta.requiresAuth);
    console.log("isRerult>>>", isRerult);
    // 当isRerult为假的时候，会执行next();为真的时候进行登录判断
    if (isRerult) {
      // 获取登录状态时行判断
      const loginUserState = GetToken();
      console.log('loginUserState token值>>>>', loginUserState);
      if (loginUserState) {
        next();
      } else {
        next('/login'); // 如果没有登录，跳转到登录界面
      }
    } else {
      next();
    }
  })

// import Vue from 'vue'
// import VueRouter from 'vue-router'

// Vue.use(VueRouter)

// 解决路由重复问题，当点击一个组件跳转到自己时，会有路由重复错误
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  //  return originalPush.call(this, location).catch(err => err)
   return originalPush.call(this, location)
}

const routes = [
  // 设置登录页面为主页面
  {
    path: '/',
    redirect: 'login', // 重新指定位置
    //  meta 路由元信息
    meta: {
      iShow: false,
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),  // 懒加载
    meta: {
      iShow: false,
      requiresAuth: true
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('@/views/Main.vue'),  // 懒加载
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('@/views/Index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history', // history模式
  // base: process.env.BASE_URL,
  base: process.env.NODE_ENV === 'production' ? '/' : '/yuguoxy/',
  routes
})

export default router

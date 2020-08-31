// import Axios from 'axios';
import { GetToken } from "@/common/tokenCookie.js"

// const baseURL = 'http://192.168.0.101:8088';
// const baseURL = 'http://it.warmtel.com';c
// 定义一个常量，接收请求数据的网址url头部
const baseURL = process.env.NODE_ENV === 'production' ? 'http://it.warmtel.com' : 'http://192.168.0.101:8088'
// 创建一个axios实例,封装
const instance = axios.create({
    baseURL,
    timeout: 1000
})

// 请求拦截器
instance.interceptors.request.use((config) => {
    // 在发送请求之前做些什么
    console.log('请求拦截器', config);
    // 设置token到请求头，发送到服务端
    const token = GetToken();
    if (token) {
        config.headers.common.Authorization = 'Bear ' + token;
    }
    // 这里必须返回config,这样请求才能正常往下请求数据
    return config;
}, (err) => {
    // 请求错误做些什么
    return Promise.reject(err);
})

// 响应拦截器
instance.interceptors.response.use((config) => {
    // 响应做些什么
    console.log('响应拦截器 ', config);
    // 将响应的data数据返回到函数调用处
    return config.data;
}, (err) => {
    // 对响应错误做些什么
    return Promise.reject(err);
})

// 暴露出去
export default instance;
export { baseURL };

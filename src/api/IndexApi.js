import instance from '@/api/request.js';

/** 登录接口API */
const RequestLogin = (username, password) => {
    return instance({
        url: '/api/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}
    
/** 退出登录接口API */
const RequestLogout = () => {
    return instance({
        url: '/api/logout',
        method: 'get' 
    })
}

/** 动态菜单接口API */
const RequestMneu = () => {
    return instance({
        url: '/api/sysmenu',
        method: 'get'
    })
}

export { RequestLogin, RequestLogout, RequestMneu }

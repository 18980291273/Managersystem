import instance from '@/api/request.js';

// 用户列表API 1
const RequestUser = () => {
    return instance({
        url: "/api/list",
        method: "get"
    })
}

// 分页用户列表API 2
// 将pageNo页号作为参数传进去，请求不同页面的数据 
const RequestUserList = (pageNo, pageSize) => {
    return instance({
        url: '/api/list_page?',
        method: 'get',
        // axios中将参数拼接到url地址后面 /api/list_page?pageNo=1
        params: {
            // pageNo: pageNo
            pageNo,
            pageSize
        }
    })
}

/** 
 * 添加用户接口 
 *   post请求方式时，参数用data传入
 *   fileHeader 参数为一个集成的包括username,psw,fileHeader的对象
 * */
const RequestUserAdd = (fromData) => {
    return instance({
        url: '/api/add',
        method: 'post',
        // 这里必须把头部设置成请求多媒体文件，这样才能将图片上传上去
        headers: { 'Content-Type': 'multipart/form-data' },
        data: fromData
    })
}

/**
 * 删除用户接口
 */
const RequestUserDelete = (uid) => {
    return instance({
        url: '/api/delete',
        method: 'get',
        params: {
            uid
        }
    })
}

export { RequestUser, RequestUserList, RequestUserAdd, RequestUserDelete };

import instance from "@/api/request.js";

/**
 * 管理员用户列表api
 */
const RequestManagerList = () => {
    return instance({
        url: '/api/manager/list',
        method: 'get'
    })
}

export { RequestManagerList }

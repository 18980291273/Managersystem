import instance from '@/api/request.js';

/** 添加日志api */
const RequestAddLog = (content, logtime, mid) => {
    return instance({
        url: '/api/logadd',
        method: 'post',
        data: {
            content,
            logtime,
            mid
        }
    })
}

/** 
 * 日志列表分页API
 */
const RequestLogListPage = (pageNo, name, startTime, endTime) => {
    return instance({
        url: '/api/log/list_page',
        method: 'get',
        params: {
            pageNo,
            name,
            startTime,
            endTime
        }
    })
}

/**
 * 删除日志API
 */
const RequestDeleteLog = (id) => {
    return instance({
        url: '/api/log/delete',
        method: 'get',
        params: {
            id
        }
    })
}

/**
 *  修改日志API
 */
const RequestUpdateLog = (id, content) => {
    return instance({
        url: '/api/log/update',
        method: 'post',
        data: {
            id,
            content
        }
    })
}

/**
 *  查询日志
 */
const RequestFind = (id) => {
    return instance({
        url: '/api/log/find',
        method: 'get',
        params: {
            id
        }
    })
}

export { RequestAddLog, RequestLogListPage, RequestDeleteLog, RequestUpdateLog, RequestFind }

import Axios from "axios";

// 产品列表Api
export const RequestProductList = (name) => {
    return Axios({
        url: '/api/product/list',
        method: 'get',
        params: {
            name: name
        }
    })
}

// 产品分页api
export const RequestProductListPage = (name, pageno) => {
    return Axios({
        url: '/api/product/listpage',
        method: 'get',
        params: {
            name: name,
            page: pageno
        }
    })
}

// 根据id删除API
export const RequestProducDeleteByID = (id) => {
    return Axios({
        url: '/api/product/remove',
        method: 'get',
        params: {
            id
        }
    })
}

// 批量删除API
export const RequestProducDeleteBatch = (ids) => {
    return Axios({
        url: '/api/product/batchremove',
        method: 'get',
        params: {
            ids: ids
        }
    })
}

export const RequestProductEdit = (user) => {
    return Axios({
        url: '/api/product/edit',
        method: 'get',
        params: {
            id: user.id, name: user.name, addr: user.addr, age: user.age, birth: user.birth, sex: user.sex
        }
    })
}

// 添加产品API
export const RequestProductAdd = (user) => {
    return Axios({
        url: '/api/product/add',
        method: 'get',
        params: {
            name: user.name, addr: user.addr, age: user.age, birth: user.birth, sex: user.sex
        }
    })
}

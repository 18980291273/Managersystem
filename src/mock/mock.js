import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Users } from "./data/user";

let _Users = Users;

export default {
    bootstrap() {
        let mock = new MockAdapter(axios);
        // 获取商品列表 
        // config是axios config 
        mock.onGet('/api/product/list').reply(config => {
            /* 
            config.params
             {name:'admin'}
            */
            let { name } = config.params;
            console.log(`name:  ${name}`);

            let mockUsers = _Users.filter(user => {
                // if (name && user.name.indexOf(name) == -1) return false;
                // return true; 
                return name && user.name.indexOf(name) == -1;
            });

            console.log(`mockUsers:  ${mockUsers}`);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        users: mockUsers
                    }]); //返回一个数组[status, data, headers] 
                }, 500);
            });
        });

        //获取用户列表（分页）
        mock.onGet('/api/product/listpage').reply(config => {
            let { page, name } = config.params;
            let mockUsers = _Users.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
                // return !(name && user.name.indexOf(name) == -1);
            });
            // console.log(`mockUsers:  ${mockUsers}`);

            let pageSize = 10; //每页记录数
            let total = mockUsers.length;
            mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        total: total,
                        users: mockUsers
                    }]);
                }, 400);
            });
        });

        //删除用户
        mock.onGet('/api/product/remove').reply(config => {
            let {
                id
            } = config.params;
            console.log("config.params???", config.params);
            
            _Users = _Users.filter(u => u.id !== id);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });
        //批量删除用户
        mock.onGet('/api/product/batchremove').reply(config => {
            let { ids } = config.params; // 1,2,3
            // console.log(ids);
            ids = ids.split(','); // 将字符串转换成数组[1,2,3]
            _Users = _Users.filter(u => !ids.includes(u.id));
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '删除成功'
                    }]);
                }, 500);
            });
        });

        //编辑用户
        mock.onGet('/api/product/edit').reply(config => {
            let {
                id,
                name,
                addr,
                age,
                birth,
                sex
            } = config.params;
            _Users.some(u => {
                if (u.id === id) {
                    u.name = name;
                    u.addr = addr;
                    u.age = age;
                    u.birth = birth;
                    u.sex = sex;
                    return true;
                }
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '编辑成功'
                    }]);
                }, 500);
            });
        });

        //新增用户
        mock.onGet('/api/product/add').reply(config => {
            let {
                name,
                addr,
                age,
                birth,
                sex
            } = config.params;
            console.log(`name ${name} addr: ${addr} age:${age}`)
            _Users.push({
                name: name,
                addr: addr,
                age: age,
                birth: birth,
                sex: sex
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200, {
                        code: 200,
                        msg: '新增成功'
                    }]);
                }, 500);
            });
        });
    }
}

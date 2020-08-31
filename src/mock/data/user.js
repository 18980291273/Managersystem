import Mock from "mockjs";

const Users = [];

// 手动创建json数据
for (let i = 0; i < 86; i++) {
    let mockItem = Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        // name: "@ctitle(10)",
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1)
    });
    // 将创建的数据添加到User数组中
    Users.push(mockItem);
}

export { Users };

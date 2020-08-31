// 动态导航menu的路由映射，这是的参数routes是一个路由数组，是网络请求到的json数据
export const formatRoutes = (menuRoutes) => {
    let newRoutersArry = [];
    // console.log("menuRoutes>>>", menuRoutes);
    // 遍历menuRoutes路由数组
    menuRoutes.forEach(route => {
        // 将路由数组中的属性值重新赋值到变量
        let path = route.path;
        let meta = route.meta;
        let name = route.name;
        let iconCls = route.iconCls;
        let hidden = route.hidden;
        let children = [];
        // 判断routes路由数组里面有子路由时，并且子路有为数组的时候，就递归调用函数本身，继续映射
        if (route.children && route.children instanceof Array) {
            children = formatRoutes(route.children);
        }
        // 组件映射
        let newRoute = {
            path,
            meta,
            name,
            iconCls,
            hidden,
            children,
            // component: () => import("@/views/goods/GoodsList.vue")
            component: function () {
                // 判断routes路由数组中的component，并映射返回新的component值
                switch (route.component) {
                    case "Main":
                        return import("@/views/Main.vue");
                        break;
                    case "UserList":
                        return import("@/views/user/UserList.vue");
                        break;
                    case "UserAdd":
                        return import("@/views/user/AddUser.vue");
                        break;
                    case "ProductList":
                        return import("@/views/Product/ProductsList.vue");
                        break;
                    case "ProductAdd":
                        return import("@/views/Product/AddProduct.vue");
                        break;
                    case "LogList":
                        return import("@/views/logs/LogList.vue");
                        break;
                    case "LogAdd":
                        return import("@/views/logs/AddLog.vue");
                        break;
                    case "ManagerList":
                        return import("@/views/manager/ManagerList.vue");
                        break;
                    case "MusicList":
                        return import("@/views/music/MusicList.vue");
                        break;
                    case "MusicAdd":
                        return import("@/views/music/AddMusic.vue");
                        break;
                }
            }
        };
        // 每遍历一次，就给新的路由项newRoute赋值一次，然后添加到新的数组中newRoutersArry
        newRoutersArry.push(newRoute);
    });
    // 将数组返回到函数调用处
    return newRoutersArry;
}

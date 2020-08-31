import { RequestMneu } from "@/api/IndexApi.js";
import { saveMenuToLocal } from "@/common/storgeMenu.js";
import { formatRoutes } from "@/utils/commom.js"

import router from '@/router';

export const MenuList = {
    state: {
        menuList: []
    },
    mutations: {
        SAVE_MENU(state, menuList) {
            // console.log('menuList>>>>>>>>>>>>>>', JSON.stringify(menuList));
            state.menuList = menuList;
            saveMenuToLocal(menuList);
        }
    },
    /**
     * 1. 当用户登录成功后，在actions方法中去请求菜单列表的数据
     * 2. 请求成功后，将数据提交到mutations
     * 3. mutations将数据保存到本地存储中
     */
    actions: {
        saveMenu({ commit }) {
            RequestMneu().then(data => {
                if (data.code === 200) {
                    // 调用路由映射的方法，将data.sysmenu路由数组作为参数传进去，并将返回的新的数组赋值给另一个新的数组routersArrys
                    let routersArrys = formatRoutes(data.sysmenu);

                    // console.log("routersArrys321>>>>>>>", routersArrys);

                    /**
                     *  当动态路由请求完都存放到routersArrys数组中去后；
                     *  将请求错误的404提示的路由添加到routersArrys数组中去；
                     *  这样做为了避免404提示路由写到静态路由中去的时候，在请求动态路由的时候，会进行异步操作，404提示路由的执行会比动态路由数组添加到路由组件中的速度快，
                     *      就会造成当动态路由页面刷新的时候，偶尔能请求到，偶尔会404提示路由
                     */ 
                    const latRoute = {
                        path: '*',
                        component: () => import('@/views/404.vue'),
                        hidden: false,
                        meta: {
                            title: "****",
                            iShow: false
                        }
                    };
                    routersArrys.push(latRoute);

                    // 将获得的新的路由数组routersArrys传到路由组件里面去
                    router.addRoutes(routersArrys);

                    // 3.将数据提交到mutations中
                    commit('SAVE_MENU', routersArrys);
                }
            })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}

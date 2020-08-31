import { getUserFromLocal } from "@/common/storgeUser";
import { getTagFromCookie } from "@/common/cookieTag.js"

export const Getters = {
    // 获取从服务器存储到本地User的vuex中的user的值，以便组件在外部调用 $store.getters.user
    user: state => {
        // 在获取user对象值的时候，进行判断，若从vuex中获取的state.User.user为空的话，就从localstorge中获取user对象，并赋值给state.User.
        if (!state.User.user) {
            state.User.user = getUserFromLocal();
        }
        return state.User.user;
    },
    // user: state => state.User.user,
    menuList: state => state.MenuList.menuList,
    tagList: state => {
        console.log("state.Tag.tagList>>>>><<<<<<<<<<<<<<<", state.Tag.tagList);
        
        if (state.Tag.tagList.length == 0) {
            state.Tag.tagList = getTagFromCookie();
            console.log("state.Tag.tagList~~~~~~~~~~~~~~~~~~~~~", state.Tag.tagList);
        }
        return state.Tag.tagList;
    }
}

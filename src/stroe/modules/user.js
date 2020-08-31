import { saveUserToLocal } from "@/common/storgeUser";

export const User = {
    state: {
        user: null
    },
    mutations: {
        // user为登录时候传进来的参数
        SAVE_USER(state, user) {
            // 将传进来的user数据存储到本地
            state.user = user;
             
            saveUserToLocal(user);
        }
    },
    actions: {
        saveUser({ commit }, user) {
            commit('SAVE_USER', user);
        }
    }
}

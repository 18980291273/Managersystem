import { saveTagToCookie, deleteAllTagFromCookie } from "@/common/cookieTag.js";
// import { , getTagFromCookie } from "@/common/cookieTag.js";

export const Tag = {
    state: {
        tagList: []
    },
    mutations: {
        // 将传进来的tag添加到tagList中
        ADD_Tag(state, tag) {
            /**
             *  点击tag时，去重处理
             *    1. 用some函数去判断当前点击的tag是否在数组中存在，只要有一项满足条件，将返回true 
             */
            console.log("state.tagList", state.tagList);
            const isResult = state.tagList.some(item => {
                return item.path == tag.path;
            })
            // 2. 判断当isResult为真的时候返回，为假的时候执行下面push的代码
            if (isResult) return;

            /** 
             * 3. 在将传进来的标签json对象进行cookie持久化存储的时候，因为标签json对象里面有一些数组，就会遇到不能将json数据转换成字符串的错误
             *   取出tag标签json对象中我们需要的值存放到一个新json数组中，将新的json数组添加到state中的tagList
             * */
            const newTagArr = {
                name: tag.name,
                path: tag.path,
                title: tag.meta.title
            }

            state.tagList.push(newTagArr);

            // 4. 将tagList存放到cookie中进行持久化存储
            saveTagToCookie(state.tagList);
        },
        // 删除tag时，对传进来的tag值进行判断，若该值存在，就将其删除
        DELETE_Tag(state, tag) {
            // 在vuex中将一个tag数据从tag数组中删除
            for (let i = 0; i <= state.tagList.length; i++) {
                if (state.tagList[i] == tag) {
                    state.tagList.splice(i, 1);
                    break;
                }
            }
            // 将删除tag数据后的state.tagList在存储一遍
            saveTagToCookie(state.tagList);
        },
        DELETE_ALL_TAG(state) {
            state.tagList = [];
            deleteAllTagFromCookie();
        }
    },
    actions: {
        addTag({ commit, state }, tag) {
            console.log("state.tagList<<<<<<<<<<<<", state.tagList);
            commit('ADD_Tag', tag);
        },
        deleteTag({ commit, state }, tag) {
            /**
             * 1. 利用promise异步处理，避免取vuex中的数据时，会取到旧的数据
             * 2. 将vuex中state存储的数据传进来
             * 3. 当外部调用删除tag标签方法时，进行完删除操作后tagList数组的数据会更新
             * 4. 将更新的数据展开copy一份，避免直接操作state存储的数据  
             * 5. 将copy的数据数据交给resolve处理，并返回
             * 6. resolve处理成功的数据        
             */
            return new Promise((resolve, reject) => {
                commit('DELETE_Tag', tag);
                resolve([...state.tagList]);
            })
        },
        deleteAllTag({ commit }) {
            commit('DELETE_ALL_TAG');
        }
    }
}

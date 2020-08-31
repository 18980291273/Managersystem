// import Vuex from "vuex";
// import Vue from "vue";
import { User } from "./modules/user"
import { MenuList } from "./modules/menuList";
import { Tag } from "./modules/tagList";
import { Getters } from "./getters"

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        User,
        MenuList,
        Tag
    },
    getters: Getters
})

export default store;

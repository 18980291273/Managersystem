
const SAVE_Tag = 'tag_key';

let Storeage = localStorage;

/**
 * 1. 存储
 */
const saveTagToLocal = function (tag) {
    // menuList为传进来的json数组对象，将其转换成字符串
    const tagStr = JSON.stringify(tag);
    Storeage.setItem(SAVE_Tag, tagStr);
}

/**
 * 2. 获取存储的值
 */
const getMenuFromLocal = function() {
    const tagStr = Storeage.getItem(SAVE_Tag);
    if (tagStr) {
         // 将从localstorge中获取的user字符串转换成json对象，并返回到函数调用处
         return JSON.parse(tagStr);
    } else {
        return null;
    }
}

/**
 * 3. 清除存储
 */
 const delMenuFromLocal = function() {
    Storeage.removeItem(SAVE_Tag);
 }

export { saveMenuToLocal, getMenuFromLocal, delMenuFromLocal }

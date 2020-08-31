/**
 * 对持久化存储用户进行封装
 */
const SAVE_MENU = 'menu_key';
let Storeage = localStorage;
// 1. 存储
const saveMenuToLocal = function (menuList) {
    // menuList为传进来的json数组对象，将其转换成字符串
    const menuStr = JSON.stringify(menuList);
    Storeage.setItem(SAVE_MENU, menuStr);
}
// 2. 获取存储的值
const getMenuFromLocal = function() {
    const userStr = Storeage.getItem(SAVE_MENU);
    if (userStr) {
         // 将从localstorge中获取的user字符串转换成json对象，并返回到函数调用处
         return JSON.parse(userStr);
    } else {
        return null;
    }
}
// 3. 清除存储
 const delMenuFromLocal = function() {
    Storeage.removeItem(SAVE_MENU);
 }

export { saveMenuToLocal, getMenuFromLocal, delMenuFromLocal }

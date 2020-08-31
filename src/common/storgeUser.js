/**
 * 对持久化存储用户进行封装
 */

const SAVE_USER = 'user_key';
/**
 * 若需要更换存储方式，直接改变存储对象即可
 * sessionStorage存储： let Storeage = sessionStorage;
 *      1. sessionStorage存储值，获取值语法与localStorage一直
 *         sessionStorage.setItem()
 *         sessionStorage.getItem()
 *         sessionStorage.removeItem()
 * cookie存储：let Storeage = cookie;
 *      1.cookie存储需要安装cookie，npm install js-cookie --save
 *      2.cookie设置存储，取值的时候，语法和localStorage有区别，没有Item
 *         cookie.set()
 *         cookie.get()
 *         cookie.remove()
 */
let Storeage = localStorage;

/**
 * 1. 存储
 */
const saveUserToLocal = function (user) {
    // user为传进来的json对象，将其转换成字符串
    const userStr = JSON.stringify(user);
    Storeage.setItem(SAVE_USER, userStr);
}

/**
 * 2. 获取存储的值
 */
const getUserFromLocal = function() {
    const userStr = Storeage.getItem(SAVE_USER);
    if (userStr) {
         // 将从localstorge中获取的user字符串转换成json对象，并返回到函数调用处
         return JSON.parse(userStr);
    } else {
        return null;
    }
}

/**
 * 3. 清除存储
 */

 const delUserFromLocal = function() {
    Storeage.removeItem(SAVE_USER);
 }

export { saveUserToLocal, getUserFromLocal, delUserFromLocal }

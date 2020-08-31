import Cookie from "js-cookie";

const SAVE_PSW = 'psw_key';

/**
 * 将密码存储到cookie中
 */
const savePswToCookie = (user) => {
    let userStr = JSON.stringify(user)
    console.log("userStr>>>", userStr);
    Cookie.set(SAVE_PSW, userStr);
}

/**
 * 清除存储在Cookie中的密码
 */
const clearPswFromCookie = () => {
    Cookie.remove(SAVE_PSW)
}

/**
 * 获取存储在cookie中的密码
 */
const getPswFromCookie = () => {
    const userStr = Cookie.get(SAVE_PSW);
    console.log("userStr>>>>", userStr);
    if (userStr) {
        return JSON.parse(userStr);
    } else {
        return null;
    }
}

export { savePswToCookie, clearPswFromCookie, getPswFromCookie }

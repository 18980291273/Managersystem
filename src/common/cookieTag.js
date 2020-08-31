
import Cookie from "js-cookie";
const SAVE_TAG = 'tag_key';

/**
 * 将标签数组持久存放到cookie中
 */
const saveTagToCookie = (tagList) => {
    // tagList传进来的参数为json对象，需要将其转换成字符在进行存储
    const tagListArr = JSON.stringify(tagList);
    Cookie.set(SAVE_TAG, tagListArr);
}

/**
 * 从cookie中获取数据
 */
const getTagFromCookie = () => {
    // 从cookie中获取数据后，外部需要的是json数据的话，要把获取字符串转换成json数据再返回
    const tagArr = Cookie.get(SAVE_TAG);
    if (tagArr) {
        return JSON.parse(tagArr);
    } else {
        return [];
    }
}

/**
 * 删除存储在cookie中的tag数组的所有内容
 */
const deleteAllTagFromCookie = () => {
    console.log("清除》》");
    Cookie.remove(SAVE_TAG);
}

export { saveTagToCookie, getTagFromCookie, deleteAllTagFromCookie }

/**
 * 封装ajax异步数据请求
 *  参数
 *  ｛
 *      url: '',     
 *      method: '',
 *      data: '',   //请求发送的数据
 *  ｝
 */

const ajaxPromise = (ajaxJson) => {
    // 函数封装promise对象,实例化Promise对象
    const promiseJson = new Promise((resolve, reject) => {
        // 具体异步操作
        // 1.创建XMLHttprequest
        const xhr = new window.XMLHttpRequest();
        // 2.建立连接
        xhr.open(ajaxJson.url, ajaxJson.method, true);
        // 3.发送请求
        xhr.send(ajaxJson.data);
        // 4.处理响应结果
        xhr.onreadystatechange = function (e) {
            const target = e.target;
            if (target.readyState === 4) { // 表示数据已经响应完成
                if (target.status === 200) { // 状态码 200: ok
                    resolve(target.responseText); // 函数调用,content实参
                } else {
                    reject(target);
                }
            }
        }
    });
    return promiseJson;
}

// 将模块暴露出去
export default ajaxPromise;

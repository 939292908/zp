import axios from 'axios'
import { getToken } from './authToken'
import store from '@/store'
import router from '@/router'
import { Message } from 'iview'
import VueCookies from 'vue-cookies'

window.axiosCancel = []; // 全局定义一个存放取消请求的标识
// create an axios instance
const service = axios.create({
    // baseURL: serverConfig.BASE_API, //process.env.BASE_API,//process.env.BASE_API, // api 的 base_url"/apis"
    timeout: 0, // request timeout,(0 表示无超时时间)
    maxContentLength: 52428890
})

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        config.headers['token'] = getToken()
        if (config.params && config.params.hasOwnProperty('token')) {
            config.params.token = getToken()
        }
        // 添加取消标记
        config.cancelToken = new axios.CancelToken(cancel => {
            window.axiosCancel.push({
                cancel,
                url: config.url
            })
        })
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        // console.log('response-success', response)
        const res = response.data
        if (res.code !== 200) {
            // 403:Token 过期了;
            if (res.code == 300 && (response.config.url.indexOf('loginOut') == -1)) {
                Message.warning("你的账号已掉线，请重新登录")
                // console.log('exitLogout')
                store.dispatch('exitLogout')
                router.push("/");
            } else if (res.code == 500 || response.status == 500) {
                Message.error("抱歉，服务器内部错误，请联系相关人员进行支持")
            } else if (res.code == 404 || response.status == 404) {
                Message.warning("请求错误,未找到该资源")
            }
            return response.data
        } else {
            return response.data
        }
    },
    error => {
        // console.log('response-error', error)
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.msg = '错误请求'
                    break;
                case 401:
                    error.msg = '未授权，请重新登录'
                    break;
                case 403:
                    error.msg = '拒绝访问'
                    break;
                case 404:
                    error.msg = '请求错误,未找到该资源'
                    break;
                case 405:
                    error.msg = '请求方法未允许'
                    break;
                case 408:
                    error.msg = '请求超时'
                    break;
                case 500:
                    error.msg = '服务器端出错'
                    break;
                case 501:
                    error.msg = '网络未实现'
                    break;
                case 502:
                    error.msg = '网络错误'
                    break;
                case 503:
                    error.msg = '服务不可用'
                    break;
                case 504:
                    error.msg = '网络超时'
                    break;
                case 505:
                    error.msg = 'http版本不支持该请求'
                    break;
                default:
                    error.msg = `连接错误${error.response.status}`
            }
        } else {
            error.msg = "连接到服务器失败"
        }
        // Message({
        //     message: error.msg,
        //     type: 'error',
        //     duration: 15 * 1000
        // })
        let response = (error.response && error.response.data) || error.response
        return Promise.reject(response)
    }
)

/**
 * GET Request
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} params [参数形式：{id:2323,name:zhangsan}]
 * @return {[type]}        [Axios]
 */
export function getAxios(url, params, defineHeader) {
    let options = {
        method: 'get',
        url,
        params
    }
    if (defineHeader) {
        options.headers = Object.assign({}, defineHeader)
    }
    return service(options)
}
/**
 * delete Request
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} params [参数形式：{id:2323,name:zhangsan}]
 * @return {[type]}        [Axios]
 */
export function deleteAxios(url, params, data, defineHeader) {
    let options = {
        method: 'delete',
        url,
        params,
        data
    }
    if (defineHeader) {
        options.headers = Object.assign({}, defineHeader)
    }
    return service(options)
}

/**
 * put Request
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} params [参数形式：{id:2323,name:zhangsan}]
 * @return {[type]}        [Axios]
 */
export function putAxios(url, params, data, defineHeader) {
    let options = {
        method: 'put',
        url,
        params,
        data
    }
    if (defineHeader) {
        options.headers = Object.assign({}, defineHeader)
    }
    return service(options)
}

/**
 * put Request
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} params [参数形式：{id:2323,name:zhangsan}]
 * @return {[type]}        [Axios]
 */
export function patchAxios(url, params, data, defineHeader) {
    let options = {
        method: 'patch',
        url,
        params,
        data
    }
    if (defineHeader) {
        options.headers = Object.assign({}, defineHeader)
    }
    return service(options)
}
/**
 * [application/json 形式提交]
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} data   [参数形式:{id:2323,name:zhangsan}]
 * @param  {[type]} params [{id:2323,name:zhangsan}]
 * @return {[type]}        [Axios]
 */
export function postJSON(url, data, params, defineHeader) {
    let headers = {
        'Content-Type': 'application/json'
    }
    let options = {
        method: 'post',
        url,
        data: data,
        params: params
    }
    options.headers = headers;
    if (defineHeader) {
        options.headers = Object.assign(headers, defineHeader)
    }
    return service(options)
}
/**
 * [body 提交]
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} params [参数形式：{id:2,name:zhangsan}]
 * @return {[type]}        [Axios]
 */
export function postAxios(url, params, defineHeader) {
    let headers = {
        'Content-Type': 'multipart/form-data',
    }
    let options = {
        method: 'post',
        url,
        params: params
    }
    options.headers = headers;
    if (defineHeader) {
        options.headers = Object.assign(headers, defineHeader)
    }
    return service(options)
}

/**
 * [body 提交]
 * @Author 桔子桑
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} params [参数形式：{id:2,name:zhangsan}]
 * @return {[type]}        [Axios]
 */
export function postData(url, data) {
    return service({
        method: 'post',
        url,
        data: data
    })
}

/**
 * [表单提交 请求]
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} data   [参数形式：id=1022&name=张三]
 * @param  {[type]} params [url参数]
 * @return {[type]}        [Axios]
 */
export function postForm(url, data, params, defineHeader) {
    let headers = {}
    let options = {
        method: 'post',
        url,
        data: data,
        params: params
    }
    if (defineHeader) {
        options.headers = Object.assign(headers, defineHeader)
    }
    return service(options)
}

/**
 * [上传 请求]
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} data   [参数形式：]
 * @param  {[type]} headerParam [对象类型]
 * @param  {[type]} params [url参数]
 * @return {[type]}        [Axios]
 */
export function postFile(url, params, data, headerParam) {
    var headers = {
        'Content-Type': 'multipart/form-data',
    }
    if (headerParam) {
        Object.assign(headers, headerParam)
    }
    return service({
        method: 'post',
        url,
        headers: headers,
        data: data,
        params: params
    })
}

/**
 * [获取文件]
 * @param  {[type]} url    [接口地址]
 * @param  {[type]} data   [参数形式：]
 * @param  {[type]} headerParam [对象类型]
 * @param  {[type]} params [url参数]
 * @return {[type]}        [Axios]
 */
export function getFile(url, params) {
    return service({
        method: 'get',
        url,
        responseType: "arraybuffer",
        params: params
    })
}

/**
 * 下载文件
 * @param {[type]} url
 * @param {[type]} data
 * @param {[type]} params
 */
export function blobFile(url, data, params) {
    return service({
        method: 'post',
        url,
        responseType: "blob",
        data: data,
        params: params
    })
}

/**
 * 下载文件
 * @param {[type]} url
 * @param {[type]} data
 * @param {[type]} params
 */
export function getBlobFile(url, data, params) {
    return service({
        method: 'get',
        url,
        responseType: "blob",
        data: data,
        params: params
    })
}

export function req(method,
    url,
    data = null,
    params = null,
    headers = { 'X-Requested-With': 'XMLHttpRequest' },
    responseType = 'json') {
    method = method.toLowerCase();
    let res = null;
    switch (method) {
        case 'get':
            res = service.get(url, { params: params, data: data, headers: headers, responseType: responseType });
            break;
        case 'post':
            res = service.post(url, data, { params: params, headers: headers, responseType: responseType });
            break;
        case 'post-json':
            let defaultHeaders = null
            if (headers) {
                defaultHeaders = Object.assign({
                    'Content-Type': 'application/json'
                }, headers)
            }
            res = service.post(url, data, { params: params, headers: defaultHeaders, responseType: responseType });
            break;
        case 'delete':
            res = service.delete(url, { params: params, data: data, headers: headers, responseType: responseType });
            break;
        case 'put':
            res = service.put(url, data, { params: params, headers: headers, responseType: responseType });
            break;
        case 'patch':
            res = service.patch(url, data, { params: params, headers: headers, responseType: responseType });
            break;
    }
    return res;
}

export default service

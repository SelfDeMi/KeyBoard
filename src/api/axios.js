import axios from 'axios'
import {message} from 'antd'
const Axios = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 6000,
  });
const main = (url,data={},type='get') => {
    return new Promise((resolve, reject) => {
        let promise
        //执行器函数
        if (type === 'get' || type === "GET") {
            promise = Axios.get(url, {
                params: data
            })
        } if (type === 'post' || type === "POST") {
            promise = Axios.post(
                url,
                data
            )
        }
        //请求成功的话
        promise.then(response => {
            //把内层的promise成功值 传给外层promise的成功回调
            resolve(response)
        }).catch(err =>{
        //请求失败的话
            //使用antd封装的message提示
            message.error("出错了!!!:"+err.message)
        })

    })
}
export default main
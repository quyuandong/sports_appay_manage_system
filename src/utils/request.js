// 封装axios
// 请求拦截和响应拦截
// import axios from "axios"
// import {Message,Loading } from "element-ui"

// let loading

// // 开始加载
// function startLoading() {
//     loading = Loading.service({
//         lock:true,
//         text:"拼命加载中...",
//         background:'rgba(0,0,0,0.5)'
//     })
// }
// // 结束加载
// function endLoading(){
//     loading.close()
// }

// // 请求拦截  
// axios.interceptors.request.use(config=>{
//     startLoading()
//     if(localStorage.eleToken){
//         config.headers.Authorization = localStorage.eleToken
//     }
//     return config
// },error=>{
//     return Promise.reject(error)
// })

// // 响应拦截  endLoading
// axios.interceptors.response.use(response=>{
//     endLoading()
//     return response
// },error=>{
//     endLoading()
//     Message.error(error.response.data)
//     const {status} = error.response
//     if(status == 401){
//         Message.error("token失效了,请重新登录")
//         // 清除老的token
//         localStorage.removeItem("eleToken")
//     }
//     return Promise.reject(error)
// })

// export default axios


// 封装axios
// 请求拦截和响应拦截
import axios from "axios"
import {Message,Loading } from "element-ui"

let loading

// 开始加载
function startLoading() {
    loading = Loading.service({
        lock:true,
        text:"拼命加载中...",
        background:'rgba(0,0,0,0.5)'
    })
}
// 结束加载
function endLoading(){
    loading.close()
}

// 请求拦截  
axios.interceptors.request.use(config=>{
    startLoading()
    if(localStorage.eleToken){
        config.headers.Authorization = localStorage.eleToken
    }
    return config
},error=>{
    return Promise.reject(error)
})

// 响应拦截  endLoading
axios.interceptors.response.use(response=>{
    endLoading()
    return response
},error=>{
    endLoading()
    Message.error(error.response.data)
    const {status} = error.response
    if(status == 401){
        Message.error("token失效了,请重新登录")
        // 清除老的token
        localStorage.removeItem("eleToken")
    }
    return Promise.reject(error)
})

export default axios
// 常用基本接口

// import http from '@/utils/request'
// let serverName = 'http://192.168.0.104:3003/api/'
// import axios from "axios"

// // 获取登陆用户信息
// export function login(params) {
//     axios.post(`${serverName}user/login`,params)
// }

import request from '../utils/request';

export const fetchData = query => {
    return request({
        url: './table.json',
        method: 'get',
        params: query
    });
};

import { get, post } from '@/utils/http';
const baseUrl = 'api/user'

//登录
export function login(params) {
    return post(`${baseUrl}/login`,params)
}

//注册管理员
export function teacherRegister(params) {
    return post(`${baseUrl}/teacherRegister`,params)
}

//注册运动员
export function studentRegister(params) {
    return post(`${baseUrl}/studentRegister`,params)
}

//上传头像
export function uploadImage(params) {
    return post(`/api/common/image`,params)
}

//更新当前管理员
export function updateAdmin(params) {
    return post(`${baseUrl}/update`,params)
}
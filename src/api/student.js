import { get, post } from '@/utils/http';
const baseUrl = 'api/student'

//添加运动员
export function addStudent(params) {
    return post(`${baseUrl}/add`,params)
}

//查询所有的运动员
export function getStudentList(params) {
    return post(`${baseUrl}/studentList`,params)
}

//更新当前运动员
export function updateStudent(params) {
    return post(`${baseUrl}/update`,params)
}

//删除运动员
export function deleteStudent(params) {
    return post(`${baseUrl}/delete`,params)
}

//获取当前没有审核的运动员
export function findStudentByApprover(params) {
    return post(`${baseUrl}/studentListByApprover`,params)
}

//修改当前密码
export function studentModifyPassword(params) {
    return post(`${baseUrl}/studentModifyPassword`,params)
}


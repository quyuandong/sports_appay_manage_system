import { get, post } from '@/utils/http';
const baseUrl = 'api/teacher'

//添加管理员
export function addTeacher(params) {
    return post(`${baseUrl}/add`,params)
}

//查询所有的管理员
export function getTeacherList(params) {
    return post(`${baseUrl}/teacherList`,params)
}

//更新当前管理员
export function updateTeacher(params) {
    return post(`${baseUrl}/update`,params)
}

//删除管理员
export function deleteTeacher(params) {
    return post(`${baseUrl}/delete`,params)
}

//获取当前没有审核的管理员
export function findTeacherByApprover(params) {
    return post(`${baseUrl}/teacherListByApprover`,params)
}

//修改当前密码
export function teacherModifyPassword(params) {
    return post(`${baseUrl}/teacherModifyPassword`,params)
}

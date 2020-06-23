import { get, post } from '@/utils/http';
const baseUrl = 'api/department'

//添加院系
export function addDepartment(params) {
    return post(`${baseUrl}/add`,params)
}

//查询分页所有的院系
export function getDepartmentList(params) {
    return post(`${baseUrl}/departmentList`,params)
}

//更新当前院系
export function updateDepartment(params) {
    return post(`${baseUrl}/update`,params)
}

//删除院系
export function deleteDepartment(params) {
    return post(`${baseUrl}/delete`,params)
}

//通过release获取当前的院系
export function findDepartmentByRelease(params) {
    return get(`${baseUrl}/departmentListByRelease`,params)
}

//查询所有的院系
export function getDepartmentAll() {
    return post(`${baseUrl}/departmentAll`)
}


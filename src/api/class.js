import { get, post } from '@/utils/http';
const baseUrl = 'api/classGrade'

//添加班级
export function addClassGrade(params) {
    return post(`${baseUrl}/add`,params)
}

//查询所有的班级
export function getClassGradeList(params) {
    return post(`${baseUrl}/classGradeList`,params)
}

//更新当前班级
export function updateClassGrade(params) {
    return post(`${baseUrl}/update`,params)
}

//删除班级
export function deleteClassGrade(params) {
    return post(`${baseUrl}/delete`,params)
}

//通过releas和did sid获取当前的专业 
export function findClassGradeByReleaseAndDidSid(params) {
    return post(`${baseUrl}/classGradeListByReleaseAndDidSid`,params)
}



//获取到所有的班级
export function getClassGradeAll() {
    return post(`${baseUrl}/classGradeAll`)
}
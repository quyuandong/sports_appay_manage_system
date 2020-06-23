import { get, post } from '@/utils/http';
const baseUrl = 'api/project'

//添加管理员
export function addProject(params) {
    return post(`${baseUrl}/add`,params)
}

//查询所有的管理员
export function getProjectList(params) {
    return post(`${baseUrl}/projectList`,params)
}

//更新当前管理员
export function updateProject(params) {
    return post(`${baseUrl}/update`,params)
}

//删除管理员
export function deleteProject(params) {
    return post(`${baseUrl}/delete`,params)
}

//获取当前没有审核的管理员
export function findProjectByApprover(params) {
    return post(`${baseUrl}/projectListByApprover`,params)
}



//获取当前的所有的项目
export function findApplyList(params) {
    return post(`${baseUrl}/applyList`,params)
}
import { get, post } from '@/utils/http';
const baseUrl = 'api/apply'


//获取当前的所有的项目
export function findApplyList(params) {
    return post(`${baseUrl}/applyList`,params)
}

//获取当前的所有的项目
export function findApplyAll() {
    return get(`${baseUrl}/applyAll`)
}

//更新当前项目
export function updateApply(params) {
    return post(`${baseUrl}/update`,params)
}

//删除项目
export function deleteApply(params) {
    return post(`${baseUrl}/delete`,params)
}

//获取当前审批的项目
export function findApplyByApprover(params) {
    return post(`${baseUrl}/applyListByApprover`,params)
}

//获取当前没有审核的项目
export function findApplyByNoApprover(params) {
    return post(`${baseUrl}/applyListByNoApprover`,params)
}

//获取当前没有审核的项目
export function findApplyByTeacherExport(params) {
    return post(`${baseUrl}/applyListByTeacherExport`,params)
}

//获取所有 院系已经审核通过的运行项目名称
export function findApplyByApproverDid(params) {
    return post(`${baseUrl}/applyListByApproverDid`,params)
}
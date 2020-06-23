import { get, post } from '@/utils/http';
const baseUrl = 'api/specialty'

//添加专业
export function addSpecialty(params) {
    return post(`${baseUrl}/add`,params)
}

//查询所有的专业
export function getSpecialtyList(params) {
    return post(`${baseUrl}/specialtyList`,params)
}

//更新当前专业
export function updateSpecialty(params) {
    return post(`${baseUrl}/update`,params)
}

//删除专业
export function deleteSpecialty(params) {
    return post(`${baseUrl}/delete`,params)
}

//通过release获取当前的专业
export function findSpecialtyByRelease(params) {
    return get(`${baseUrl}/specialtyListByRelease`,params)
}

//通过releas和id获取当前的专业 
export function findSpecialtyByReleaseAndDid(params) {
    return post(`${baseUrl}/specialtyListByReleaseAndDid`,params)
}

//查询所有的专业
export function getSpecialtyAll() {
    return post(`${baseUrl}/specialtyAll`)
}

//通过release获取当前的院系下的专业
export function findSpecialtyByDid(params) {
    return post(`${baseUrl}/specialtyListByDid`,params)
}
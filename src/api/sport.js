import { get, post } from '@/utils/http';
const baseUrl = 'api/sport'

//添加运动项目
export function addSport(params) {
    return post(`${baseUrl}/add`,params)
}

//查询所有的运动项目
export function getSportList(params) {
    return post(`${baseUrl}/sportList`,params)
}

//更新当前运动项目
export function updateSport(params) {
    return post(`${baseUrl}/update`,params)
}

//删除运动项目
export function deleteSport(params) {
    return post(`${baseUrl}/delete`,params)
}

//通过release获取当前的项目
export function findSportByRelease(params) {
    return post(`${baseUrl}/sportListByRelease`,params)
}
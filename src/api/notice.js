import { get, post } from '@/utils/http';
const baseUrl = 'api/notice'

//添加公告
export function addNotice(params) {
    return post(`${baseUrl}/add`,params)
}

//查询所有的公告
export function getNoticeList(params) {
    return post(`${baseUrl}/noticeList`,params)
}

//编辑公告
export function updateNotice(params) {
    return post(`${baseUrl}/update`,params)
}

//删除公告
export function deleteNotice(params) {
    return post(`${baseUrl}/delete`,params)
}
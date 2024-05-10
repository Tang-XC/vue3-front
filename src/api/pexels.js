import request from './request'
/**
 * 获取图片数据列表
 */
export const getPexelsList = (params) => {
  return request({
    method: 'GET',
    url: '/pexels/list',
    params: params
  })
}
/**
 * 获取搜索提示
 */
export const getHint = (q) => {
  return request({
    method: 'GET',
    url: '/pexels/hint',
    params: { q }
  })
}

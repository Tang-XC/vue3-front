import request from './request'
export const getPexelsList = (params) => {
  return request({
    method: 'GET',
    url: '/pexels/list',
    params: params
  })
}

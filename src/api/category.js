import request from './request'
export const getCategory = () => {
  return request({
    url: '/category',
    method: 'get'
  })
}

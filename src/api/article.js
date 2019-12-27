import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/admin/articles',
    method: 'get',
    params: data
  })
}

export function del(data) {
  return request({
    url: '/admin/articles',
    method: 'delete',
    data
  })
}

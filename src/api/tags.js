import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/admin/tags',
    method: 'get',
    params: data
  })
}

export function del(data) {
  return request({
    url: '/admin/tags',
    method: 'delete',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/tags',
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/admin/tags',
    method: 'post',
    data
  })
}

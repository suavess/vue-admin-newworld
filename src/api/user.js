import request from '@/utils/request'

export function list(data) {
  return request({
    url: '/admin/users',
    method: 'get',
    params: data
  })
}

export function del(data) {
  return request({
    url: '/admin/users',
    method: 'delete',
    data
  })
}

export function update(data) {
  return request({
    url: '/admin/users',
    method: 'put',
    data
  })
}

export function reset(data) {
  return request({
    url: '/admin/users/reset',
    method: 'post',
    data
  })
}

import request from '@/utils/request'

export function count() {
  return request({
    url: '/admin/count',
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/admin/login',
    method: 'post',
    data
  })
}

export function info() {
  return request({
    url: '/admin',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/admin',
    method: 'delete'
  })
}

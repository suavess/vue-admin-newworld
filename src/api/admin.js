import request from '@/utils/request'

export function count() {
  return request({
    url: '/admin/count',
    method: 'get'
  })
}

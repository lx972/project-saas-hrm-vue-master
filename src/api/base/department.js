import {createAPI} from '@/utils/request'

export const getTree = data => createAPI('/company/department', 'get', data)
export const deptFindById = data => createAPI(`/company/department/${data.id}`, 'get', data)
export const deptUpdate = data => createAPI(`/company/department/${data.id}`, 'put', data)
export const deptAdd = data => createAPI(`/company/department`, 'post', data)
export const deptDelete = data => createAPI(`/company/department/${data.id}`, 'delete', data)

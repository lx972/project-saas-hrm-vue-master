import {createAPI} from '@/utils/request'

export const list = data => createAPI('/system/role', 'get', data)
export const update = data => createAPI(`/system/user/role/${data.userId}`, 'put', data)
export const getUserRoles = data => createAPI(`/system/user/role/${data.userId}`, 'get', data)


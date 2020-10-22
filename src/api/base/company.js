import {createAPI} from '@/utils/request'

export const list = data => createAPI('/company/company', 'get', data)
export const detail = data => createAPI(`/company/company/${data.id}`, 'get', data)
export const updateAuditState = data => createAPI(`/company/company/${data.id}`, 'put', data)

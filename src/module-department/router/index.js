/*
 * @Author: itcast 
 * @Description: xxx业务模块 
 * @Date: 2018-04-13 16:13:27 
 * @Last Modified by: hans.taozhiwei
 * @Last Modified time: 2018-09-03 11:12:47
 */

import Layout from '@/module-dashboard/pages/layout'
const _import = require('@/router/import_' + process.env.NODE_ENV)

export default [
  {
    root: true,
    path: '/department',
    component: Layout,
    redirect: 'noredirect',
    name: 'department',
    meta: {
      title: '部门管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('department/pages/index'),
        name: 'department-index',
        meta: {title: '部门列表', icon: 'component', noCache: true}
      }
    ]
  }
]

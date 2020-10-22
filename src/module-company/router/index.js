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
    path: '/company',
    component: Layout,
    redirect: 'noredirect',
    name: 'company',
    meta: {
      title: '企业管理',
      icon: 'component'
    },
    children: [
      {
        path: 'index',
        component: _import('company/pages/index'),
        name: 'company-index',
        meta: {title: '企业管理', icon: 'component', noCache: true}
      },
      {
        //:id 表示给detail后面的路径标识为id，到时候就可以使用this.$route.params.id取到
        path: 'detail/:id',
        component: _import('company/components/enterprise'),
        name: 'company-detail',
        meta: {title: 'SaaS企业详情', icon: 'international', noCache: true}
      },
    ]
  }
]

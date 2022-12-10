import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const dashboard: AppRouteModule = {
  path: '/osharp/systems',
  name: 'OsharpSystems',
  component: LAYOUT,
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '系统管理',
  },
  children: [
    {
      path: 'auditOperation',
      name: 'OsharpSystemsAuditOperation',
      component: () => import('/@/views/osharp/systems/auditOperation.vue'),
      meta: {
        // affix: true,
        title: '操作审计',
        modules: ['AuditOperation.Read'],
      },
    },
    {
      path: 'auditEntity',
      name: 'OsharpSystemsAuditEntity',
      component: () => import('/@/views/osharp/systems/auditEntity.vue'),
      meta: {
        // affix: true,
        title: '数据审计',
        modules: ['AuditEntity.Read'],
      },
    },
    {
      path: 'pack',
      name: 'OsharpSystemsPack',
      component: () => import('/@/views/osharp/systems/pack.vue'),
      meta: {
        // affix: true,
        title: '模块包',
        modules: ['Pack.Read'],
      },
    },
    {
      path: 'codegen',
      name: 'OsharpSystemsCodegen',
      component: () => import('/@/views/codegen/index.vue'),
      meta: {
        // affix: true,
        title: '代码生成器',
      },
    },
  ],
}

export default dashboard

import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const dashboard: AppRouteModule = {
  path: '/osharp/security',
  name: 'OsharpSecurity',
  component: LAYOUT,
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '权限安全',
  },
  children: [
    {
      path: 'module',
      name: 'OsharpSecurityModule',
      component: () => import('/@/views/osharp/security/module.vue'),
      meta: {
        // affix: true,
        title: '模块管理',
        modules: ['Module.Read'],
      },
    },
    {
      path: 'function',
      name: 'OsharpSecurityFunction',
      component: () => import('/@/views/osharp/security/function.vue'),
      meta: {
        // affix: true,
        title: '功能管理',
        modules: ['Function.Read'],
      },
    },
    {
      path: 'entityinfo',
      name: 'OsharpSecurityEntityinfo',
      component: () => import('/@/views/osharp/security/entityinfo.vue'),
      meta: {
        // affix: true,
        title: '数据实体管理',
        modules: ['EntityInfo.Read'],
      },
    },
    {
      path: 'roleEntityinfo',
      name: 'OsharpSecurityRoleEntityinfo',
      component: () => import('/@/views/osharp/security/roleEntityinfo.vue'),
      meta: {
        // affix: true,
        title: '数据权限管理',
        modules: ['RoleEntity.Read'],
      },
    },
  ],
}

export default dashboard

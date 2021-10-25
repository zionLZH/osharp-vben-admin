import type { AppRouteModule } from '/@/router/types'

import { LAYOUT } from '/@/router/constant'

const dashboard: AppRouteModule = {
  path: '/osharp/identity',
  name: 'OSharpIdentity',
  component: LAYOUT,
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '身份认证',
  },
  children: [
    {
      path: 'user',
      name: 'OSharpIdentityUser',
      component: () => import('/@/views/osharp/identity/user.vue'),
      meta: {
        // affix: true,
        title: '用户管理',
        modules: ['User.Read'],
      },
    },
    {
      path: 'role',
      name: 'OSharpIdentityRole',
      component: () => import('/@/views/osharp/identity/role.vue'),
      meta: {
        // affix: true,
        title: '角色管理',
        modules: ['Role.Read'],
      },
    },
    {
      path: 'userRole',
      name: 'OsharpIdentityUserRole',
      component: () => import('/@/views/osharp/identity/userRole.vue'),
      meta: {
        // affix: true,
        title: '用户角色管理',
        modules: ['UserRole.Read'],
      },
    },
  ],
}

export default dashboard

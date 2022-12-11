function getTemplate(url, method, hasData, hasParam, returnType) {
  let context = []
  let params = []
  hasData && params.push('data: any')
  hasParam && params.push('params: any')
  context.push(``)
  context.push(`export function ${url}(${params.join(', ')}) {`)
  context.push(`  return defHttp.${method}<${returnType}>({`)
  context.push(`  url: Route + '${url}',`)
  hasData && context.push(`  data,`)
  hasParam && context.push(`  params,`)
  context.push(`})`)
  return context.join('\r\n')
}

export function routeFileCodegen(module, moduleName) {
  const context = []
  context.push(`import type { AppRouteModule } from '/@/router/types'`)
  context.push(`import { LAYOUT } from '/@/router/constant'`)
  context.push(`const ${moduleName}: AppRouteModule = {`)
  context.push(`  path: '/${moduleName}',`)
  context.push(`  name: '${moduleName}',`)
  context.push(`  component: LAYOUT,`)
  context.push(`  meta: {`)
  context.push(`    orderNo: 10,`)
  context.push(`    icon: 'ion:grid-outline',`)
  context.push(`    title: '${module.Display}',`)
  context.push(`  },`)
  context.push(`  children: [`)
  for (let entity of module.Entities) {
    let entityName = entity.Name
    context.push(`    {`)
    context.push(`      path: '${entityName}',`)
    context.push(`      name: '${moduleName}_${entityName}',`)
    context.push(
      `      component: () => import('/@/views/${moduleName}/${entityName}/${entityName}.vue'),`,
    )
    context.push(`      meta: {`)
    context.push(`        // affix: true,`)
    context.push(`        title: '${entity.Display}',`)
    context.push(`        modules: ['${entityName}.read'],`)
    context.push(`      },`)
    context.push(`    },`)
  }
  context.push(`  ]`)
  context.push(`}`)
  context.push(``)
  context.push(`export default ${moduleName}`)
  return context.join('\r\n')
}

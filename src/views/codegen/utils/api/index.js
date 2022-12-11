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

export function apiFileCodegen(entity, prefixRoute) {
  const context = []
  context.push(`import { defHttp } from '/@/utils/http/axios'`)
  context.push(`import { OSharpPageResponse, OSharpResponse } from '@/api/model/osharpModel'`)
  context.push(``)
  context.push(`const Route = '${prefixRoute}/${entity.Name}/'`)
  context.push(getTemplate('Read', 'post', true, false, 'OSharpPageResponse'))
  context.push(getTemplate('Create', 'post', true, false, 'OSharpResponse'))
  context.push(getTemplate('Update', 'post', true, false, 'OSharpResponse'))
  context.push(getTemplate('Delete', 'post', true, false, 'OSharpResponse'))
  return context.join('\r\n')
}

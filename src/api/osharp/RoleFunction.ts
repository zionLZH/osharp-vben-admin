import { defHttp } from '/@/utils/http/axios'
import { OSharpPageResponse } from '../model/osharpModel'

const Route = '/Admin/RoleFunction/'

enum Api {
  ReadFunctions = 'ReadFunctions',
}

export function ReadFunctions(roleId: string, data: any) {
  return defHttp.post<OSharpPageResponse>({
    url: Route + Api.ReadFunctions,
    params: {
      roleId,
    },
    data,
  })
}

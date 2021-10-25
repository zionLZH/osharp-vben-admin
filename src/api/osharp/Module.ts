import { defHttp } from '/@/utils/http/axios'
import { OSharpPageResponse } from '../model/osharpModel'

const Route = '/Admin/Module/'

enum Api {
  Read = 'Read',
  ReadFunctions = 'ReadFunctions',
  ReadRoleModules = 'ReadRoleModules',
  ReadUserModules = 'ReadUserModules',
}

export function Read(data: any) {
  return defHttp.post<OSharpPageResponse>({
    url: Route + Api.Read,
    data,
  })
}

export function ReadFunctions(data: any) {
  return defHttp.post<OSharpPageResponse>({
    url: Route + Api.ReadFunctions,
    data,
  })
}

export function ReadRoleModules(roleId: string) {
  return defHttp.get<Array<any>>({
    url: Route + Api.ReadRoleModules,
    params: {
      roleId,
    },
  })
}

export function ReadUserModules(userId: string) {
  return defHttp.get<Array<any>>({
    url: Route + Api.ReadUserModules,
    params: {
      userId,
    },
  })
}

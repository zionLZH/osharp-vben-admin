import { defHttp } from '/@/utils/http/axios'
import { OSharpPageResponse, OSharpResponse } from '../model/osharpModel'

const Route = '/Admin/Role/'

enum Api {
  Read = 'Read',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  ReadNode = 'ReadNode',
  SetRoles = 'SetRoles',
  ReadUserRoles = 'ReadUserRoles',
  SetModules = 'SetModules',
}

export function Read(data: any) {
  return defHttp.post<OSharpPageResponse>({
    url: Route + Api.Read,
    data,
  })
}

export function Create(data: any[]) {
  return defHttp.post<OSharpResponse>({
    url: Route + Api.Create,
    data,
  })
}

export function Update(data: any[]) {
  return defHttp.post<OSharpResponse>({
    url: Route + Api.Update,
    data,
  })
}

export function Delete(data: any[]) {
  return defHttp.post<OSharpResponse>({
    url: Route + Api.Delete,
    data,
  })
}

export function ReadUserRoles(userId: string) {
  return defHttp.get<Array<string>>({
    url: Route + Api.ReadUserRoles,
    params: {
      userId,
    },
  })
}

export function SetModules(data: { roleId: any; moduleIds: number[] }) {
  return defHttp.post<OSharpResponse>({
    url: Route + Api.SetModules,
    data,
  })
}

export function ReadNode(data: any) {
  return defHttp.get<OSharpResponse>({
    url: Route + Api.ReadNode,
    data,
  })
}

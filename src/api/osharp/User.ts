import { defHttp } from '/@/utils/http/axios'
import { OSharpPageResponse, OSharpResponse } from '../model/osharpModel'

const Route = '/Admin/User/'

enum Api {
  Read = 'Read',
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  ReadNode = 'ReadNode',
  SetRoles = 'SetRoles',
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

export function SetRoles(data: { userId: string; roleIds: string[] }) {
  return defHttp.post<OSharpResponse>({
    url: Route + Api.SetRoles,
    data,
  })
}

export function SetModules(data: { userId: any; moduleIds: number[] }) {
  return defHttp.post<OSharpResponse>({
    url: Route + Api.SetModules,
    data,
  })
}

export function ReadNode(data: any) {
  return defHttp.post<OSharpResponse>({
    url: Route + Api.ReadNode,
    data,
  })
}

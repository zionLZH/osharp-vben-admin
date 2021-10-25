import { defHttp } from '/@/utils/http/axios'
import { OSharpPageResponse, OSharpResponse } from '../model/osharpModel'

const Route = '/Admin/UserRole/'

enum Api {
  Read = 'Read',
  Update = 'Update',
  Delete = 'Delete',
}

export function Read(data: any) {
  return defHttp.post<OSharpPageResponse>({
    url: Route + Api.Read,
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

import { defHttp } from '/@/utils/http/axios'
import { OSharpPageResponse, OSharpResponse } from '../model/osharpModel'

const Route = '/Admin/AuditOperation/'

enum Api {
  Read = 'Read',
  Update = 'Update',
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

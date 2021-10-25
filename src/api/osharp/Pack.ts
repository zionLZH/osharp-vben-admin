import { defHttp } from '/@/utils/http/axios'
import { OSharpPageResponse } from '../model/osharpModel'

const Route = '/Admin/Pack/'

enum Api {
  Read = 'Read',
}

export function Read(data: any) {
  return defHttp.post<OSharpPageResponse>({
    url: Route + Api.Read,
    data,
  })
}

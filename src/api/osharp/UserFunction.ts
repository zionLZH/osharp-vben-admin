import { defHttp } from '/@/utils/http/axios'
import { OSharpPageResponse } from '../model/osharpModel'

const Route = '/Admin/UserFunction/'

enum Api {
  ReadFunctions = 'ReadFunctions',
}

export function ReadFunctions(userId: string, data: any) {
  return defHttp.post<OSharpPageResponse>({
    url: Route + Api.ReadFunctions,
    params: {
      userId,
    },
    data,
  })
}

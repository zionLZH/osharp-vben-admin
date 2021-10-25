import { defHttp } from '../../utils/http/axios'
import { BasicResponseResult } from '../model/baseModel'

const Route = '/Auth/'
enum Api {
  GetAuthinfo = 'GetAuthinfo',
}

export function GetAuthinfo() {
  return defHttp.get<BasicResponseResult>({
    url: Route + Api.GetAuthinfo,
  })
}

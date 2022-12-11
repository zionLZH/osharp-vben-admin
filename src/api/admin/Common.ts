import { defHttp } from '../../utils/http/axios'

const Route = '/Common/'

enum Api {
  ReadEnum = 'ReadEnum',
}

export function ReadEnum(enumName: any) {
  return defHttp.get<Array<any>>({
    url: Route + Api.ReadEnum,
    params: {
      enumName,
    },
  })
}

import { defHttp } from '/@/utils/http/axios'
import { IdentityTokenData } from './model/Identity'
import { BasicResponseResult } from '../model/baseModel'
import { ErrorMessageMode } from '../../../types/axios'

const Route = '/Identity/'
enum Api {
  Token = 'Token',
  Profile = 'Profile',
  Logout = 'Logout',
}

export function Token(data: IdentityTokenData, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<BasicResponseResult>(
    {
      url: Route + Api.Token,
      data,
    },
    {
      errorMessageMode: mode,
    },
  )
}

export function Profile() {
  return defHttp.get<BasicResponseResult>({
    url: Route + Api.Profile,
  })
}

export function Logout() {
  return defHttp.post<BasicResponseResult>({
    url: Route + Api.Logout,
  })
}

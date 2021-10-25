export interface BasicPageParams {
  page: number
  pageSize: number
}

export interface BasicFetchResult<T extends any> {
  items: T[]
  total: number
}

export type BasicRequestParams = any

export type BasicResponseResult = any

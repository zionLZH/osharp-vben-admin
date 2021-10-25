export interface OSharpPageData<T> {
  Rows: T[]
  Total: number
}

export interface OSharpFilterRule {
  Field: string
  Value: any
  Operate: OSharpFilterOperate
}

export enum OSharpFilterOperate {
  And = 1,
  Or = 2,
  Equal = 3,
  NotEqual = 4,
  Less = 5,
  LessOrEqual = 6,
  Greater = 7,
  GreaterOrEqual = 8,
  StartsWith = 9,
  EndsWith = 10,
  Contains = 11,
  NotContains = 12,
}

export interface OSharpFilterGroup {
  Rules: OSharpFilterRule[]
  Operate: OSharpFilterOperate | number
  Groups: OSharpFilterGroup[]
  Level: number
}

export interface OSharpPageRequest {
  PageCondition: OSharpPageCondition
  FilterGroup: OSharpFilterGroup
}
export interface OSharpPageCondition {
  PageIndex: number
  PageSize: number
  SortConditions: OSharpSortCondition[]
}
export interface OSharpSortCondition {
  SortField: string
  ListSortDirection: OSharpListSortDirection | number
}
export enum OSharpListSortDirection {
  Ascending,
  Descending,
}

interface OSharpPageSortOption {
  key: string
  type: string
}

interface OSharpPageFilterOption {
  key: string
  type: string
  value: any
}

export interface OSharpPageOption {
  pageIndex: number
  pageSize: number
  sort: OSharpPageSortOption[] | OSharpPageSortOption
  filter: OSharpPageFilterOption[] | Array<OSharpPageFilterOption[] | string[]> | any
}

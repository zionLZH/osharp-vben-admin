import {
  OSharpPageRequest,
  OSharpFilterGroup,
  OSharpPageCondition,
  OSharpFilterRule,
  OSharpSortCondition,
  OSharpPageOption,
} from '/@/utils/osharp/types/page'
import { isArray, isString } from '/@/utils/is'

// function FilterGroupLevelReset (parentLevel, FilterGroup) {
//   FilterGroup.Level = parentLevel + 1
//   if (isArray(FilterGroup.Groups) && FilterGroup.Groups.length > 0) {
//     let total = FilterGroup.Groups.length
//     for (let i = 0; i < total; i++) {
//       let item = FilterGroup.Groups[i]
//       FilterGroup.Groups[i] = FilterGroupLevelReset(FilterGroup.Level, item)
//     }
//   }
//   return FilterGroup
// }

export function makeOSharpPageRequest(
  PageCondition: OSharpPageCondition,
  FilterGroup: OSharpFilterGroup,
) {
  return { PageCondition, FilterGroup } as OSharpPageRequest
}

export function makeOSharpFilterItem(key: string, type: string | number, value: any) {
  const Field = key,
    Value = value
  let Operate = 3
  Operate = [
    '',
    '',
    '',
    '=',
    '!=',
    '<',
    '<=',
    '>',
    '>=',
    'start',
    'end',
    'like',
    'not like',
    'in',
    'not in',
  ].indexOf(type + '')
  return { Field, Operate, Value } as OSharpFilterRule
}

export function makeOSharpPageCondition(
  PageIndex: number | string,
  PageSize: number | string,
  SortConditions: OSharpSortCondition[],
) {
  if (!isArray(SortConditions)) {
    SortConditions = [SortConditions]
  }
  return { PageIndex, PageSize, SortConditions } as OSharpPageCondition
}

export function makeOSharpSortCondition(key: string, type: string | number) {
  let ListSortDirection = parseInt(type)
  const SortField = key + '',
    ASC = ['up', '+', 0, 'asc'],
    DESC = ['down', '-', 1, 'desc']
  type = type + ''
  if (ASC.indexOf(type.toLowerCase()) !== -1) {
    ListSortDirection = 0
  } else if (DESC.indexOf(type.toLowerCase()) !== -1) {
    ListSortDirection = 1
  }
  return { SortField, ListSortDirection } as OSharpSortCondition
}

export function makeOSharpFilterGourp(
  Operate: string | number = 'and',
  Rules: OSharpFilterRule[] = [],
  Groups: OSharpFilterGroup[] = [],
) {
  Operate = Operate + ''
  Operate =
    {
      and: 1,
      or: 2,
    }[Operate.toLowerCase()] || parseInt(Operate)
  const filterGourp = {
    Rules,
    Operate,
    Groups,
    Level: 1,
  }
  return filterGourp as unknown as OSharpFilterGroup
}

export function makeOSharpPage(pageOption: OSharpPageOption) {
  const { pageIndex = 1, pageSize = 10, sort = [], filter = [] } = pageOption
  const sortCondition: OSharpSortCondition[] = []
  if (isArray(sort)) {
    sort.forEach((sortItem) => {
      sortCondition.push(makeOSharpSortCondition(sortItem.key, sortItem.type))
    })
  } else {
    sortCondition.push(makeOSharpSortCondition(sort.key, sort.type))
  }
  const pageCondition = makeOSharpPageCondition(pageIndex, pageSize, sortCondition)
  const filterGroup = makeOSharpFilterGourp('and', [], [])
  if (isArray(filter)) {
    const filterEacher = (parent, filters) => {
      filters.forEach((item) => {
        if (isString(item)) {
          return
        }
        if (isArray(item)) {
          const Operate = item.indexOf('or') < 0 ? 'and' : 'or'
          const group = makeOSharpFilterGourp(Operate, [], [])
          filterEacher(group, item)
          parent.Groups.push(group)
        } else {
          const filterItem = makeOSharpFilterItem(item.key, item.type, item.value)
          filterItem.Value && parent.Rules.push(filterItem)
        }
      })
    }
    filterEacher(filterGroup, filter)
  }

  return makeOSharpPageRequest(pageCondition, filterGroup)
}

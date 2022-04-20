<template>
  <div>
    <BasicTable @register="register" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '../../../components/Table'
  import { Read } from '../../../api/osharp/Pack'
  import { makeOSharpPage } from '../../../utils/osharp'
  import { Colums } from './data/pack'
  import { OSharpPageOption } from '../../../utils/osharp/types/page'

  const [register] = useTable({
    api: getPageData,
    canResize: true,
    useSearchForm: false,
    columns: Colums,
  })

  async function getPageData({ page, pageSize }) {
    const body = makeOSharpPage({
      pageIndex: page,
      pageSize,
      filter: [],
    } as OSharpPageOption)
    let { Rows, Total, Data } = await Read(body)
    if (!Rows) {
      Rows = Data?.Rows as Array<any>
      Total = Data?.Total as number
    }
    return { items: Rows, total: Total }
  }
</script>

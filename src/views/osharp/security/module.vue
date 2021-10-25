<template>
  <div>
    <BasicTable @register="register" @row-dbClick="onTableRowDbClick" />
    <ModuleDtl v-if="dtlPayload" :payload="dtlPayload" @close="dtlPayload = false" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicTable, useTable } from '../../../components/Table'
  import { Read } from '../../../api/osharp/Module'
  import { makeOSharpPage } from '../../../utils/osharp'
  import { Colums } from './data/module'
  import { OSharpPageOption } from '../../../utils/osharp/types/page'
  import ModuleDtl from './modal/moduleDtl.vue'

  const dtlPayload = ref(false)

  const [register] = useTable({
    api: getPageData,
    title: '双击查看详情',
    pagination: false,
    canResize: true,
    useSearchForm: false,
    showIndexColumn: false,
    columns: Colums,
    rowKey: 'Id',
    expandRowByClick: true,
    childrenColumnName: 'Children',
  })

  async function getPageData({ page, pageSize }) {
    const body = makeOSharpPage({
      pageIndex: page,
      pageSize,
      filter: [],
    } as OSharpPageOption)
    const Rows = await Read(body)
    const ZtreeResult = zTreeToTree(Rows)
    return ZtreeResult
  }

  function zTreeToTree(data, config: any = {}) {
    var id = config.id || 'Id',
      pid = config.pid || 'ParentId',
      children = config.children || 'Children'
    var idMap: any = [],
      jsonTree: any = []

    data.forEach(function (v: any) {
      idMap[v[id]] = v
    })

    data.forEach(function (v: any) {
      var parent = idMap[v[pid]]
      if (parent) {
        !parent[children] && (parent[children] = [])
        parent[children].push(v)
      } else {
        jsonTree.push(v)
      }
    })
    return jsonTree
  }

  function onTableRowDbClick(item) {
    dtlPayload.value = item.Id
  }
</script>

<template>
  <div>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '查看',
              onClick: toEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <AuditOperationDtl v-if="dtlPayload" :payload="dtlPayload" @close="onDtlModalClosed" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicTable, TableAction, useTable } from '../../../components/Table'
  import { Read } from '../../../api/osharp/AuditOperation'
  import { makeOSharpPage } from '../../../utils/osharp'
  import { Colums, FormConfig, ActionConfig, getFilterItems } from './data/auditOperation'
  import { OSharpPageOption } from '../../../utils/osharp/types/page'
  import AuditOperationDtl from './modal/auditOperationDtl.vue'

  const dtlPayload = ref(false)

  const [register, tableMethods] = useTable({
    api: getPageData,
    canResize: true,
    useSearchForm: true,
    columns: Colums,
    formConfig: FormConfig,
    actionColumn: ActionConfig,
  })

  async function getPageData({ page, pageSize }) {
    const searchForm = tableMethods.getForm().getFieldsValue()
    const body = makeOSharpPage({
      pageIndex: page,
      pageSize,
      filter: getFilterItems(searchForm),
    } as OSharpPageOption)
    let { Rows, Total, Data } = await Read(body)
    if (!Rows) {
      Rows = Data?.Rows as Array<any>
      Total = Data?.Total as number
    }
    return { items: Rows, total: Total }
  }

  function onDtlModalClosed() {
    tableMethods.reload()
    dtlPayload.value = false
  }

  function toEdit(item) {
    dtlPayload.value = item.Id
  }
</script>

<template>
  <div>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '查看',
              auth: 'Function.Update',
              onClick: toEdit.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <FunctionDtl v-if="dtlPayload" :payload="dtlPayload" @close="onDtlModalClosed" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicTable, TableAction, useTable } from '../../../components/Table'
  import { Read } from '../../../api/osharp/Function'
  import { makeOSharpPage } from '../../../utils/osharp'
  import { Colums, FormConfig, ActionConfig, getFilterItems } from './data/function'
  import { OSharpPageOption } from '../../../utils/osharp/types/page'
  import FunctionDtl from './modal/functionDtl.vue'

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
    const {
      Data: { Rows, Total },
    } = await Read(body)
    return { items: Rows, total: Total }
  }

  function onDtlModalClosed() {
    tableMethods.reload()
    dtlPayload.value = false
  }

  function toEdit(item) {
    dtlPayload.value = item
  }
</script>

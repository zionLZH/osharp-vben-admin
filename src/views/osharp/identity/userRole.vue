<template>
  <div>
    <BasicTable @register="register">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '查看',
              auth: 'UserRole.Update',
              onClick: toEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              color: 'error',
              auth: 'UserRole.Delete',
              popConfirm: {
                title: '是否确认删除',
                confirm: doDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserRoleDtl v-if="dtlPayload" :payload="dtlPayload" @close="onDtlModalClosed" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicTable, TableAction, useTable } from '../../../components/Table'
  import { Delete, Read } from '../../../api/osharp/UserRole'
  import { makeOSharpPage } from '../../../utils/osharp'
  import { Colums, FormConfig, ActionConfig, getFilterItems } from './data/userRole'
  import { OSharpPageOption } from '../../../utils/osharp/types/page'
  import UserRoleDtl from './modal/userRoleDtl.vue'

  const dtlPayload = ref(false)

  const [register, tableMethods] = useTable({
    api: getPageData,
    canResize: true,
    useSearchForm: false,
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
    dtlPayload.value = item
  }

  async function doDelete(item) {
    await Delete([item.Id])
    tableMethods.reload()
  }
</script>

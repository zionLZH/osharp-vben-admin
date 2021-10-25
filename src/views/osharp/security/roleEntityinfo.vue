<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
        <Authority value="RoleEntity.Create">
          <a-button type="primary" @click="toCreate">创建</a-button>
        </Authority>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '查看',
              auth: 'RoleEntity.Update',
              onClick: toEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              color: 'error',
              auth: 'RoleEntity.Delete',
              popConfirm: {
                title: '是否确认删除',
                confirm: doDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleEntityinfoDtl v-if="dtlPayload" :payload="dtlPayload" @close="onDtlModalClosed" />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicTable, TableAction, useTable } from '../../../components/Table'
  import { Delete, Read } from '../../../api/osharp/RoleEntity'
  import { makeOSharpPage } from '../../../utils/osharp'
  import { Colums, FormConfig, ActionConfig, getFilterItems } from './data/roleEntityinfo'
  import { OSharpPageOption } from '../../../utils/osharp/types/page'
  import { Authority } from '../../../components/Authority'
  import RoleEntityinfoDtl from './modal/roleEntityinfoDtl.vue'

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
    const {
      Data: { Rows, Total },
    } = await Read(body)
    return { items: Rows, total: Total }
  }

  function onDtlModalClosed() {
    tableMethods.reload()
    dtlPayload.value = false
  }

  function toCreate() {
    dtlPayload.value = {} as any
  }

  function toEdit(item) {
    dtlPayload.value = item
  }

  async function doDelete(item) {
    await Delete([item.Id])
    tableMethods.reload()
  }
</script>

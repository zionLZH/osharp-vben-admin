export const listFileTemplate = `<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
        <Authority value=".#{Entity}.Create">
          <a-button type="primary" @click="toCreate">创建</a-button>
        </Authority>
        <Authority value=".#{Entity}.Delete">
          <a-button type="primary" @click="doRowsOpeartion(Delete)">删除</a-button>
        </Authority>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '查看',
              auth: '.#{Entity}.Update',
              onClick: toEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              color: 'error',
              auth: '.#{Entity}.Delete',
              popConfirm: {
                title: '是否确认删除',
                confirm: doDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <DtlDialog v-if="dtlPayload" :payload="dtlPayload" @close="onDtlModalClosed" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicTable, TableAction, useTable } from '/@/components/Table'
  import { Read, Delete } from '/@/#{ApiFile}'
  import { Colums, FormConfig, ActionConfig, getFilterItems } from './data/#{Entity}'
  import { OSharpPageOption } from '/@/utils/osharp/types/page'
  import { makeOSharpPage } from '/@/utils/osharp'
  import { Authority } from '/@/components/Authority'
  import DtlDialog from './modal/#{Entity}Dtl.vue'
  import { useMessage } from '../../../hooks/web/useMessage'
  import { useLoading } from '../../../components/Loading'

  const { createWarningModal, createMessage } = useMessage()
  const [showLoading, hideLoading] = useLoading({})

  const dtlPayload = ref<any>(false)

  const [register, tableMethods] = useTable({
    api: getPageData,
    canResize: true,
    useSearchForm: true,
    columns: Colums,
    formConfig: FormConfig,
    actionColumn: ActionConfig,
    showTableSetting: true,
    clickToRowSelect: false,
    rowSelection: { type: 'checkbox' },
  })

  async function getPageData({ page, pageSize }) {
    const searchForm = tableMethods.getForm().getFieldsValue()
    const body = makeOSharpPage({
      pageIndex: page,
      pageSize,
      sort: { key: 'Id', type: 'up' },
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

  async function doRowsOpeartion(Apier) {
    let items = tableMethods.getSelectRows()
    if (items.length <= 0) {
      createWarningModal({ content: '请选择一条数据' })
      return
    }
    showLoading()
    try {
      await Apier(items.map((o) => o.Id))
      tableMethods.reload()
    } finally {
      hideLoading()
    }
  }
</script>

<style lang="less" scoped></style>
`

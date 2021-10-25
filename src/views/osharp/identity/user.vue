<template>
  <div>
    <BasicTable @register="register">
      <template #toolbar>
        <Authority value="User.Create">
          <a-button type="primary" @click="toCreate">创建</a-button>
        </Authority>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              tooltip: '查看',
              auth: 'User.Update',
              onClick: toEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              tooltip: '删除',
              color: 'error',
              auth: 'User.Delete',
              popConfirm: {
                title: '是否确认删除',
                confirm: doDelete.bind(null, record),
              },
            },
            {
              icon: 'ant-design:user-outlined',
              tooltip: '角色管理',
              auth: 'User.SetRoles',
              onClick: toRoles.bind(null, record),
            },
            {
              icon: 'ant-design:verified-outlined',
              tooltip: '权限管理',
              auth: 'User.SetModules',
              onClick: toModules.bind(null, record),
            },
            {
              icon: 'ant-design:solution-outlined',
              tooltip: '查看功能',
              auth: 'UserFunction.ReadFunctions',
              onClick: toFunctions.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <UserDtl v-if="dtlPayload" :payload="dtlPayload" @close="onDtlModalClosed" />
    <UserRole v-if="rolePayload" :payload="rolePayload" @close="rolePayload = false" />
    <UserModule v-if="modulesPayload" :payload="modulesPayload" @close="modulesPayload = false" />
    <userFunction
      v-if="functionsPayload"
      :payload="functionsPayload"
      @close="functionsPayload = false"
    />
  </div>
</template>
<script lang="ts" setup>
  import { ref } from 'vue'
  import { BasicTable, useTable, TableAction } from '../../../components/Table'
  import { Read, Delete } from '../../../api/osharp/User'
  import { makeOSharpPage } from '../../../utils/osharp'
  import { Colums, FormConfig, getFilterItems } from './data/user'
  import { OSharpPageOption } from '../../../utils/osharp/types/page'
  import { ActionConfig } from './data/user'
  import UserDtl from './modal/userDtl.vue'
  import UserRole from './modal/userRole.vue'
  import UserFunction from './modal/userFunction.vue'
  import UserModule from './modal/userModule.vue'
  import { Authority } from '../../../components/Authority'
  import BasicUpload from '../../../components/Upload/src/BasicUpload.vue'

  const dtlPayload = ref(false)
  const rolePayload = ref(false)
  const modulesPayload = ref(false)
  const functionsPayload = ref(false)

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

  function toRoles(item) {
    rolePayload.value = item.Id
  }

  function toModules(item) {
    modulesPayload.value = item.Id
  }

  function toFunctions(item) {
    functionsPayload.value = item.Id
  }
</script>

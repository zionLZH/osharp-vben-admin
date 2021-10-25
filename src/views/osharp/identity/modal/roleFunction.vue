<template>
  <BasicModal
    title="角色功能"
    @register="registerModal"
    width="800px"
    :afterClose="() => $emit('close')"
  >
    <template #footer>
      <div></div>
    </template>
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { onMounted, ref, defineProps, toRefs, defineEmits } from 'vue'
  import { BasicModal, useModal } from '../../../../components/Modal'
  import { BasicTable, useTable } from '/@/components/Table'
  import { Colums } from '../data/roleFunction'
  import { ReadFunctions } from '/@/api/osharp/RoleFunction'
  import { makeOSharpPage } from '/@/utils/osharp'
  import { OSharpPageOption } from '/@/utils/osharp/types/page'

  const props = defineProps({
    payload: { type: [Object, String] },
  })

  const emit = defineEmits(['close'])

  const data = ref(false)
  const [registerModal, { openModal, setModalProps }] = useModal()
  const [registerTable] = useTable({
    api: getList,
    columns: Colums,
    canResize: false,
    pagination: {
      showQuickJumper: false,
      showSizeChanger: false,
    },
  })

  onMounted(openModal)

  async function getList({ page, pageSize }) {
    const { payload } = toRefs<any>(props)
    const body = makeOSharpPage({
      pageIndex: page,
      pageSize: pageSize,
      filter: [],
    } as OSharpPageOption)
    const roleId = payload.value
    const {
      Data: { Rows, Total },
    } = await ReadFunctions(roleId, body)
    return {
      items: Rows,
      total: Total,
    }
  }
</script>

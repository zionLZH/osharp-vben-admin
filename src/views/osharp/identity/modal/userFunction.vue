<template>
  <BasicModal
    title="用户功能"
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
  import { onMounted, defineProps, toRefs, defineEmits } from 'vue'
  import { BasicModal, useModal } from '../../../../components/Modal'
  import { BasicTable, useTable } from '/@/components/Table'
  import { Colums } from '../data/userFunction'
  import { ReadFunctions } from '/@/api/osharp/UserFunction'
  import { makeOSharpPage } from '/@/utils/osharp'
  import { OSharpPageOption } from '/@/utils/osharp/types/page'

  const props = defineProps({
    payload: { type: [Object, String] },
  })

  const emit = defineEmits(['close'])

  const [registerModal, { openModal }] = useModal()
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
    const userId = payload.value
    const {
      Data: { Rows, Total },
    } = await ReadFunctions(userId, body)
    return {
      items: Rows,
      total: Total,
    }
  }
</script>

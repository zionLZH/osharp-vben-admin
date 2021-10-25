<template>
  <BasicModal
    title="查看模块功能"
    width="800px"
    @register="registerModal"
    :afterClose="() => $emit('close')"
  >
    <BasicTable @register="register" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { onMounted, defineProps, defineEmits, toRefs } from 'vue'
  import { BasicTable, useTable } from '../../../../components/Table'
  import { BasicModal, useModal } from '../../../../components/Modal'
  import { DetailColumns } from '../data/module'
  import { ReadFunctions } from '/@/api/osharp/Module'
  import { makeOSharpPage } from '../../../../utils/osharp'
  import { OSharpPageOption } from '../../../../utils/osharp/types/page'

  const props = defineProps({
    payload: { type: [Object, String] },
  })

  const emit = defineEmits(['close'])

  const [registerModal, { openModal }] = useModal()
  const [register] = useTable({
    api: getPageData,
    canResize: false,
    useSearchForm: false,
    columns: DetailColumns,
  })

  onMounted(openModal)

  async function getPageData({ page, pageSize }) {
    const { payload } = toRefs<any>(props)
    const TreePathString = payload.value
    const body = makeOSharpPage({
      pageIndex: page,
      pageSize,
      filter: [{ key: 'TreePathString', type: 'like', value: `$${TreePathString}$` }],
    } as OSharpPageOption)
    const {
      Data: { Rows, Total },
    } = await ReadFunctions(body)
    return { items: Rows, total: Total }
  }
</script>

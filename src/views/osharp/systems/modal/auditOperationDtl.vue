<template>
  <BasicModal
    title="操作详情"
    width="800px"
    @register="registerModal"
    :afterClose="() => $emit('close')"
  >
    <BasicForm v-for="item in data" :key="item.Id" :model="item" v-bind="FormConfig" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { onMounted, ref, defineProps, toRefs, nextTick, defineEmits } from 'vue'
  import { BasicModal, useModal } from '../../../../components/Modal'
  import { BasicForm } from '../../../../components/Form'
  import { DetailFormConfig } from '../data/auditOperation'
  import { Read } from '/@/api/osharp/AuditEntity'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { makeOSharpPage } from '../../../../utils/osharp'
  import { OSharpPageOption } from '../../../../utils/osharp/types/page'

  const { createMessage } = useMessage()
  const { info: infoMessage } = createMessage

  const props = defineProps({
    payload: { type: [Object, String] },
  })

  const emit = defineEmits(['close'])

  const data = ref<Boolean | Array<any>>(false)
  const FormConfig = ref(DetailFormConfig)

  const [registerModal, { openModal, setModalProps }] = useModal()

  onMounted(openModal)
  onMounted(async () => {
    await nextTick()
    let { payload } = toRefs<any>(props)
    payload = payload.value
    if (payload) {
      getDetail(payload)
    }
  })

  async function getDetail(payload) {
    setModalProps({ loading: true })
    try {
      const body = makeOSharpPage({
        pageIndex: 1,
        pageSize: 999,
        filter: [{ key: 'OperationId', type: '=', value: payload }],
      } as OSharpPageOption)
      const { Rows } = await Read(body)
      data.value = Rows
      if (Rows.length === 0) {
        infoMessage('暂无数据')
      }
    } catch (e) {
    } finally {
      setModalProps({ loading: false })
    }
  }
</script>

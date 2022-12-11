export const dtlModalFileTemplate = `<template>
  <BasicModal
    title="信息编辑"
    width="800px"
    @register="registerModal"
    @ok="doSubmit"
    :showOkBtn="hasPermission(['#{Entity}.Create', '#{Entity}.Update'])"
    :afterClose="() => $emit('close')"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { onMounted, ref, defineProps, toRefs, nextTick, defineEmits } from 'vue'
  import { BasicModal, useModal } from '/@/components/Modal'
  import { BasicForm, useForm } from '/@/components/Form'
  import { DetailFormConfig } from '../data/#{Entity}'
  import { Create, ReadOne, Update } from '/@/#{ApiFile}'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { usePermission } from '/@/hooks/web/usePermission'

  const { hasPermission } = usePermission()
  const { createSuccessModal } = useMessage()

  const props = defineProps({
    payload: { type: [Object, String] },
  })
  const emit = defineEmits(['close'])
  const detail = ref<any>({
    Id: 0,
  })

  const [registerModal, { openModal, closeModal, setModalProps }] = useModal()
  const [registerForm, formMethods] = useForm({
    ...DetailFormConfig,
    model: {
      ...detail.value,
    },
  })

  onMounted(openModal)
  onMounted(async () => {
    await nextTick()
    let { payload } = toRefs<any>(props)
    payload = payload.value
    if (payload.Id) {
      getDetail(payload.Id)
    }
  })

  async function doSubmit() {
    setModalProps({ loading: true })
    try {
      const values = await formMethods.validate()
      const submitData = {
        ...detail.value,
        ...values,
      }
      const apier = submitData.Id ? Update : Create
      await apier(submitData)
      createSuccessModal({ content: '操作完成' })
      closeModal()
    } finally {
      setModalProps({ loading: false })
    }
  }

  async function getDetail(payload) {
    setModalProps({ loading: true })
    try {
      let { Data } = await ReadOne(payload)
      detail.value = Data
      formMethods.setFieldsValue(Data)
    } finally {
      setModalProps({ loading: false })
    }
  }
</script>

<style lang="less" scoped></style>
`

<template>
  <BasicModal
    title="用户信息"
    @register="registerModal"
    @ok="doSubmit"
    :showOkBtn="hasPermission(['User.Create', 'User.Update'])"
    :afterClose="() => $emit('close')"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { onMounted, ref, defineProps, toRefs, nextTick, defineEmits } from 'vue'
  import { BasicModal, useModal } from '../../../../components/Modal'
  import { BasicForm, useForm } from '../../../../components/Form'
  import { DetailFormConfig } from '../data/user'
  import { Create, Update } from '/@/api/osharp/User'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { usePermission } from '../../../../hooks/web/usePermission'

  const { createSuccessModal } = useMessage()
  const { hasPermission } = usePermission()

  const props = defineProps({
    payload: { type: [Object, String] },
  })

  const emit = defineEmits(['close'])

  const data = ref(false)
  const [registerModal, { openModal, closeModal, setModalProps }] = useModal()
  const [registerForm, formMethods] = useForm({
    ...DetailFormConfig,
  })

  onMounted(openModal)
  onMounted(async () => {
    await nextTick()
    let { payload } = toRefs<any>(props)
    payload = payload.value
    if (payload.Id) {
      getDetail(payload)
    }
  })

  async function doSubmit() {
    setModalProps({ loading: true })
    try {
      const values = await formMethods.validate()
      const apier = values.Id ? Update : Create
      await apier([values])
      createSuccessModal({ content: '操作完成' })
      closeModal()
    } catch (e) {
    } finally {
      setModalProps({ loading: false })
    }
  }

  function getDetail(payload) {
    formMethods.setFieldsValue(payload)
  }
</script>

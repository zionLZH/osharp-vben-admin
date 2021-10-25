<template>
  <BasicModal
    title="用户角色"
    @register="registerModal"
    @ok="doSubmit"
    :showOkBtn="hasPermission('User.SetRoles')"
    :afterClose="() => $emit('close')"
  >
    <CheckboxGroup v-model:value="checkeds" :options="data" indeterminate />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { CheckboxGroup } from 'ant-design-vue/lib'
  import { onMounted, ref, defineProps, toRefs, nextTick, defineEmits } from 'vue'
  import { BasicModal, useModal } from '../../../../components/Modal'
  import { ReadUserRoles } from '../../../../api/osharp/Role'
  import { SetRoles } from '/@/api/osharp/User'
  import { useMessage } from '/@/hooks/web/useMessage'
  import { usePermission } from '../../../../hooks/web/usePermission'

  const { createSuccessModal } = useMessage()
  const { hasPermission } = usePermission()

  const props = defineProps({
    payload: { type: [Object, String] },
  })

  const emit = defineEmits(['close'])

  const data = ref<Array<any>>([])
  const checkeds = ref<Array<string>>([])

  const [registerModal, { openModal, closeModal, setModalProps }] = useModal()

  onMounted(openModal)
  onMounted(async () => {
    await nextTick()
    let { payload } = toRefs<any>(props)
    payload = payload.value
    if (payload) {
      setModalProps({ loading: true })
      try {
        await getRoles(payload)
      } finally {
        setModalProps({ loading: false })
      }
    }
  })

  async function doSubmit() {
    setModalProps({ loading: true })
    try {
      const { payload } = toRefs<any>(props)
      const userId: string = payload.value
      const roleIds: Array<string> = checkeds.value
      await SetRoles({ userId, roleIds })
      createSuccessModal({ content: '操作完成' })
      closeModal()
    } catch (e) {
    } finally {
      setModalProps({ loading: false })
    }
  }

  async function getRoles(payload) {
    try {
      const roles = await ReadUserRoles(payload)
      checkeds.value = roles.filter((item: any) => item.IsChecked).map((item: any) => item.Id)
      data.value = roles.map((item: any) => ({ value: item.Id, label: item.Name }))
    } catch (e) {}
  }
</script>

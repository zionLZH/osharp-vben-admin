<template>
  <BasicModal
    title="权限管理"
    @register="registerModal"
    @ok="doSubmit"
    width="800px"
    :showOkBtn="hasPermission('Role.SetModules')"
    :afterClose="() => $emit('close')"
  >
    <BasicTree
      ref="treeRef"
      checkable
      :treeData="data"
      :checkedKeys="checkedKeys"
      :replaceFields="{
        key: 'Id',
        title: 'Name',
        children: 'Children',
      }"
    />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { onMounted, ref, defineProps, toRefs, defineEmits, nextTick, unref } from 'vue'
  import { useMessage } from '../../../../hooks/web/useMessage'
  import { BasicModal, useModal } from '../../../../components/Modal'
  import { BasicTree, TreeActionType } from '../../../../components/Tree/index'
  import { ReadRoleModules } from '/@/api/osharp/Module'
  import { SetModules } from '/@/api/osharp/Role'
  import { usePermission } from '../../../../hooks/web/usePermission'

  const { hasPermission } = usePermission()

  const props = defineProps({
    payload: { type: [Object, String] },
  })

  const emit = defineEmits(['close'])

  const { createSuccessModal } = useMessage()

  const data = ref<Array<any>>([])
  const checkedKeys = ref<Array<number>>([])
  const treeRef = ref<Nullable<TreeActionType>>(null)
  const [registerModal, { openModal, closeModal, setModalProps }] = useModal()

  onMounted(openModal)
  onMounted(getDetail)

  async function getDetail() {
    setModalProps({ loading: true })
    try {
      const { payload } = toRefs<any>(props)
      const roleId = payload.value
      const res = await ReadRoleModules(roleId)
      data.value = res
      await nextTick()
      let arr: Array<any> = []
      for (let item of res) {
        arr = arr.concat(checksCalc(item))
      }
      checkedKeys.value = arr
      await nextTick()
      unref(treeRef)?.filterByLevel(3)
    } finally {
      setModalProps({ loading: false })
    }
  }

  function checksCalc(item) {
    let arr: Array<any> = []
    if (item.IsChecked) {
      arr.push(item.Id)
    }
    if (item.Children) {
      for (let sItem of item.Children) {
        arr = arr.concat(checksCalc(sItem))
      }
    }
    return arr
  }

  async function doSubmit() {
    const moduleIds = unref(treeRef)?.getCheckedKeys() as number[]
    setModalProps({ loading: true })
    try {
      const { payload } = toRefs<any>(props)
      const roleId = payload.value
      await SetModules({ roleId, moduleIds })
      createSuccessModal({ content: '操作完成' })
      closeModal()
    } finally {
      setModalProps({ loading: false })
    }
  }
</script>

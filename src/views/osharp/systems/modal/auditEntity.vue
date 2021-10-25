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
  import { onMounted, ref, defineProps, nextTick, defineEmits, unref } from 'vue'
  import { BasicModal, useModal } from '../../../../components/Modal'
  import { BasicForm } from '../../../../components/Form'
  import { DetailFormConfig } from '../data/auditEntity'

  const props = defineProps({
    payload: { type: [Object, String] },
  })

  const emit = defineEmits(['close'])

  const data = ref<Boolean | Array<any>>(false)
  const FormConfig = ref(DetailFormConfig)

  const [registerModal, { openModal }] = useModal()

  onMounted(openModal)
  onMounted(async () => {
    await nextTick()
    let { payload } = unref<any>(props)
    if (payload) {
      getDetail(payload)
    }
  })

  async function getDetail(payload) {
    data.value = [payload]
  }
</script>

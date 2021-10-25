<template>
  <div>
    <a-button-group>
      <a-button type="primary" @click="openUploadModal" preIcon="carbon:cloud-upload">
        {{ t('component.upload.upload') }}
      </a-button>
      <Tooltip placement="bottom" v-if="showPreview">
        <template #title>
          {{ t('component.upload.uploaded') }}
          <template v-if="fileList.length">
            {{ fileList.length }}
          </template>
        </template>
        <a-button @click="openPreviewModal">
          <Icon icon="bi:eye" />
          <template v-if="fileList.length && showPreviewNumber">
            {{ fileList.length }}
          </template>
        </a-button>
      </Tooltip>
    </a-button-group>

    <UploadModal
      v-bind="bindValue"
      :previewFileList="fileList"
      @register="registerUploadModal"
      @change="handleChange"
      @delete="handleDelete"
    />

    <UploadPreviewModal
      :value="fileList"
      @register="registerPreviewModal"
      @list-change="handlePreviewChange"
      @delete="handlePreviewDelete"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, watch, unref, computed, toRefs } from 'vue'
  import UploadModal from './UploadModal.vue'
  import UploadPreviewModal from './UploadPreviewModal.vue'
  import { Icon } from '/@/components/Icon'
  import { Tooltip } from 'ant-design-vue'
  import { useModal } from '/@/components/Modal'
  import { uploadContainerProps } from './props'
  import { omit } from 'lodash-es'
  import { useI18n } from '/@/hooks/web/useI18n'
  import { isArray, isString } from '/@/utils/is'

  export default defineComponent({
    name: 'BasicUpload',
    components: { UploadModal, UploadPreviewModal, Icon, Tooltip },
    props: uploadContainerProps,
    emits: ['change', 'delete', 'preview-delete', 'update:value'],

    setup(props, { emit, attrs }) {
      const { t } = useI18n()
      // 上传modal
      const [registerUploadModal, { openModal: openUploadModal }] = useModal()

      //   预览modal
      const [registerPreviewModal, { openModal: openPreviewModal }] = useModal()

      const fileList = ref<string[]>([])

      const { maxNumber } = toRefs(props)

      const showPreview = computed(() => {
        const { emptyHidePreview, showPreviewBtn } = props
        if (!showPreviewBtn) return false
        if (!emptyHidePreview) return true
        return emptyHidePreview ? fileList.value.length > 0 : true
      })

      const bindValue = computed(() => {
        const value = { ...attrs, ...props }
        return omit(value, 'onChange')
      })

      watch(
        () => props.value,
        (value = []) => {
          fileList.value = isArray(value) ? value : isString(value) && value ? [value] : []
        },
        { immediate: true },
      )

      // 上传modal保存操作
      function handleChange(urls: string[]) {
        fileList.value = [...unref(fileList), ...(urls || [])]
        if (maxNumber.value === 1) {
          emit('update:value', urls.join(''))
          emit('change', fileList.value.join(''))
        } else {
          emit('update:value', fileList.value)
          emit('change', fileList.value)
        }
      }

      // 预览modal保存操作
      function handlePreviewChange(urls: string[]) {
        fileList.value = [...(urls || [])]
        if (maxNumber.value === 1) {
          emit('update:value', fileList.value.join(''))
          emit('change', fileList.value.join(''))
        } else {
          emit('update:value', fileList.value)
          emit('change', fileList.value)
        }
      }

      function handleDelete(record: Recordable) {
        emit('delete', record)
      }

      function handlePreviewDelete(url: string) {
        emit('preview-delete', url)
      }

      return {
        registerUploadModal,
        openUploadModal,
        handleChange,
        handlePreviewChange,
        registerPreviewModal,
        openPreviewModal,
        fileList,
        showPreview,
        bindValue,
        handleDelete,
        handlePreviewDelete,
        t,
      }
    },
  })
</script>

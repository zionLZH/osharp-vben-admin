export const pageDataConfTemplate = `import { get, set } from 'lodash-es'
import { FormProps } from '/@/components/Form'
import { BasicColumn } from '/@//components/Table'
import { usePermission } from '/@/hooks/web/usePermission'
import { ReadEnum } from '/@/api/admin/Common'
import {
  createHolderProps,
  createOSSUploadFormColProps,
  createRequireFormRule,
  createUploadFormColProps,
} from '../../../../utils/osharp'
import { h } from 'vue'
import { useMessage } from '../../../../hooks/web/useMessage'
import { formatToDate } from '../../../../utils/dateUtil'

const { createMessage } = useMessage()

const { hasPermission } = usePermission()
hasPermission || get || set || formatToDate || ReadEnum

export const Colums: BasicColumn[] = [
#{Columns}
]

export const ActionConfig: BasicColumn = {
  title: '',
  dataIndex: '_action',
  width: 120,
  slots: { customRender: 'action' },
  fixed: 'right',
}

export const FormConfig: FormProps = {
  labelWidth: 80,
  autoSubmitOnEnter: true,
  schemas: [
#{FormSchemas}
  ],
}

export function getFilterItems(valueMap: any) {
  const { #{FilterKeys} } = valueMap
  return [
#{FilterItems}
    // { key: 'Name', type: '=', value: Name },
    // [
    //  'or',
    //  { key: 'Name', type: 'like', value: keyword },
    // ],
  ]
}

export const DetailFormConfig: FormProps = {
  labelWidth: 100,
  showActionButtonGroup: false,
  disabled: !hasPermission(['#{Entity}.Create', '#{Entity}.Update']),
  schemas: [
#{DetailFormConfig}
  ],
}`
